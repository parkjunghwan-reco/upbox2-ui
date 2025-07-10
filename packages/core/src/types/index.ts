/**
 * Common type definitions for the design system
 * Based on reka-ui and following the patterns from abc-def reference
 */

// Size variants - consistent with design system
export type Size = 'small' | 'medium' | 'large'

// Radius variants - for border radius
export type Radius = 'small' | 'medium' | 'large'

// Color variants - semantic color system
export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'

// Button variants - following modern UI patterns
export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'

// Component props common to all components
export interface ComponentProps {
  class?: string
  style?: Record<string, any>
}

// Theme context for consistent theming
export interface ThemeContext {
  size: Size
  radius: Radius
}

// Default theme values
export const DEFAULT_THEME: ThemeContext = {
  size: 'medium',
  radius: 'medium'
} as const

// Component state interfaces
export interface ComponentState {
  id: string
  disabled: boolean
  focused: boolean
  pressed: boolean
  hovered: boolean
}

export interface ButtonState extends ComponentState {
  loading: boolean
  variant: ButtonVariant
  size: Size
}

export interface InputState extends ComponentState {
  value: string
  placeholder: string
  invalid: boolean
  readonly: boolean
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  required: boolean
}

export interface ModalState extends ComponentState {
  open: boolean
  title: string
  description?: string
  closable: boolean
  backdrop: boolean
}

export interface SelectState<T = any> extends ComponentState {
  value: T | T[]
  options: SelectOption<T>[]
  open: boolean
  multiple: boolean
  searchable: boolean
}

export interface SelectOption<T = any> {
  value: T
  label: string
  disabled?: boolean
}

// Event handler types
export type EventHandler<T = Event> = (event: T) => void
export type KeyboardEventHandler = EventHandler<KeyboardEvent>
export type MouseEventHandler = EventHandler<MouseEvent>
export type FocusEventHandler = EventHandler<FocusEvent>

// Component configuration
export interface ComponentConfig {
  id?: string
  disabled?: boolean
  className?: string
  style?: Record<string, any>
  ariaLabel?: string
  ariaDescribedBy?: string
}

// Accessibility attributes
export interface AriaAttributes {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-selected'?: boolean
  'aria-checked'?: boolean
  'aria-disabled'?: boolean
  'aria-hidden'?: boolean
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  role?: string
  tabIndex?: number
}

// Position and size types
export interface Position {
  x: number
  y: number
}

export interface Dimensions {
  width: number
  height: number
}

export interface Rect extends Position, Dimensions {}

// Validation types
export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export type Validator<T = any> = (value: T) => ValidationResult | Promise<ValidationResult>
