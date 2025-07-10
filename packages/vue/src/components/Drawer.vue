<template>
  <teleport to="body">
    <div v-if="modelValue" class="drawer-container">
      <!-- Overlay -->
      <div
        v-if="overlay"
        :class="classes.overlay"
        @click="handleOverlayClick"
      />
      
      <!-- Drawer content -->
      <div
        :class="classes.content"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="headerId"
        :aria-describedby="contentId"
        ref="drawerRef"
      >
        <!-- Close button -->
        <button
          v-if="showCloseButton"
          :class="classes.closeButton"
          @click="handleClose"
          aria-label="Close drawer"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Header slot -->
        <div v-if="$slots.header" :id="headerId" class="p-6 pb-4 border-b border-gray-200 text-gray-900">
          <slot name="header" />
        </div>
        
        <!-- Default content slot -->
        <div :id="contentId" class="p-6 flex-1 overflow-y-auto text-gray-900">
          <slot />
        </div>
        
        <!-- Footer slot -->
        <div v-if="$slots.footer" class="p-6 pt-4 border-t border-gray-200 text-gray-900">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { generateDrawerClasses, type DrawerConfig, type DrawerPosition, type DrawerSize } from '@upbox2-ui/core'

interface Props {
  modelValue: boolean
  position?: DrawerPosition
  size?: DrawerSize
  overlay?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
  overlayClassName?: string
  contentClassName?: string
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void
  (event: 'close'): void
  (event: 'open'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  position: 'right',
  size: 'md',
  overlay: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  className: '',
  overlayClassName: '',
  contentClassName: ''
})

const emit = defineEmits<Emits>()

const drawerRef = ref<HTMLElement>()
const headerId = ref(`drawer-header-${Math.random().toString(36).substr(2, 9)}`)
const contentId = ref(`drawer-content-${Math.random().toString(36).substr(2, 9)}`)

const config = computed<DrawerConfig>(() => ({
  position: props.position,
  size: props.size,
  overlay: props.overlay,
  closeOnOverlayClick: props.closeOnOverlayClick,
  closeOnEscape: props.closeOnEscape,
  showCloseButton: props.showCloseButton,
  className: props.className,
  overlayClassName: props.overlayClassName,
  contentClassName: props.contentClassName
}))

const classes = computed(() => generateDrawerClasses(config.value, props.modelValue))

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    handleClose()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    handleClose()
  }
}

const handleFocusTrap = (event: KeyboardEvent) => {
  if (!props.modelValue || !drawerRef.value) return
  
  if (event.key === 'Tab') {
    const focusableElements = drawerRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement
    
    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable?.focus()
        event.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable?.focus()
        event.preventDefault()
      }
    }
  }
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    emit('open')
    // Focus first focusable element
    setTimeout(() => {
      const firstFocusable = drawerRef.value?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      firstFocusable?.focus()
    }, 100)
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keydown', handleFocusTrap)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keydown', handleFocusTrap)
  document.body.style.overflow = ''
})
</script>
