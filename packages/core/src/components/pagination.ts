import { Size } from '../types'

export type PaginationVariant = 'default' | 'outline' | 'ghost'

export interface PaginationProps {
  current: number
  total: number
  pageSize?: number
  variant?: PaginationVariant
  size?: Size
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
  disabled?: boolean
  simple?: boolean
  hideOnSinglePage?: boolean
  pageSizeOptions?: number[]
}

export const defaultPaginationProps: Required<Omit<PaginationProps, 'pageSizeOptions'>> = {
  current: 1,
  total: 0,
  pageSize: 10,
  variant: 'default',
  size: 'medium',
  showSizeChanger: false,
  showQuickJumper: false,
  showTotal: false,
  disabled: false,
  simple: false,
  hideOnSinglePage: false,
}

export const paginationVariants = {
  default: {
    button: 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
    activeButton: 'border-blue-500 bg-blue-50 text-blue-600',
    disabledButton: 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed',
  },
  outline: {
    button: 'border border-gray-300 bg-transparent text-gray-700 hover:border-gray-400 hover:text-gray-900',
    activeButton: 'border-blue-500 bg-transparent text-blue-600',
    disabledButton: 'border-gray-300 bg-transparent text-gray-400 cursor-not-allowed',
  },
  ghost: {
    button: 'border-transparent bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
    activeButton: 'border-transparent bg-blue-50 text-blue-600',
    disabledButton: 'border-transparent bg-transparent text-gray-400 cursor-not-allowed',
  },
} as const

export const paginationSizes = {
  small: 'px-2 py-1 text-xs',
  medium: 'px-3 py-2 text-sm',
  large: 'px-4 py-2 text-base',
} as const
