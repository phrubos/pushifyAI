"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { generations } from "@/lib/schema";
import { headers } from "next/headers";
import { hasEnoughCredits, deductCredits, refundCredits } from "./credits";
import {
  uploadOriginalImage,
  uploadGeneratedImage,
} from "@/lib/blob-storage";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { eq } from "drizzle-orm";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

type GenerationStyle = "cute" | "realistic" | "cartoon";
type GenerationSize = "small" | "medium" | "large";

interface GenerateImageParams {
  originalImageFile: File;
  style: GenerationStyle;
  size: GenerationSize;
}

interface GenerateImageResult {
  success: boolean;
  generationId?: string;
  error?: string;
}

/**
 * Build the AI prompt based on style and size
 */
function buildPlushifyPrompt(style: GenerationStyle, size: GenerationSize): string {
  const styleMap: Record<GenerationStyle, string> = {
    cute: "adorable, kawaii, chibi style with big eyes and soft features",
    realistic: "photorealistic with detailed textures and lifelike proportions",
    cartoon: "cartoon style with bold colors, simplified shapes, and playful design",
  };

  const sizeMap: Record<GenerationSize, string> = {
    small: "small and compact design, approximately 6-8 inches",
    medium: "medium size, perfect for hugging, approximately 12-16 inches",
    large: "large and oversized, approximately 20-24 inches",
  };

  return `Transform this image into a plushie toy design.
Style: ${styleMap[style]}.
Size: ${sizeMap[size]}.
Create a soft, huggable plush toy version with appropriate proportions for a stuffed animal.
The design should be cuddly and appealing as a physical plush product.
High quality product photography with white background and studio lighting.
Make it look like a professional plush toy photograph that could be sold in stores.`;
}

/**
 * Generate a plushified image using AI
 */
export async function generatePlushImage(
  params: GenerateImageParams
): Promise<GenerateImageResult> {
  try {
    // 1. Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // 2. Validate credits (1 credit required)
    const hasCredits = await hasEnoughCredits(1);
    if (!hasCredits) {
      return { success: false, error: "INSUFFICIENT_CREDITS" };
    }

    // 3. Upload original image to blob storage
    const originalUrl = await uploadOriginalImage(
      params.originalImageFile,
      session.user.id
    );

    // 4. Create generation record (status: 'processing')
    const generationId = crypto.randomUUID();
    await db.insert(generations).values({
      id: generationId,
      userId: session.user.id,
      originalImageUrl: originalUrl,
      status: "processing",
      style: params.style,
      size: params.size,
      prompt: buildPlushifyPrompt(params.style, params.size),
    });

    // 5. Deduct credit
    await deductCredits(1);

    // 6. Generate image using AI SDK (async - will be polled)
    // Note: This runs in the background, UI will poll for status
    generateImageInBackground(generationId, params, session.user.id);

    return { success: true, generationId };
  } catch (error) {
    console.error("Error in generatePlushImage:", error);
    if (error instanceof Error && error.message === "INSUFFICIENT_CREDITS") {
      return { success: false, error: "INSUFFICIENT_CREDITS" };
    }
    return { success: false, error: "Failed to start image generation" };
  }
}

/**
 * Background task to generate the image
 * (This simulates async processing - in production, use a queue system)
 */
async function generateImageInBackground(
  generationId: string,
  params: GenerateImageParams,
  userId: string
): Promise<void> {
  try {
    const prompt = buildPlushifyPrompt(params.style, params.size);

    // Get the original image URL from the generation record
    const generation = await db.query.generations.findFirst({
      where: eq(generations.id, generationId),
    });

    if (!generation) {
      throw new Error("Generation record not found");
    }

    // Fetch the original image
    const imageResponse = await fetch(generation.originalImageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    console.log("Starting image generation via OpenRouter...");

    // Generate image using Gemini 2.5 Flash Image via OpenRouter
    // IMPORTANT: modalities parameter is required for image generation
    const result = await generateText({
      model: openrouter(process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash-image"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image",
              image: base64Image,
            },
          ],
        },
      ],
      // Enable image generation output
      experimental_providerMetadata: {
        openrouter: {
          modalities: ["image", "text"],
        },
      },
    } as any); // Type assertion for experimental features

    console.log("AI generation completed");
    console.log("AI Response text:", result.text);

    // Check for generated images in the response
    let generatedUrl: string = generation.originalImageUrl; // Default to original
    let hasImageOutput = false;

    // OpenRouter returns images in response.choices[0].message.images
    const rawResponse = result as any;
    
    console.log("Checking for images in response...");
    console.log("rawResponse keys:", Object.keys(rawResponse));
    console.log("rawResponse.response:", rawResponse.response ? "exists" : "undefined");
    
    if (rawResponse.response?.messages) {
      console.log("Checking messages array for generated image...");
      
      // Find the assistant message with the image
      for (const message of rawResponse.response.messages) {
        if (message.role === 'assistant' && message.content) {
          // Look for file type content
          for (const contentItem of message.content) {
            if (contentItem.type === 'file' && contentItem.data && contentItem.mediaType === 'image/png') {
              console.log("Found generated image in message content!");
              console.log("Image data length:", contentItem.data.length);
              
              // The data is already base64 encoded
              generatedUrl = await uploadGeneratedImage(contentItem.data, userId);
              hasImageOutput = true;
              console.log("Generated image uploaded successfully!");
              break;
            }
          }
          if (hasImageOutput) break;
        }
      }
    }

    if (!hasImageOutput) {
      console.warn("No image generated, using original image as fallback");
      console.log("AI Description:", result.text);
    }

    console.log("Final generated image URL:", generatedUrl);

    // Update generation record (status: 'completed')
    await db
      .update(generations)
      .set({
        generatedImageUrl: generatedUrl,
        status: "completed",
      })
      .where(eq(generations.id, generationId));

    console.log("Generation completed successfully:", generationId);
  } catch (error) {
    console.error("Error generating image:", error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Mark as failed
    await db
      .update(generations)
      .set({
        status: "failed",
      })
      .where(eq(generations.id, generationId));

    // Refund credit
    await refundCredits(userId, 1);
  }
}

/**
 * Get generation by ID
 */
export async function getGenerationById(generationId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

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

  return generation;
}
