import type { ComponentConfig, ComponentState, Size } from '../types'

export interface AlertConfig extends ComponentConfig {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: string
  closable?: boolean
  size?: Size
}

export interface AlertState extends ComponentState {
  variant: AlertConfig['variant']
  title?: string
  description?: string
  closable: boolean
  size: AlertConfig['size']
  isVisible: boolean
}

export function createAlert(config: AlertConfig = {}): AlertState {
  return {
    id: config.id || `alert-${Math.random().toString(36).substr(2, 9)}`,
    disabled: config.disabled || false,
    focused: false,
    pressed: false,
    hovered: false,
    variant: config.variant || 'default',
    title: config.title,
    description: config.description,
    closable: config.closable || false,
    size: config.size || 'medium',
    isVisible: true,
  }
}
