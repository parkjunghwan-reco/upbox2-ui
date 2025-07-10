import { Size } from '../types'

export type TabsVariant = 'default' | 'pills' | 'underline' | 'card'
export type TabsOrientation = 'horizontal' | 'vertical'

export interface TabItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  badge?: string | number
  closable?: boolean
}

export interface TabsProps {
  items: TabItem[]
  modelValue?: string
  variant?: TabsVariant
  size?: Size
  orientation?: TabsOrientation
  fullWidth?: boolean
  lazy?: boolean
  keepAlive?: boolean
}

export const defaultTabsProps: Required<Omit<TabsProps, 'items' | 'modelValue'>> = {
  variant: 'default',
  size: 'medium',
  orientation: 'horizontal',
  fullWidth: false,
  lazy: false,
  keepAlive: false,
}

export const tabsVariants = {
  default: {
    list: 'border-b border-gray-200',
    tab: 'border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700',
    activeTab: 'border-blue-500 text-blue-600',
  },
  pills: {
    list: 'bg-gray-100 rounded-lg p-1',
    tab: 'rounded-md hover:bg-gray-200',
    activeTab: 'bg-white shadow-sm text-gray-900',
  },
  underline: {
    list: 'border-b border-gray-200',
    tab: 'border-b-2 border-transparent hover:border-gray-300',
    activeTab: 'border-blue-500 text-blue-600',
  },
  card: {
    list: 'border-b border-gray-200',
    tab: 'border border-transparent border-b-gray-200 hover:border-gray-300 -mb-px',
    activeTab: 'border-gray-300 border-b-white text-gray-900',
  },
} as const

export const tabsSizes = {
  small: 'px-3 py-2 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
} as const
