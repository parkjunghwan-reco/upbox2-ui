import type { ComponentConfig, ComponentState, Size } from '../types'

export interface SwitchConfig extends ComponentConfig {
  checked?: boolean
  size?: Size
  name?: string
  value?: string
}

export interface SwitchState extends ComponentState {
  checked: boolean
  size: SwitchConfig['size']
  name?: string
  value?: string
}

export function createSwitch(config: SwitchConfig = {}): SwitchState {
  return {
    id: config.id || `switch-${Math.random().toString(36).substr(2, 9)}`,
    disabled: config.disabled || false,
    focused: false,
    pressed: false,
    hovered: false,
    checked: config.checked || false,
    size: config.size || 'medium',
    name: config.name,
    value: config.value,
  }
}
