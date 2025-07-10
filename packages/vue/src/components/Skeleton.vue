<template>
  <div v-if="loading" class="space-y-2">
    <div
      v-for="line in lines"
      :key="line"
      class="bg-gray-200 rounded"
      :class="[
        skeletonClass,
        {
          'animate-pulse': animated,
          'rounded-full': variant === 'circle' || variant === 'avatar',
          'rounded-md': variant === 'button' || (variant === 'rectangle' && rounded),
        }
      ]"
      :style="skeletonStyle"
    />
  </div>
  
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type SkeletonVariant = 'text' | 'rectangle' | 'circle' | 'avatar' | 'button'
export type Size = 'small' | 'medium' | 'large'

interface Props {
  variant?: SkeletonVariant
  size?: Size
  width?: string | number
  height?: string | number
  lines?: number
  loading?: boolean
  animated?: boolean
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  size: 'medium',
  lines: 1,
  loading: true,
  animated: true,
  rounded: false,
})

// Constants
const skeletonSizes = {
  small: {
    text: 'h-3',
    rectangle: 'h-24',
    circle: 'w-8 h-8',
    avatar: 'w-8 h-8',
    button: 'h-8 w-20',
  },
  medium: {
    text: 'h-4',
    rectangle: 'h-32',
    circle: 'w-12 h-12',
    avatar: 'w-10 h-10',
    button: 'h-10 w-24',
  },
  large: {
    text: 'h-5',
    rectangle: 'h-40',
    circle: 'w-16 h-16',
    avatar: 'w-12 h-12',
    button: 'h-12 w-28',
  },
} as const

// Computed properties
const skeletonClass = computed(() => {
  const sizeClasses = skeletonSizes[props.size]
  const baseClass = sizeClasses[props.variant]
  
  if (props.variant === 'text') {
    return `${baseClass} w-full`
  }
  
  return baseClass
})

const skeletonStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.width) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return styles
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
