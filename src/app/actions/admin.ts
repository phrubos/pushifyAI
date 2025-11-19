"use server";

import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { user, transactions } from "@/lib/schema";
import { eq, desc, ilike } from "drizzle-orm";
import { addCredits as _addCredits } from "./credits";
void _addCredits; // Used for type reference in admin operations
import crypto from "crypto";

/**
 * Search users by email (admin only)
 */
export async function searchUsers(email: string) {
  await requireAdmin();

  if (!email || email.length < 2) {
    return [];
  }

  const users = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      credits: user.credits,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(ilike(user.email, `%${email}%`))
    .limit(10);

  return users;
}

/**
 * Get user by ID (admin only)
 */
export async function getUserById(userId: string) {
  await requireAdmin();

  const [foundUser] = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      credits: user.credits,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!foundUser) {
    throw new Error("User not found");
  }

  return foundUser;
}

/**
 * Add credits to a user (admin only)
 */
export async function adminAddCredits(
  userId: string,
  amount: number,
  reason: string
) {
  await requireAdmin();

  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }

  if (!reason || reason.trim().length === 0) {
    throw new Error("Reason is required");
  }

  // Get current user
  const [currentUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!currentUser) {
    throw new Error("User not found");
  }

  const newCredits = currentUser.credits + amount;

  // Update user credits
  await db.update(user).set({ credits: newCredits }).where(eq(user.id, userId));

  // Create transaction record
  await db.insert(transactions).values({
    id: crypto.randomUUID(),
    userId: userId,
    amount: amount,
    credits: newCredits,
    type: "admin",
    status: "completed",
    metadata: {
      reason,
      action: "add",
    },
  });

  return { success: true, newCredits };
}

/**
 * Remove credits from a user (admin only)
 */
export async function adminRemoveCredits(
  userId: string,
  amount: number,
  reason: string
) {
  await requireAdmin();

  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }

  if (!reason || reason.trim().length === 0) {
    throw new Error("Reason is required");
  }

  // Get current user
  const [currentUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!currentUser) {
    throw new Error("User not found");
  }

  // Allow admin to deduct even if it results in negative balance
  const newCredits = currentUser.credits - amount;

  // Update user credits
  await db.update(user).set({ credits: newCredits }).where(eq(user.id, userId));

  // Create transaction record
  await db.insert(transactions).values({
    id: crypto.randomUUID(),
    userId: userId,
    amount: -amount,
    credits: newCredits,
    type: "admin",
    status: "completed",
    metadata: {
      reason,
      action: "remove",
    },
  });

  return { success: true, newCredits };
}

/**
 * Get transaction history for a user (admin only)
 */
export async function getAdminTransactionHistory(userId: string) {
  await requireAdmin();

  const userTransactions = await db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
    orderBy: [desc(transactions.createdAt)],
    limit: 100,
  });

  return userTransactions;
}
