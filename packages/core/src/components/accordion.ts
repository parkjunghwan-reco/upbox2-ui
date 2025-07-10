import { Size } from '../types'

export type AccordionVariant = 'default' | 'bordered' | 'filled' | 'ghost'
export type AccordionType = 'single' | 'multiple'

export interface AccordionItem {
  id: string
  title: string
  content?: string
  icon?: string
  disabled?: boolean
  defaultOpen?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  type?: AccordionType
  variant?: AccordionVariant
  size?: Size
  collapsible?: boolean
  defaultValue?: string | string[]
  animated?: boolean
}

export const defaultAccordionProps: Required<Omit<AccordionProps, 'items' | 'defaultValue'>> = {
  type: 'single',
  variant: 'default',
  size: 'medium',
  collapsible: true,
  animated: true,
}

export const accordionVariants = {
  default: {
    container: 'border border-gray-200 rounded-lg divide-y divide-gray-200',
    item: 'bg-white',
    header: 'px-4 py-3 hover:bg-gray-50',
    content: 'px-4 py-3 bg-gray-50',
  },
  bordered: {
    container: 'border border-gray-300 rounded-lg',
    item: 'bg-white border-b border-gray-200 last:border-b-0',
    header: 'px-4 py-3 hover:bg-gray-50',
    content: 'px-4 py-3 border-t border-gray-200',
  },
  filled: {
    container: 'bg-gray-100 rounded-lg',
    item: 'bg-white mb-2 last:mb-0 rounded-lg shadow-sm',
    header: 'px-4 py-3 hover:bg-gray-50 rounded-lg',
    content: 'px-4 py-3 bg-gray-50 rounded-b-lg',
  },
  ghost: {
    container: '',
    item: 'mb-2 last:mb-0',
    header: 'px-4 py-3 hover:bg-gray-50 rounded-lg',
    content: 'px-4 py-3',
  },
} as const

export const accordionSizes = {
  small: {
    header: 'px-3 py-2 text-sm',
    content: 'px-3 py-2 text-sm',
  },
  medium: {
    header: 'px-4 py-3 text-base',
    content: 'px-4 py-3 text-base',
  },
  large: {
    header: 'px-6 py-4 text-lg',
    content: 'px-6 py-4 text-base',
  },
} as const
