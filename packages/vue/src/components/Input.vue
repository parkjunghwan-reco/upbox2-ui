<template>
  <div class="input-wrapper">
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClass"
      v-bind="$attrs"
      @input="handleInput"
      @change="handleChange"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@upbox2-ui/core'
import type { Size, Radius } from '@upbox2-ui/core'

// Input variants using cva
const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        small: 'h-8 px-2 text-xs',
        medium: 'h-10 px-3 text-sm',
        large: 'h-12 px-4 text-base',
      },
      radius: {
        small: 'rounded-sm',
        medium: 'rounded-md',
        large: 'rounded-lg',
      },
      state: {
        default: 'border-gray-300',
        error: 'border-red-500 focus-visible:ring-red-500',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
    },
    defaultVariants: {
      size: 'medium',
      radius: 'medium',
      state: 'default',
    },
  }
)

// Component props
interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  size?: Size
  radius?: Radius
  id?: string
}

// Props with defaults
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'medium',
  radius: 'medium',
  disabled: false,
  readonly: false,
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// Computed properties
const inputId = computed(() => 
  props.id || `input-${Math.random().toString(36).substr(2, 9)}`
)

const inputClass = computed(() => {
  return cn(
    inputVariants({
      size: props.size,
      radius: props.radius,
      state: props.error ? 'error' : 'default',
    })
  )
})

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

// Define component name
defineOptions({
  name: 'Input',
  inheritAttrs: false,
})
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.error-message {
  color: #ef4444; /* red-500 */
  font-size: 0.875rem;
  font-weight: 500;
}
</style>

  emit('keydown', event)
}



