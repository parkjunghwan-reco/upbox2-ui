<template>
  <span
    :id="badgeState.id"
    :class="badgeClasses"
    :data-disabled="badgeState.disabled"
    :data-focused="badgeState.focused"
    :data-hovered="badgeState.hovered"
    @mouseenter="badgeState.hovered = true"
    @mouseleave="badgeState.hovered = false"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { cn, createBadge } from '@upbox2-ui/core'
import { cva } from 'class-variance-authority'

interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'small' | 'medium' | 'large'
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'medium',
})

const badgeState = reactive(createBadge(props))

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gray-900 text-white hover:bg-gray-800',
        primary: 'border-transparent bg-blue-600 text-white hover:bg-blue-500',
        secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-400',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-400',
        error: 'border-transparent bg-red-500 text-white hover:bg-red-400',
      },
      size: {
        small: 'text-xs px-2 py-0.5',
        medium: 'text-sm px-2.5 py-0.5',
        large: 'text-base px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
)

const badgeClasses = computed(() =>
  cn(
    badgeVariants({
      variant: badgeState.variant,
      size: badgeState.size,
    }),
    props.class
  )
)
</script>
