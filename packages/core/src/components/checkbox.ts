import type { ComponentConfig, ComponentState, Size } from '../types'

export interface CheckboxConfig extends ComponentConfig {
  checked?: boolean
  indeterminate?: boolean
  size?: Size
  name?: string
  value?: string
}

export interface CheckboxState extends ComponentState {
  checked: boolean
  indeterminate: boolean
  size: CheckboxConfig['size']
  name?: string
  value?: string
}

export function createCheckbox(config: CheckboxConfig = {}): CheckboxState {
  return {
    id: config.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`,
    disabled: config.disabled || false,
    focused: false,
    pressed: false,
    hovered: false,
    checked: config.checked || false,
    indeterminate: config.indeterminate || false,
    size: config.size || 'medium',
    name: config.name,
    value: config.value,
  }
}
