import { ref, computed } from 'vue'

export interface UseToggleOptions {
  initialValue?: boolean
  onToggle?: (value: boolean) => void
}

export function useToggle(options: UseToggleOptions = {}) {
  const { initialValue = false, onToggle } = options
  
  const state = ref(initialValue)
  
  const toggle = () => {
    state.value = !state.value
    onToggle?.(state.value)
  }
  
  const setTrue = () => {
    state.value = true
    onToggle?.(state.value)
  }
  
  const setFalse = () => {
    state.value = false
    onToggle?.(state.value)
  }
  
  return {
    state: computed(() => state.value),
    toggle,
    setTrue,
    setFalse,
  }
}

export interface UseDisclosureOptions {
  initialOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const { initialOpen = false, onOpen, onClose } = options
  
  const isOpen = ref(initialOpen)
  
  const open = () => {
    isOpen.value = true
    onOpen?.()
  }
  
  const close = () => {
    isOpen.value = false
    onClose?.()
  }
  
  const toggle = () => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }
  
  return {
    isOpen: computed(() => isOpen.value),
    open,
    close,
    toggle
  }
}
