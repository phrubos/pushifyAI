/**
 * Validation utilities for file uploads and form inputs
 */

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate image file for upload
 */
export function validateImageFile(file: File): FileValidationResult {
  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Only JPG and PNG images are allowed.",
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit.`,
    };
  }

  return { valid: true };
}

/**
 * Validate credit amount for admin operations
 */
export function validateCreditAmount(amount: number): FileValidationResult {
  if (isNaN(amount)) {
    return {
      valid: false,
      error: "Amount must be a valid number.",
    };
  }

  if (amount <= 0) {
    return {
      valid: false,
      error: "Amount must be greater than zero.",
    };
  }

  if (amount > 10000) {
    return {
      valid: false,
      error: "Amount cannot exceed 10,000 credits.",
    };
  }

  if (!Number.isInteger(amount)) {
    return {
      valid: false,
      error: "Amount must be a whole number.",
    };
  }

  return { valid: true };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): FileValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email.trim().length === 0) {
    return {
      valid: false,
      error: "Email is required.",
    };
  }

  if (!emailRegex.test(email)) {
    return {
      valid: false,
      error: "Invalid email format.",
    };
  }

  return { valid: true };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
