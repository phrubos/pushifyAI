import { put, del } from "@vercel/blob";

/**
 * Upload an original image file to Vercel Blob Storage
 * @param file - The image file to upload
 * @param userId - The user's ID for organizing files
 * @returns Promise<string> - The public URL of the uploaded image
 */
export async function uploadOriginalImage(
  file: File,
  userId: string
): Promise<string> {
  try {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const pathname = `Plushify/originals/${userId}/${filename}`;

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return blob.url;
  } catch (error) {
    console.error("Error uploading original image:", error);
    throw new Error("Failed to upload original image");
  }
}

/**
 * Upload a generated image (base64) to Vercel Blob Storage
 * @param base64Data - The base64 encoded image data (with or without data URI prefix)
 * @param userId - The user's ID for organizing files
 * @returns Promise<string> - The public URL of the uploaded image
 */
export async function uploadGeneratedImage(
  base64Data: string,
  userId: string
): Promise<string> {
  try {
    // Remove data URI prefix if present (e.g., "data:image/png;base64,")
    const base64String = base64Data.includes(",")
      ? base64Data.split(",")[1]
      : base64Data;

    // Convert base64 to Buffer
    const imageBuffer = Buffer.from(base64String, "base64");

    const timestamp = Date.now();
    const filename = `${timestamp}-generated.png`;
    const pathname = `Plushify/generated/${userId}/${filename}`;

    const blob = await put(pathname, imageBuffer, {
      access: "public",
      addRandomSuffix: false,
      contentType: "image/png",
    });

    return blob.url;
  } catch (error) {
    console.error("Error uploading generated image:", error);
    throw new Error("Failed to upload generated image");
  }
}

/**
 * Delete an image from Vercel Blob Storage
 * @param url - The blob URL to delete
 * @returns Promise<void>
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
}

/**
 * Delete multiple images from Vercel Blob Storage
 * @param urls - Array of blob URLs to delete
 * @returns Promise<void>
 */
export async function deleteImages(urls: string[]): Promise<void> {
  try {
    await Promise.all(urls.map((url) => deleteImage(url)));
  } catch (error) {
    console.error("Error deleting images:", error);
    throw new Error("Failed to delete images");
  }
}

/**
 * Get the public URL for a blob
 * @param blobUrl - The blob URL
 * @returns string - The public accessible URL
 */
export function getPublicUrl(blobUrl: string): string {
  return blobUrl;
}
