import { Size } from '../types'

export type DropdownTrigger = 'click' | 'hover' | 'focus'
export type DropdownPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end'

export interface DropdownItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  danger?: boolean
  shortcut?: string
  children?: DropdownItem[]
}

export interface DropdownProps {
  items: DropdownItem[]
  trigger?: DropdownTrigger
  placement?: DropdownPlacement
  size?: Size
  disabled?: boolean
  closeOnClick?: boolean
  offset?: number
  arrow?: boolean
}

export const defaultDropdownProps: Required<Omit<DropdownProps, 'items'>> = {
  trigger: 'click',
  placement: 'bottom-start',
  size: 'medium',
  disabled: false,
  closeOnClick: true,
  offset: 4,
  arrow: false,
}

export const dropdownSizes = {
  small: 'min-w-32 text-sm',
  medium: 'min-w-40 text-base',
  large: 'min-w-48 text-lg',
} as const

export const dropdownPlacements = {
  'top': 'bottom-full mb-2',
  'top-start': 'bottom-full mb-2 left-0',
  'top-end': 'bottom-full mb-2 right-0',
  'bottom': 'top-full mt-2',
  'bottom-start': 'top-full mt-2 left-0',
  'bottom-end': 'top-full mt-2 right-0',
  'left': 'right-full mr-2',
  'left-start': 'right-full mr-2 top-0',
  'left-end': 'right-full mr-2 bottom-0',
  'right': 'left-full ml-2',
  'right-start': 'left-full ml-2 top-0',
  'right-end': 'left-full ml-2 bottom-0',
} as const
