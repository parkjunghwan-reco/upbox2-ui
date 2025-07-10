<template>
  <button
    :id="checkboxState.id"
    :class="checkboxClasses"
    :disabled="checkboxState.disabled"
    :data-state="
      checkboxState.indeterminate
        ? 'indeterminate'
        : checkboxState.checked
        ? 'checked'
        : 'unchecked'
    "
    :data-disabled="checkboxState.disabled"
    :data-focused="checkboxState.focused"
    :data-hovered="checkboxState.hovered"
    type="button"
    role="checkbox"
    :aria-checked="checkboxState.indeterminate ? 'mixed' : checkboxState.checked"
    @click="toggle"
    @mouseenter="checkboxState.hovered = true"
    @mouseleave="checkboxState.hovered = false"
    @focus="checkboxState.focused = true"
    @blur="checkboxState.focused = false"
    v-bind="$attrs"
  >
    <svg
      v-if="checkboxState.checked && !checkboxState.indeterminate"
      :class="iconClasses"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 4.5L6 12L2.5 8.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else-if="checkboxState.indeterminate"
      :class="iconClasses"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8H12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { cn, createCheckbox } from '@upbox2-ui/core'
import { cva } from 'class-variance-authority'

interface CheckboxProps {
  modelValue?: boolean
  indeterminate?: boolean
  size?: 'small' | 'medium' | 'large'
  name?: string
  value?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  indeterminate: false,
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checkboxState = reactive(createCheckbox({
  checked: props.modelValue,
  indeterminate: props.indeterminate,
  size: props.size,
  disabled: props.disabled,
  name: props.name,
  value: props.value,
}))

const toggle = () => {
  if (checkboxState.disabled) return
  checkboxState.checked = !checkboxState.checked
  checkboxState.indeterminate = false
  emit('update:modelValue', checkboxState.checked)
}

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      checked: {
        true: 'bg-primary text-primary-foreground',
        false: 'bg-background',
      },
      size: {
        small: 'h-3 w-3',
        medium: 'h-4 w-4',
        large: 'h-5 w-5',
      },
    },
    defaultVariants: {
      checked: false,
      size: 'medium',
    },
  }
)

const iconVariants = cva('', {
  variants: {
    size: {
      small: 'h-2 w-2',
      medium: 'h-3 w-3',
      large: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

const checkboxClasses = computed(() =>
  cn(
    checkboxVariants({
      checked: checkboxState.checked || checkboxState.indeterminate,
      size: checkboxState.size,
    }),
    props.class
  )
)

const iconClasses = computed(() =>
  cn(
    iconVariants({
      size: checkboxState.size,
    })
  )
)
</script>
