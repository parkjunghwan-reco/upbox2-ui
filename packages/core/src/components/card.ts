import type { ComponentConfig, ComponentState } from '../types'

export interface CardConfig extends ComponentConfig {
  variant?: 'default' | 'outline'
  padding?: 'none' | 'small' | 'medium' | 'large'
}

export interface CardState extends ComponentState {
  variant: CardConfig['variant']
  padding: CardConfig['padding']
}

export function createCard(config: CardConfig = {}): CardState {
  return {
    id: config.id || `card-${Math.random().toString(36).substr(2, 9)}`,
    disabled: config.disabled || false,
    focused: false,
    pressed: false,
    hovered: false,
    variant: config.variant || 'default',
    padding: config.padding || 'medium',
  }
}
