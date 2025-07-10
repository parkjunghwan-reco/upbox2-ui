<template>
  <teleport to="body">
    <div
      v-if="open"
      :class="overlayClass"
      @click="handleOverlayClick"
      @keydown="handleKeyDown"
    >
      <div
        :class="contentClass"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="descriptionId"
        @click.stop
      >
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue'
import { cn } from '@upbox2-ui/core'

// Component props
interface ModalProps {
  open?: boolean
  closeOnEscape?: boolean
  closeOnBackdrop?: boolean
  preventScroll?: boolean
  titleId?: string
  descriptionId?: string
}

// Props with defaults
const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  closeOnEscape: true,
  closeOnBackdrop: true,
  preventScroll: true,
})

// Emits
const emit = defineEmits<{
  'update:open': [open: boolean]
  close: []
}>()

// Computed classes
const overlayClass = computed(() => {
  return cn(
    'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
  )
})

const contentClass = computed(() => {
  return cn(
    'relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg',
    'rounded-lg outline-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]'
  )
})

// Event handlers
const handleOverlayClick = () => {
  if (props.closeOnBackdrop) {
    emit('update:open', false)
    emit('close')
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    emit('update:open', false)
    emit('close')
  }
}

// Body scroll management
const originalBodyStyle = {
  overflow: document.body.style.overflow,
  paddingRight: document.body.style.paddingRight,
}

watch(
  () => props.open,
  (isOpen) => {
    if (props.preventScroll) {
      if (isOpen) {
        // Prevent scroll
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`
      } else {
        // Restore scroll
        document.body.style.overflow = originalBodyStyle.overflow
        document.body.style.paddingRight = originalBodyStyle.paddingRight
      }
    }
  }
)

// Cleanup on unmount
onUnmounted(() => {
  if (props.preventScroll) {
    document.body.style.overflow = originalBodyStyle.overflow
    document.body.style.paddingRight = originalBodyStyle.paddingRight
  }
})

// Define component name
defineOptions({
  name: 'Modal',
})
</script>
  overlayClass: '',
  contentClass: ''
})

const emit = defineEmits<{
  'update:open': [open: boolean]

