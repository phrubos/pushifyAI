"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, transactions, adminUsers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

/**
 * Get the authenticated user's credit balance
 * @returns Promise<number> - The user's current credits
 */
export async function getUserCredits(): Promise<number> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userRecord = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
    columns: {
      credits: true,
    },
  });

  if (!userRecord) {
    throw new Error("User not found");
  }

  return userRecord.credits;
}

/**
 * Check if the user has enough credits
 * @param required - Number of credits required
 * @returns Promise<boolean> - True if user has enough credits
 */
export async function hasEnoughCredits(required: number): Promise<boolean> {
  try {
    const credits = await getUserCredits();
    return credits >= required;
  } catch {
    return false;
  }
}

/**
 * Deduct credits from the authenticated user's account
 * @param amount - Number of credits to deduct
 * @returns Promise<void>
 */
export async function deductCredits(amount: number): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Start a transaction to ensure atomicity
  await db.transaction(async (tx) => {
    // Get current credits with row lock
    const userRecord = await tx.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });

    if (!userRecord) {
      throw new Error("User not found");
    }

    if (userRecord.credits < amount) {
      throw new Error("INSUFFICIENT_CREDITS");
    }

    const newCredits = userRecord.credits - amount;

    // Deduct credits
    await tx
      .update(user)
      .set({ credits: newCredits })
      .where(eq(user.id, session.user.id));

    // Log transaction
    await tx.insert(transactions).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      amount: -amount,
      credits: newCredits,
      type: "deduction",
      status: "completed",
      metadata: {
        reason: "Image generation",
      },
    });
  });
}

/**
 * Refund credits to a user (used when generation fails)
 * @param userId - User ID to refund credits to
 * @param amount - Number of credits to refund
 * @returns Promise<void>
 */
export async function refundCredits(
  userId: string,
  amount: number
): Promise<void> {
  await db.transaction(async (tx) => {
    // Get current credits
    const userRecord = await tx.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!userRecord) {
      throw new Error("User not found");
    }

    const newCredits = userRecord.credits + amount;

    // Add credits back
    await tx
      .update(user)
      .set({ credits: newCredits })
      .where(eq(user.id, userId));

    // Log transaction
    await tx.insert(transactions).values({
      id: crypto.randomUUID(),
      userId: userId,
      amount: amount,
      credits: newCredits,
      type: "refund",
      status: "completed",
      metadata: {
        reason: "Generation failed",
      },
    });
  });
}

/**
 * Add credits to a user account (admin only)
 * @param userId - User ID to add credits to
 * @param amount - Number of credits to add
 * @param reason - Reason for adding credits
 * @returns Promise<void>
 */
export async function addCredits(
  userId: string,
  amount: number,
  reason: string
): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Check if user is admin
  const isAdmin = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.userId, session.user.id),
  });

  if (!isAdmin) {
    throw new Error("Forbidden: Admin access required");
  }

  await db.transaction(async (tx) => {
    // Get current credits
    const userRecord = await tx.query.user.findFirst({
      where: eq(user.id, userId),
    });

    if (!userRecord) {
      throw new Error("User not found");
    }

    const newCredits = userRecord.credits + amount;

    // Add credits
    await tx
      .update(user)
      .set({ credits: newCredits })
      .where(eq(user.id, userId));

    // Log transaction
    await tx.insert(transactions).values({
      id: crypto.randomUUID(),
      userId: userId,
      amount: amount,
      credits: newCredits,
      type: "admin",
      status: "completed",
      metadata: {
        reason: reason,
        adminId: session.user.id,
        adminEmail: session.user.email,
      },
    });
  });
}
