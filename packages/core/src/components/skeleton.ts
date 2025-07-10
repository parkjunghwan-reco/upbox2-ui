import { Size } from '../types'

export type SkeletonVariant = 'text' | 'rectangle' | 'circle' | 'avatar' | 'button'

export interface SkeletonProps {
  variant?: SkeletonVariant
  size?: Size
  width?: string | number
  height?: string | number
  lines?: number
  loading?: boolean
  animated?: boolean
  rounded?: boolean
}

export const defaultSkeletonProps: Required<Omit<SkeletonProps, 'width' | 'height'>> = {
  variant: 'text',
  size: 'medium',
  lines: 1,
  loading: true,
  animated: true,
  rounded: false,
}

export const skeletonVariants = {
  text: 'h-4 w-full',
  rectangle: 'w-full h-32',
  circle: 'w-12 h-12 rounded-full',
  avatar: 'w-10 h-10 rounded-full',
  button: 'h-10 w-24 rounded-md',
} as const

export const skeletonSizes = {
  small: {
    text: 'h-3',
    rectangle: 'h-24',
    circle: 'w-8 h-8',
    avatar: 'w-8 h-8',
    button: 'h-8 w-20',
  },
  medium: {
    text: 'h-4',
    rectangle: 'h-32',
    circle: 'w-12 h-12',
    avatar: 'w-10 h-10',
    button: 'h-10 w-24',
  },
  large: {
    text: 'h-5',
    rectangle: 'h-40',
    circle: 'w-16 h-16',
    avatar: 'w-12 h-12',
    button: 'h-12 w-28',
  },
} as const
