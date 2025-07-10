import type { 
  ButtonState, 
  ButtonVariant,
  Size,
  ComponentConfig, 
  AriaAttributes, 
  EventHandler, 
  KeyboardEventHandler, 
  MouseEventHandler 
} from '../types'
import { generateId } from '../utils'

export interface ButtonConfig extends ComponentConfig {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
  onClick?: MouseEventHandler
  onKeyDown?: KeyboardEventHandler
  onFocus?: EventHandler
  onBlur?: EventHandler
}

export interface UseButtonReturn {
  state: ButtonState
  props: ButtonProps
  handlers: ButtonHandlers
}

export interface ButtonProps extends AriaAttributes {
  id: string
  type: 'button' | 'submit' | 'reset'
  disabled: boolean
  'aria-pressed': boolean
  'aria-busy': boolean
  'data-state': 'idle' | 'loading' | 'pressed'
  'data-variant': string
  'data-size': string
}

export interface ButtonHandlers {
  onClick: MouseEventHandler
  onKeyDown: KeyboardEventHandler
  onFocus: EventHandler
  onBlur: EventHandler
  onMouseEnter: EventHandler
  onMouseLeave: EventHandler
  onMouseDown: EventHandler
  onMouseUp: EventHandler
}

export function useButton(config: ButtonConfig = {}): UseButtonReturn {
  const {
    id = generateId('button'),
    disabled = false,
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingText,
    onClick,
    onKeyDown,
    onFocus,
    onBlur,
    ariaLabel,
    ariaDescribedBy,
    ...rest
  } = config

  // State management
  const state: ButtonState = {
    id,
    disabled: disabled || loading,
    focused: false,
    pressed: false,
    hovered: false,
    loading,
    variant: variant as ButtonVariant, // Type assertion for compatibility
    size: size as Size, // Type assertion for compatibility
  }

  // Props for the button element
  const props: ButtonProps = {
    id,
    type: 'button',
    disabled: state.disabled,
    'aria-pressed': state.pressed,
    'aria-busy': loading,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'data-state': loading ? 'loading' : state.pressed ? 'pressed' : 'idle',
    'data-variant': variant,
    'data-size': size,
    ...rest
  }

  // Event handlers
  const handlers: ButtonHandlers = {
    onClick: (event) => {
      if (state.disabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    },

    onKeyDown: (event) => {
      if (state.disabled) {
        event.preventDefault()
        return
      }

      // Handle Enter and Space keys
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        state.pressed = true
        
        // Simulate click
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
        event.target?.dispatchEvent(clickEvent)
      }

      onKeyDown?.(event)
    },

    onFocus: (event) => {
      state.focused = true
      onFocus?.(event)
    },

    onBlur: (event) => {
      state.focused = false
      state.pressed = false
      onBlur?.(event)
    },

    onMouseEnter: () => {
      state.hovered = true
    },

    onMouseLeave: () => {
      state.hovered = false
      state.pressed = false
    },

    onMouseDown: () => {
      if (!state.disabled) {
        state.pressed = true
      }
    },

    onMouseUp: () => {
      state.pressed = false
    }
  }

  return {
    state,
    props,
    handlers
  }
}

// Helper function to create button attributes
export function createButtonAttributes(config: ButtonConfig): Record<string, any> {
  const { props, handlers } = useButton(config)
  
  return {
    ...props,
    ...handlers
  }
}
