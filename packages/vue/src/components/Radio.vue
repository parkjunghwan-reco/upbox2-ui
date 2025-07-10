<template>
  <div class="space-y-2">
    <div
      v-for="option in radioState.options"
      :key="option.value"
      class="flex items-center space-x-2"
    >
      <button
        :id="`${radioState.id}-${option.value}`"
        :class="radioClasses(option)"
        :disabled="option.disabled || radioState.disabled"
        :data-state="modelValue === option.value ? 'checked' : 'unchecked'"
        :data-disabled="option.disabled || radioState.disabled"
        type="button"
        role="radio"
        :aria-checked="modelValue === option.value"
        :aria-labelledby="`${radioState.id}-${option.value}-label`"
        @click="selectOption(option)"
        @focus="radioState.focused = true"
        @blur="radioState.focused = false"
        @mouseenter="radioState.hovered = true"
        @mouseleave="radioState.hovered = false"
      >
        <span
          v-if="modelValue === option.value"
          :class="indicatorClasses"
        />
      </button>
      <label
        :id="`${radioState.id}-${option.value}-label`"
        :for="`${radioState.id}-${option.value}`"
        :class="labelClasses(option)"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { cn, createRadio, type RadioOption } from '@upbox2-ui/core'
import { cva } from 'class-variance-authority'

interface RadioProps {
  modelValue?: string
  options?: RadioOption[]
  name?: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  options: () => [],
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const radioState = reactive(createRadio({
  options: props.options,
  value: props.modelValue,
  name: props.name,
  size: props.size,
  disabled: props.disabled,
}))

const selectOption = (option: RadioOption) => {
  if (option.disabled || radioState.disabled) return
  emit('update:modelValue', option.value)
}

const radioVariants = cva(
  'aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center',
  {
    variants: {
      size: {
        small: 'h-3 w-3',
        medium: 'h-4 w-4',
        large: 'h-5 w-5',
      },
      checked: {
        true: 'bg-primary border-primary',
        false: 'bg-background',
      },
    },
    defaultVariants: {
      size: 'medium',
      checked: false,
    },
  }
)

const indicatorVariants = cva(
  'block rounded-full bg-primary-foreground',
  {
    variants: {
      size: {
        small: 'h-1.5 w-1.5',
        medium: 'h-2 w-2',
        large: 'h-2.5 w-2.5',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
)

const labelVariants = cva(
  'cursor-pointer select-none',
  {
    variants: {
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'medium',
      disabled: false,
    },
  }
)

const radioClasses = (option: RadioOption) => {
  return cn(
    radioVariants({
      size: radioState.size,
      checked: props.modelValue === option.value,
    }),
    props.class
  )
}

const indicatorClasses = computed(() =>
  cn(
    indicatorVariants({
      size: radioState.size,
    })
  )
)

const labelClasses = (option: RadioOption) => {
  return cn(
    labelVariants({
      size: radioState.size,
      disabled: option.disabled || radioState.disabled,
    })
  )
}
</script>
