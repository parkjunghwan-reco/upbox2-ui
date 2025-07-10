import type { ComponentConfig, ComponentState, Size } from '../types'

export interface TextareaConfig extends ComponentConfig {
  rows?: number
  cols?: number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  size?: Size
  placeholder?: string
  value?: string
}

export interface TextareaState extends ComponentState {
  rows: number
  cols?: number
  resize: TextareaConfig['resize']
  size: TextareaConfig['size']
  placeholder?: string
  value?: string
}

export function createTextarea(config: TextareaConfig = {}): TextareaState {
  return {
    id: config.id || `textarea-${Math.random().toString(36).substr(2, 9)}`,
    disabled: config.disabled || false,
    focused: false,
    pressed: false,
    hovered: false,
    rows: config.rows || 3,
    cols: config.cols,
    resize: config.resize || 'vertical',
    size: config.size || 'medium',
    placeholder: config.placeholder,
    value: config.value,
  }
}
