// DOM utilities
export function getElement(selector: string | Element): Element | null {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  }
  return selector
}

export function getElementById(id: string): Element | null {
  return document.getElementById(id)
}

export function createElement(tag: string, attributes: Record<string, any> = {}): Element {
  const element = document.createElement(tag)
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value)
    } else {
      element.setAttribute(key, value)
    }
  })
  
  return element
}

// Focus management
export function focusElement(element: Element | string): void {
  const el = getElement(element)
  if (el && 'focus' in el) {
    (el as HTMLElement).focus()
  }
}

export function blurElement(element: Element | string): void {
  const el = getElement(element)
  if (el && 'blur' in el) {
    (el as HTMLElement).blur()
  }
}

export function getFocusableElements(container: Element): Element[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ')
  
  return Array.from(container.querySelectorAll(selector))
}

export function trapFocus(container: Element): () => void {
  const focusableElements = getFocusableElements(container)
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
  
  const handleKeydown = (event: Event) => {
    if (event instanceof KeyboardEvent && event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }
  }
  
  container.addEventListener('keydown', handleKeydown)
  firstElement?.focus()
  
  return () => {
    container.removeEventListener('keydown', handleKeydown)
  }
}

// Keyboard navigation
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  items: Element[],
  currentIndex: number,
  options: {
    loop?: boolean
    orientation?: 'horizontal' | 'vertical'
    onSelect?: (index: number) => void
  } = {}
): number {
  const { loop = true, orientation = 'horizontal', onSelect } = options
  
  let newIndex = currentIndex
  
  switch (event.key) {
    case 'ArrowDown':
      if (orientation === 'vertical') {
        event.preventDefault()
        newIndex = loop
          ? (currentIndex + 1) % items.length
          : Math.min(currentIndex + 1, items.length - 1)
      }
      break
    case 'ArrowUp':
      if (orientation === 'vertical') {
        event.preventDefault()
        newIndex = loop
          ? (currentIndex - 1 + items.length) % items.length
          : Math.max(currentIndex - 1, 0)
      }
      break
    case 'ArrowRight':
      if (orientation === 'horizontal') {
        event.preventDefault()
        newIndex = loop
          ? (currentIndex + 1) % items.length
          : Math.min(currentIndex + 1, items.length - 1)
      }
      break
    case 'ArrowLeft':
      if (orientation === 'horizontal') {
        event.preventDefault()
        newIndex = loop
          ? (currentIndex - 1 + items.length) % items.length
          : Math.max(currentIndex - 1, 0)
      }
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = items.length - 1
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      onSelect?.(currentIndex)
      return currentIndex
  }
  
  if (newIndex !== currentIndex) {
    const element = items[newIndex] as HTMLElement
    element?.focus()
    onSelect?.(newIndex)
  }
  
  return newIndex
}

// Event utilities
export function createEventHandler<T extends Event>(
  handler: (event: T) => void,
  options: {
    preventDefault?: boolean
    stopPropagation?: boolean
    once?: boolean
  } = {}
): (event: T) => void {
  return (event: T) => {
    if (options.preventDefault) {
      event.preventDefault()
    }
    if (options.stopPropagation) {
      event.stopPropagation()
    }
    
    handler(event)
    
    if (options.once) {
      event.target?.removeEventListener(event.type, handler as EventListener)
    }
  }
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T {
  let timeout: ReturnType<typeof setTimeout>
  
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean
  
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }) as T
}
