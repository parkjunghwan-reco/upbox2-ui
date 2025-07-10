<template>
  <button
    :disabled="disabled"
    :class="buttonClass"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@upbox2-ui/core'
import type { ButtonVariant, Size, Radius } from '@upbox2-ui/core'

// Button variants using cva (following abc-def patterns)
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-gray-800',
        primary: 'bg-blue-600 text-white hover:bg-blue-500',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
        ghost: 'text-gray-900 hover:bg-gray-100',
        link: 'text-blue-600 underline-offset-4 hover:underline',
      },
      size: {
        small: 'h-8 px-3 text-xs',
        medium: 'h-9 px-4 py-2',
        large: 'h-10 px-8',
      },
      radius: {
        small: 'rounded-sm',
        medium: 'rounded-md',
        large: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      radius: 'medium',
    },
  }
)

// Component props
interface ButtonProps {
  variant?: ButtonVariant
  size?: Size
  radius?: Radius
  disabled?: boolean
}

// Props with defaults
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'medium',
  radius: 'medium',
  disabled: false,
})

// Emits
defineEmits<{
  click: [event: MouseEvent]
}>()

// Computed class
const buttonClass = computed(() => {
  return cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
      radius: props.radius,
    })
  )
})

// Define component name
defineOptions({
  name: 'Button',
  inheritAttrs: false,
})
</script>
