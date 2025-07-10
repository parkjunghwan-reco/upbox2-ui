import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge class names with tailwind-merge
 * This ensures that conflicting Tailwind classes are properly merged
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
