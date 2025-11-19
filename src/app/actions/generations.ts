"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generations } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { deleteImage } from "@/lib/blob-storage";

/**
 * Get all generations for the authenticated user
 * @param limit - Maximum number of generations to return
 * @param offset - Number of generations to skip (for pagination)
 */
export async function getGenerations(limit = 20, offset = 0) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userGenerations = await db.query.generations.findMany({
    where: eq(generations.userId, session.user.id),
    orderBy: [desc(generations.createdAt)],
    limit,
    offset,
  });

  return userGenerations;
}

/**
 * Toggle favorite status for a generation
 */
export async function toggleFavorite(generationId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Get the generation
  const generation = await db.query.generations.findFirst({
    where: eq(generations.id, generationId),
  });

  if (!generation) {
    throw new Error("Generation not found");
  }

  // Verify ownership
  if (generation.userId !== session.user.id) {
    throw new Error("Forbidden");
  }

  // Toggle favorite
  await db
    .update(generations)
    .set({
      isFavorite: !generation.isFavorite,
    })
    .where(eq(generations.id, generationId));

  return { success: true, isFavorite: !generation.isFavorite };
}

/**
 * Delete a generation and its associated images
 */
export async function deleteGeneration(generationId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Get the generation
  const generation = await db.query.generations.findFirst({
    where: eq(generations.id, generationId),
  });

  if (!generation) {
    throw new Error("Generation not found");
  }

  // Verify ownership
  if (generation.userId !== session.user.id) {
    throw new Error("Forbidden");
  }

  // Delete images from blob storage
  try {
    await deleteImage(generation.originalImageUrl);
    if (generation.generatedImageUrl) {
      await deleteImage(generation.generatedImageUrl);
    }
  } catch (error) {
    console.error("Error deleting images from blob storage:", error);
    // Continue with database deletion even if blob deletion fails
  }

  // Delete from database
  await db.delete(generations).where(eq(generations.id, generationId));

  return { success: true };
}
