<template>
  <Teleport to="body">
    <div
      v-if="visible"
      :class="[
        'fixed z-50 flex items-start gap-3 rounded-lg border shadow-lg transition-all duration-300',
        'animate-in slide-in-from-top-2 fade-in-0',
        variantClass,
        sizeClass,
        positionClass,
      ]"
      role="alert"
      :aria-live="variant === 'error' ? 'assertive' : 'polite'"
    >
      <!-- Icon -->
      <div v-if="icon || hasVariantIcon" class="flex-shrink-0 mt-0.5">
        <component
          :is="iconComponent"
          class="w-5 h-5"
          :class="iconColorClass"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div v-if="title" class="font-semibold text-sm" :class="titleColorClass">
          {{ title }}
        </div>
        <div v-if="description" class="text-sm opacity-90 mt-1" :class="descriptionColorClass">
          {{ description }}
        </div>
        
        <!-- Action -->
        <div v-if="action" class="mt-3">
          <button
            @click="handleAction"
            class="text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
            :class="actionColorClass"
          >
            {{ action.label }}
          </button>
        </div>
      </div>

      <!-- Close Button -->
      <button
        v-if="closable"
        @click="close"
        class="flex-shrink-0 p-1 rounded-md hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current transition-colors"
        :class="closeButtonColorClass"
        :aria-label="closeAriaLabel"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right'
export type Size = 'small' | 'medium' | 'large'

const toastVariants = {
  default: 'bg-white border-gray-200 text-gray-900',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
} as const

const toastSizes = {
  small: 'text-sm p-3 max-w-sm',
  medium: 'text-base p-4 max-w-md',
  large: 'text-lg p-5 max-w-lg',
} as const

const toastPositions = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
} as const

interface Props {
  variant?: ToastVariant
  size?: Size
  position?: ToastPosition
  duration?: number
  closable?: boolean
  title?: string
  description?: string
  icon?: string
  action?: {
    label: string
    onClick: () => void
  }
  closeAriaLabel?: string
}

interface Emits {
  close: []
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'medium',
  position: 'top-right',
  duration: 4000,
  closable: true,
  closeAriaLabel: 'Close notification',
})

const emit = defineEmits<Emits>()

const visible = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

// Computed classes
const variantClass = computed(() => toastVariants[props.variant])
const sizeClass = computed(() => toastSizes[props.size])
const positionClass = computed(() => toastPositions[props.position])

// Icon logic
const hasVariantIcon = computed(() => ['success', 'warning', 'error', 'info'].includes(props.variant))

const iconComponent = computed(() => {
  if (props.icon) return props.icon
  
  switch (props.variant) {
    case 'success':
      return 'CheckCircleIcon'
    case 'warning':
      return 'ExclamationTriangleIcon'
    case 'error':
      return 'XCircleIcon'
    case 'info':
      return 'InformationCircleIcon'
    default:
      return null
  }
})

// Color classes for different elements
const iconColorClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'text-green-400'
    case 'warning':
      return 'text-yellow-400'
    case 'error':
      return 'text-red-400'
    case 'info':
      return 'text-blue-400'
    default:
      return 'text-gray-400'
  }
})

const titleColorClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'text-green-800'
    case 'warning':
      return 'text-yellow-800'
    case 'error':
      return 'text-red-800'
    case 'info':
      return 'text-blue-800'
    default:
      return 'text-gray-900'
  }
})

const descriptionColorClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'text-green-700'
    case 'warning':
      return 'text-yellow-700'
    case 'error':
      return 'text-red-700'
    case 'info':
      return 'text-blue-700'
    default:
      return 'text-gray-600'
  }
})

const actionColorClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'text-green-600 hover:text-green-500'
    case 'warning':
      return 'text-yellow-600 hover:text-yellow-500'
    case 'error':
      return 'text-red-600 hover:text-red-500'
    case 'info':
      return 'text-blue-600 hover:text-blue-500'
    default:
      return 'text-gray-600 hover:text-gray-500'
  }
})

const closeButtonColorClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'text-green-400 hover:text-green-600'
    case 'warning':
      return 'text-yellow-400 hover:text-yellow-600'
    case 'error':
      return 'text-red-400 hover:text-red-600'
    case 'info':
      return 'text-blue-400 hover:text-blue-600'
    default:
      return 'text-gray-400 hover:text-gray-600'
  }
})

// Methods
const close = () => {
  visible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  emit('close')
}

const handleAction = () => {
  if (props.action) {
    props.action.onClick()
  }
}

// Lifecycle
onMounted(() => {
  visible.value = true
  
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      close()
    }, props.duration)
  }
})

// Cleanup timeout on unmount
watchEffect((onCleanup) => {
  onCleanup(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })
})
</script>

<style scoped>
@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: animate-in 0.3s ease-out forwards;
}

.slide-in-from-top-2 {
  animation-name: slide-in-from-top-2;
}

.fade-in-0 {
  animation-name: fade-in-0;
}

@keyframes slide-in-from-top-2 {
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fade-in-0 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
