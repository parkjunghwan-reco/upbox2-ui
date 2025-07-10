import type { ComponentConfig, ComponentState } from '../types'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectConfig extends ComponentConfig {
  options?: SelectOption[]
  value?: string
  placeholder?: string
  multiple?: boolean
  size?: 'small' | 'medium' | 'large'
}

export interface SelectState extends ComponentState {
  options: SelectOption[]
  value?: string
  placeholder?: string
  multiple: boolean
  size: SelectConfig['size']
  isOpen: boolean
}

export function createSelect(config: SelectConfig = {}): SelectState {
  return {
    id: config.id || `select-${Math.random().toString(36).substr(2, 9)}`,
    disabled: config.disabled || false,
    focused: false,
    pressed: false,
    hovered: false,
    options: config.options || [],
    value: config.value,
    placeholder: config.placeholder,
    multiple: config.multiple || false,
    size: config.size || 'medium',
    isOpen: false,
  }
}
