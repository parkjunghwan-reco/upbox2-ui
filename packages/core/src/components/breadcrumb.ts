import { Size } from '../types'

export interface BreadcrumbItem {
  id: string
  label: string
  href?: string
  icon?: string
  disabled?: boolean
  current?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  size?: Size
  separator?: string
  maxItems?: number
  showHome?: boolean
  homeIcon?: string
  homeHref?: string
}

export const defaultBreadcrumbProps: Required<Omit<BreadcrumbProps, 'items' | 'homeIcon' | 'homeHref'>> = {
  size: 'medium',
  separator: '/',
  maxItems: 0,
  showHome: false,
}

export const breadcrumbSizes = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
} as const

export const breadcrumbSeparators = {
  '/': '/',
  '>': '>',
  '→': '→',
  '»': '»',
} as const
