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
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
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
