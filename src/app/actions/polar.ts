"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Polar } from "@polar-sh/sdk";
import { redirect } from "next/navigation";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || "mock_token",
});

export async function createCheckoutSession(planId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/pricing");
  }

  // Map plan IDs to Polar Product IDs
  // In production, these should be environment variables
  const productIdMap: Record<string, string | undefined> = {
    "plan_starter": process.env.POLAR_PRODUCT_STARTER_ID,
    "plan_pro": process.env.POLAR_PRODUCT_PRO_ID,
    "plan_ultimate": process.env.POLAR_PRODUCT_ULTIMATE_ID,
  };

  const productId = productIdMap[planId];

  if (!productId) {
    // If no product ID is configured (e.g. in dev without full setup),
    // we'll return a mock URL or throw an error.
    if (process.env.NODE_ENV === "development") {
      console.warn(`No Polar Product ID found for ${planId}. Using mock.`);
      // Return a URL that simulates success
      return { url: `/api/webhooks/polar/mock?planId=${planId}&userId=${session.user.id}` };
    }
    throw new Error("Product not available");
  }

  try {
    const result = await polar.checkouts.create({
      product_id: productId,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?payment=success`,
      customer_metadata: {
        userId: session.user.id,
        planId: planId,
      },
    } as any); // Type assertion due to SDK type limitations

    return { url: result.url };
  } catch (error) {
    console.error("Failed to create Polar checkout session:", error);
    throw new Error("Failed to initiate checkout");
  }
}
