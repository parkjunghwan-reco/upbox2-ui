import type { 
  InputState, 
  ComponentConfig, 
  AriaAttributes, 
  EventHandler, 
  KeyboardEventHandler, 
  Validator,
  ValidationResult
} from '../types'
import { generateId } from '../utils'

export interface InputConfig extends ComponentConfig {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  value?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
  readOnly?: boolean
  autoComplete?: string
  autoFocus?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string
  validators?: Validator[]
  onChange?: (value: string) => void
  onInput?: EventHandler
  onKeyDown?: KeyboardEventHandler
  onFocus?: EventHandler
  onBlur?: EventHandler
}

export interface UseInputReturn {
  state: InputState
  props: InputProps
  handlers: InputHandlers
  validation: ValidationResult
  setValue: (value: string) => void
  validate: () => Promise<ValidationResult>
  reset: () => void
}

export interface InputProps extends AriaAttributes {
  id: string
  type: string
  value: string
  placeholder: string
  disabled: boolean
  required: boolean
  readOnly: boolean
  autoComplete?: string
  autoFocus?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string
  'aria-invalid': boolean
  'aria-required': boolean
  'data-state': 'idle' | 'focused' | 'invalid'
}

export interface InputHandlers {
  onChange: EventHandler
  onInput: EventHandler
  onKeyDown: KeyboardEventHandler
  onFocus: EventHandler
  onBlur: EventHandler
}

export function useInput(config: InputConfig = {}): UseInputReturn {
  const {
    id = generateId('input'),
    type = 'text',
    value: initialValue = '',
    defaultValue = '',
    placeholder = '',
    disabled = false,
    required = false,
    readOnly = false,
    autoComplete,
    autoFocus,
    maxLength,
    minLength,
    pattern,
    validators = [],
    onChange,
    onInput,
    onKeyDown,
    onFocus,
    onBlur,
    ariaLabel,
    ariaDescribedBy,
    ...rest
  } = config

  // State management
  let currentValue = initialValue || defaultValue
  let isValid = true
  let validationErrors: string[] = []

  const state: InputState = {
    id,
    disabled,
    focused: false,
    pressed: false,
    hovered: false,
    value: currentValue,
    placeholder,
    type,
    invalid: !isValid,
    required,
    readonly: readOnly // Add missing property
  }

  // Validation function
  const validate = async (): Promise<ValidationResult> => {
    const errors: string[] = []

    // Built-in validation
    if (required && !currentValue.trim()) {
      errors.push('This field is required')
    }

    if (minLength && currentValue.length < minLength) {
      errors.push(`Minimum length is ${minLength}`)
    }

    if (maxLength && currentValue.length > maxLength) {
      errors.push(`Maximum length is ${maxLength}`)
    }

    if (pattern && !new RegExp(pattern).test(currentValue)) {
      errors.push('Invalid format')
    }

    // Type-specific validation
    if (type === 'email' && currentValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValue)) {
      errors.push('Invalid email format')
    }

    if (type === 'url' && currentValue) {
      try {
        new URL(currentValue)
      } catch {
        errors.push('Invalid URL format')
      }
    }

    // Custom validators
    for (const validator of validators) {
      const result = await validator(currentValue)
      if (!result.valid) {
        errors.push(...result.errors)
      }
    }

    const result = {
      valid: errors.length === 0,
      errors
    }

    isValid = result.valid
    validationErrors = result.errors
    state.invalid = !isValid

    return result
  }

  // Props for the input element
  const props: InputProps = {
    id,
    type,
    value: currentValue,
    placeholder,
    disabled,
    required,
    readOnly,
    autoComplete,
    autoFocus,
    maxLength,
    minLength,
    pattern,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': !isValid,
    'aria-required': required,
    'data-state': !isValid ? 'invalid' : state.focused ? 'focused' : 'idle',
    ...rest
  }

  // Event handlers
  const handlers: InputHandlers = {
    onChange: (event) => {
      const target = event.target as HTMLInputElement
      currentValue = target.value
      state.value = currentValue
      onChange?.(currentValue)
    },

    onInput: (event) => {
      const target = event.target as HTMLInputElement
      currentValue = target.value
      state.value = currentValue
      onInput?.(event)
    },

    onKeyDown: (event) => {
      onKeyDown?.(event)
    },

    onFocus: (event) => {
      state.focused = true
      onFocus?.(event)
    },

    onBlur: (event) => {
      state.focused = false
      validate() // Validate on blur
      onBlur?.(event)
    }
  }

  const setValue = (value: string) => {
    currentValue = value
    state.value = value
    onChange?.(value)
  }

  const reset = () => {
    currentValue = defaultValue
    state.value = defaultValue
    isValid = true
    validationErrors = []
    state.invalid = false
    onChange?.(defaultValue)
  }

  return {
    state,
    props,
    handlers,
    validation: {
      valid: isValid,
      errors: validationErrors
    },
    setValue,
    validate,
    reset
  }
}

// Helper function to create input attributes
export function createInputAttributes(config: InputConfig): Record<string, any> {
  const { props, handlers } = useInput(config)
  
  return {
    ...props,
    ...handlers
  }
}
