import type { 
  ModalState, 
  ComponentConfig, 
  AriaAttributes, 
  EventHandler, 
  KeyboardEventHandler
} from '../types'
import { generateId, trapFocus } from '../utils'

export interface ModalConfig extends ComponentConfig {
  open?: boolean
  title?: string
  description?: string
  closable?: boolean
  backdrop?: boolean
  closeOnEscape?: boolean
  closeOnBackdrop?: boolean
  preventScroll?: boolean
  autoFocus?: boolean
  restoreFocus?: boolean
  onOpen?: () => void
  onClose?: () => void
  onKeyDown?: KeyboardEventHandler
}

export interface UseModalReturn {
  state: ModalState
  props: ModalProps
  overlayProps: ModalOverlayProps
  handlers: ModalHandlers
  open: () => void
  close: () => void
  toggle: () => void
}

export interface ModalProps extends AriaAttributes {
  id: string
  'aria-modal': boolean
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-state': 'open' | 'closed'
  tabIndex: number
}

export interface ModalOverlayProps {
  'data-state': 'open' | 'closed'
}

export interface ModalHandlers {
  onKeyDown: KeyboardEventHandler
  onOverlayClick: EventHandler
}

export function useModal(config: ModalConfig = {}): UseModalReturn {
  const {
    id = generateId('modal'),
    open: initialOpen = false,
    closable = true,
    backdrop = true,
    closeOnEscape = true,
    closeOnBackdrop = true,
    preventScroll = true,
    autoFocus = true,
    restoreFocus = true,
    title = '',
    description = '',
    onOpen,
    onClose,
    onKeyDown,
    ariaLabel,
    ariaDescribedBy,
    ...rest
  } = config

  // State management
  let isOpen = initialOpen
  let previousActiveElement: Element | null = null
  let cleanupFocusTrap: (() => void) | null = null

  const state: ModalState = {
    id,
    disabled: false,
    focused: false,
    pressed: false,
    hovered: false,
    open: isOpen,
    title: title || '', // Add missing title property
    description,
    closable,
    backdrop
  }

  // Props for the modal element
  const props: ModalProps = {
    id,
    'aria-modal': true,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'data-state': isOpen ? 'open' : 'closed',
    tabIndex: -1,
    ...rest
  }

  // Props for the overlay element
  const overlayProps: ModalOverlayProps = {
    'data-state': isOpen ? 'open' : 'closed'
  }

  // Open modal
  const open = () => {
    if (isOpen) return

    isOpen = true
    state.open = true

    // Store the currently focused element
    if (restoreFocus) {
      previousActiveElement = document.activeElement
    }

    // Prevent body scroll
    if (preventScroll) {
      document.body.style.overflow = 'hidden'
    }

    // Setup focus trap
    if (autoFocus) {
      setTimeout(() => {
        const modalElement = document.getElementById(id)
        if (modalElement) {
          cleanupFocusTrap = trapFocus(modalElement)
        }
      }, 0)
    }

    onOpen?.()
  }

  // Close modal
  const close = () => {
    if (!isOpen || !closable) return

    isOpen = false
    state.open = false

    // Restore body scroll
    if (preventScroll) {
      document.body.style.overflow = ''
    }

    // Cleanup focus trap
    if (cleanupFocusTrap) {
      cleanupFocusTrap()
      cleanupFocusTrap = null
    }

    // Restore focus
    if (restoreFocus && previousActiveElement && 'focus' in previousActiveElement) {
      (previousActiveElement as HTMLElement).focus()
    }

    onClose?.()
  }

  // Toggle modal
  const toggle = () => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }

  // Event handlers
  const handlers: ModalHandlers = {
    onKeyDown: (event) => {
      if (event.key === 'Escape' && closeOnEscape && closable) {
        close()
      }
      onKeyDown?.(event)
    },

    onOverlayClick: (event) => {
      if (closeOnBackdrop && closable && event.target === event.currentTarget) {
        close()
      }
    }
  }

  return {
    state,
    props,
    overlayProps,
    handlers,
    open,
    close,
    toggle
  }
}

// Helper function to create modal attributes
export function createModalAttributes(config: ModalConfig): Record<string, any> {
  const { props, handlers } = useModal(config)
  
  return {
    ...props,
    ...handlers
  }
}
