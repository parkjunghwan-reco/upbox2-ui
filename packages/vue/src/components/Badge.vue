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
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-500/80',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80',
        error: 'border-transparent bg-red-500 text-white hover:bg-red-500/80',
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
