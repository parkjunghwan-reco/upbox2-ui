import { Size } from '../types'

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right'

export interface ToastOptions {
  variant?: ToastVariant
  size?: Size
  position?: ToastPosition
  duration?: number
  closable?: boolean
  title?: string
  description?: string
  icon?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export interface ToastInstance {
  id: string
  title?: string
  description?: string
  variant: ToastVariant
  size: Size
  position: ToastPosition
  duration: number
  closable: boolean
  icon?: string
  action?: {
    label: string
    onClick: () => void
  }
  createdAt: number
}

export const defaultToastOptions: Required<Omit<ToastOptions, 'title' | 'description' | 'icon' | 'action'>> = {
  variant: 'default',
  size: 'medium',
  position: 'top-right',
  duration: 4000,
  closable: true,
}

export const toastVariants = {
  default: 'bg-white border-gray-200 text-gray-900',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
} as const

export const toastSizes = {
  small: 'text-sm p-3 max-w-sm',
  medium: 'text-base p-4 max-w-md',
  large: 'text-lg p-5 max-w-lg',
} as const

export const toastPositions = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
} as const
