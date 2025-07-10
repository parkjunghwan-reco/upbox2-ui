<template>
  <div class="w-full">
    <!-- Label -->
    <div v-if="label || showValue" class="flex items-center justify-between mb-2">
      <span v-if="label" class="font-medium" :class="labelSizeClass">
        {{ label }}
      </span>
      <span v-if="showValue" class="font-medium" :class="labelSizeClass">
        {{ indeterminate ? 'Loading...' : `${Math.round(percentage)}%` }}
      </span>
    </div>

    <!-- Progress Bar -->
    <div 
      class="w-full rounded-full overflow-hidden"
      :class="[backgroundClass, sizeClass]"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : value"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-label="label || `Progress: ${Math.round(percentage)}%`"
    >
      <div
        class="h-full rounded-full transition-all duration-300 ease-out"
        :class="[
          variantClass,
          {
            'animate-pulse': indeterminate,
            'progress-striped': striped,
            'progress-animated': animated,
          }
        ]"
        :style="progressStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
export type Size = 'small' | 'medium' | 'large'

interface Props {
  value?: number
  max?: number
  variant?: ProgressVariant
  size?: Size
  showValue?: boolean
  label?: string
  indeterminate?: boolean
  striped?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  variant: 'default',
  size: 'medium',
  showValue: false,
  indeterminate: false,
  striped: false,
  animated: false,
})

// Constants
const progressVariants = {
  default: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
} as const

const progressBackgrounds = {
  default: 'bg-gray-200',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
  info: 'bg-blue-100',
} as const

const progressSizes = {
  small: 'h-2',
  medium: 'h-3',
  large: 'h-4',
} as const

const progressLabelSizes = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
} as const

// Computed properties
const percentage = computed(() => {
  if (props.indeterminate) return 100
  return Math.min(Math.max((props.value / props.max) * 100, 0), 100)
})

const variantClass = computed(() => progressVariants[props.variant])
const backgroundClass = computed(() => progressBackgrounds[props.variant])
const sizeClass = computed(() => progressSizes[props.size])
const labelSizeClass = computed(() => progressLabelSizes[props.size])

const progressStyle = computed(() => {
  if (props.indeterminate) {
    return {
      width: '100%',
      animation: 'progress-indeterminate 1.5s ease-in-out infinite',
    }
  }
  
  return {
    width: `${percentage.value}%`,
  }
})
</script>

<style scoped>
.progress-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.progress-animated {
  animation: progress-bar-stripes 1s linear infinite;
}

@keyframes progress-bar-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
