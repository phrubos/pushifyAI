"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/schema";
import { eq } from "drizzle-orm";

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return false;
  }

  const adminUser = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.userId, session.user.id),
  });

  return !!adminUser;
}

/**
 * Require admin access - throws error if not admin
 */
export async function requireAdmin(): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const adminUser = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.userId, session.user.id),
  });

  if (!adminUser) {
    throw new Error("Forbidden: Admin access required");
  }
}

/**
 * Get current admin user info
 */
export async function getAdminUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const adminUser = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.userId, session.user.id),
  });

  if (!adminUser) {
    throw new Error("Forbidden: Admin access required");
  }

  return {
    ...session.user,
    role: adminUser.role,
  };
}
