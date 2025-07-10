import type { ComponentConfig, ComponentState, Size } from '../types'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioConfig extends ComponentConfig {
  options?: RadioOption[]
  value?: string
  name?: string
  size?: Size
}

export interface RadioState extends ComponentState {
  options: RadioOption[]
  value?: string
  name?: string
  size: RadioConfig['size']
}

export function createRadio(config: RadioConfig = {}): RadioState {
  return {
    id: config.id || `radio-${Math.random().toString(36).substr(2, 9)}`,
    disabled: config.disabled || false,
    focused: false,
    pressed: false,
    hovered: false,
    options: config.options || [],
    value: config.value,
    name: config.name,
    size: config.size || 'medium',
  }
}
