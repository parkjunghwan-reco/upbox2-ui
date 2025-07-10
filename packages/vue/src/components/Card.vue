<template>
  <div
    :id="cardState.id"
    :class="cardClasses"
    :data-disabled="cardState.disabled"
    :data-focused="cardState.focused"
    :data-hovered="cardState.hovered"
    @mouseenter="cardState.hovered = true"
    @mouseleave="cardState.hovered = false"
    @focus="cardState.focused = true"
    @blur="cardState.focused = false"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { cn, createCard } from '@upbox2-ui/core'
import { cva } from 'class-variance-authority'

interface CardProps {
  variant?: 'default' | 'outline'
  padding?: 'none' | 'small' | 'medium' | 'large'
  class?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'medium',
})

const cardState = reactive(createCard(props))

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border',
        outline: 'border-2 border-border',
      },
      padding: {
        none: 'p-0',
        small: 'p-3',
        medium: 'p-6',
        large: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'medium',
    },
  }
)

const cardClasses = computed(() =>
  cn(
    cardVariants({
      variant: cardState.variant,
      padding: cardState.padding,
    }),
    props.class
  )
)
</script>
