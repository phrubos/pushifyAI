import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format credits amount as a string
 * @param amount - The number of credits
 * @returns Formatted string like "42 credits" or "1 credit"
 */
export function formatCredits(amount: number): string {
  return `${amount} ${amount === 1 ? "credit" : "credits"}`
}

/**
 * Calculate and format price per credit
 * @param price - Total price in dollars
 * @param credits - Number of credits
 * @returns Formatted string like "$0.19"
 */
export function calculatePricePerCredit(price: number, credits: number): string {
  const pricePerCredit = price / credits
  return `$${pricePerCredit.toFixed(2)}`
}

/**
 * Format date as relative time or absolute date
 * @param date - The date to format
 * @returns Formatted string like "2 days ago" or "Jan 15, 2025"
 */
export function formatDate(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      if (diffInMinutes === 0) {
        return "Just now"
      }
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
    }
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
  } else if (diffInDays === 1) {
    return "Yesterday"
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
  } else {
    // Format as absolute date for older dates
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}

/**
 * Get Tailwind CSS classes for plan badge colors
 * @param plan - The plan name ("basic", "pro", or "elite")
 * @returns Tailwind CSS classes for badge styling
 */
export function getPlanBadgeColor(plan: string): string {
  const planLower = plan.toLowerCase()

  switch (planLower) {
    case "basic":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    case "pro":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
    case "elite":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  }
}
