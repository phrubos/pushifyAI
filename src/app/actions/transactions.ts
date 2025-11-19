"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { transactions } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Get transaction history for a user
 * @param userId - User ID to get transactions for (optional, defaults to current user)
 */
export async function getTransactionHistory(userId?: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // If userId is provided, verify it's the current user (or admin in future)
  const targetUserId = userId || session.user.id;
  
  if (targetUserId !== session.user.id) {
    // TODO: Add admin check here when admin functionality is implemented
    throw new Error("Forbidden");
  }

  const userTransactions = await db.query.transactions.findMany({
    where: eq(transactions.userId, targetUserId),
    orderBy: [desc(transactions.createdAt)],
    limit: 50,
  });

  return userTransactions;
}

/**
 * Get purchase history (transactions with type 'purchase')
 */
export async function getPurchaseHistory() {
  const allTransactions = await getTransactionHistory();
  return allTransactions.filter((t) => t.type === "purchase");
}
