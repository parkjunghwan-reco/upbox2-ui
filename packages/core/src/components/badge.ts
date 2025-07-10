import type { ComponentConfig, ComponentState, Color, Size } from '../types'

export interface BadgeConfig extends ComponentConfig {
  variant?: Color
  size?: Size
}

export interface BadgeState extends ComponentState {
  variant: BadgeConfig['variant']
  size: BadgeConfig['size']
}

export function createBadge(config: BadgeConfig = {}): BadgeState {
  return {
    id: config.id || `badge-${Math.random().toString(36).substr(2, 9)}`,
    disabled: config.disabled || false,
    focused: false,
    pressed: false,
    hovered: false,
    variant: config.variant || 'default',
    size: config.size || 'medium',
  }
}
