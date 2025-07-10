import { Size } from '../types'

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface ProgressProps {
  value: number
  max?: number
  variant?: ProgressVariant
  size?: Size
  showValue?: boolean
  label?: string
  indeterminate?: boolean
  striped?: boolean
  animated?: boolean
}

export const defaultProgressProps: Required<Omit<ProgressProps, 'label'>> = {
  value: 0,
  max: 100,
  variant: 'default',
  size: 'medium',
  showValue: false,
  indeterminate: false,
  striped: false,
  animated: false,
}

export const progressVariants = {
  default: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
} as const

export const progressBackgrounds = {
  default: 'bg-gray-200',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
  info: 'bg-blue-100',
} as const

export const progressSizes = {
  small: 'h-2',
  medium: 'h-3',
  large: 'h-4',
} as const

export const progressLabelSizes = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
} as const
