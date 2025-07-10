<template>
  <div
    v-show="alertState.isVisible"
    :class="alertClasses"
    :data-variant="alertState.variant"
    role="alert"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <!-- Icons based on variant -->
        <svg
          v-if="alertState.variant === 'info'"
          class="h-5 w-5 text-blue-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="alertState.variant === 'success'"
          class="h-5 w-5 text-green-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="alertState.variant === 'warning'"
          class="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="alertState.variant === 'error'"
          class="h-5 w-5 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3 flex-1">
        <h3 v-if="alertState.title" :class="titleClasses">
          {{ alertState.title }}
        </h3>
        <div v-if="alertState.description" :class="descriptionClasses">
          {{ alertState.description }}
        </div>
        <div v-if="!alertState.title && !alertState.description">
          <slot />
        </div>
      </div>
      <div v-if="alertState.closable" class="ml-auto pl-3">
        <button
          type="button"
          class="inline-flex rounded-md bg-transparent p-1.5 text-current hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          @click="close"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { cn, createAlert } from '@upbox2-ui/core'
import { cva } from 'class-variance-authority'

interface AlertProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: string
  closable?: boolean
  size?: 'small' | 'medium' | 'large'
  class?: string
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'default',
  closable: false,
  size: 'medium',
})

const emit = defineEmits<{
  close: []
}>()

const alertState = reactive(createAlert({
  variant: props.variant,
  title: props.title,
  description: props.description,
  closable: props.closable,
  size: props.size,
}))

const close = () => {
  alertState.isVisible = false
  emit('close')
}

const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        info: 'border-blue-200 bg-blue-50 text-blue-900',
        success: 'border-green-200 bg-green-50 text-green-900',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
        error: 'border-red-200 bg-red-50 text-red-900',
      },
      size: {
        small: 'p-3 text-sm',
        medium: 'p-4 text-base',
        large: 'p-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
)

const titleVariants = cva('font-medium', {
  variants: {
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

const descriptionVariants = cva('mt-2', {
  variants: {
    size: {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-base',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

const alertClasses = computed(() =>
  cn(
    alertVariants({
      variant: alertState.variant,
      size: alertState.size,
    }),
    props.class
  )
)

const titleClasses = computed(() =>
  cn(
    titleVariants({
      size: alertState.size,
    })
  )
)

const descriptionClasses = computed(() =>
  cn(
    descriptionVariants({
      size: alertState.size,
    })
  )
)
</script>
