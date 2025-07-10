import { Size } from '../types'

export type AvatarVariant = 'circle' | 'square' | 'rounded'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: Size
  variant?: AvatarVariant
  fallback?: string
  showFallback?: boolean
  initials?: string
  color?: string
  backgroundColor?: string
}

export const defaultAvatarProps: Required<Omit<AvatarProps, 'src' | 'alt' | 'fallback' | 'initials' | 'color' | 'backgroundColor'>> = {
  size: 'medium',
  variant: 'circle',
  showFallback: true,
}

export const avatarSizes = {
  small: 'w-8 h-8 text-xs',
  medium: 'w-10 h-10 text-sm',
  large: 'w-12 h-12 text-base',
} as const

export const avatarVariants = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg',
} as const

export const avatarColors = [
  'bg-red-500 text-white',
  'bg-blue-500 text-white',
  'bg-green-500 text-white',
  'bg-yellow-500 text-white',
  'bg-purple-500 text-white',
  'bg-pink-500 text-white',
  'bg-indigo-500 text-white',
  'bg-gray-500 text-white',
] as const
