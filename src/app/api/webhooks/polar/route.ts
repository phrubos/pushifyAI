import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user, transactions } from "@/lib/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

// Verify Polar webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

// Map plan IDs to credit amounts
const PLAN_CREDITS: Record<string, number> = {
  plan_starter: 50,
  plan_pro: 200,
  plan_ultimate: 500,
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("polar-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("POLAR_WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify signature
    if (!verifyWebhookSignature(payload, signature, webhookSecret)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(payload);

    // Handle checkout.completed event
    if (event.type === "checkout.completed" || event.event === "checkout.completed") {
      const checkoutData = event.data || event;
      const metadata = checkoutData.metadata || {};
      const userId = metadata.userId;
      const planId = metadata.planId;

      if (!userId || !planId) {
        console.error("Missing userId or planId in webhook metadata", metadata);
        return NextResponse.json(
          { error: "Missing required metadata" },
          { status: 400 }
        );
      }

      const creditsToAdd = PLAN_CREDITS[planId];
      if (!creditsToAdd) {
        console.error("Unknown plan ID:", planId);
        return NextResponse.json(
          { error: "Unknown plan" },
          { status: 400 }
        );
      }

      // Get current user
      const [currentUser] = await db
        .select()
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

      if (!currentUser) {
        console.error("User not found:", userId);
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      const newCredits = currentUser.credits + creditsToAdd;

      // Update user credits
      await db
        .update(user)
        .set({ credits: newCredits })
        .where(eq(user.id, userId));

      // Create transaction record
      await db.insert(transactions).values({
        id: crypto.randomUUID(),
        userId: userId,
        amount: creditsToAdd,
        credits: newCredits,
        type: "purchase",
        status: "completed",
        metadata: {
          planId,
          checkoutId: checkoutData.id,
          amount: checkoutData.amount,
        },
      });

      console.log(`Added ${creditsToAdd} credits to user ${userId}. New balance: ${newCredits}`);

      return NextResponse.json({ success: true });
    }

    // Return success for other event types
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
