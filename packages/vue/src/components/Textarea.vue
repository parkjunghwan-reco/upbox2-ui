<template>
  <textarea
    :id="textareaState.id"
    :class="textareaClasses"
    :rows="textareaState.rows"
    :cols="textareaState.cols"
    :placeholder="textareaState.placeholder"
    :disabled="textareaState.disabled"
    :value="modelValue"
    :data-disabled="textareaState.disabled"
    :data-focused="textareaState.focused"
    :data-hovered="textareaState.hovered"
    @input="handleInput"
    @focus="textareaState.focused = true"
    @blur="textareaState.focused = false"
    @mouseenter="textareaState.hovered = true"
    @mouseleave="textareaState.hovered = false"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { cn, createTextarea } from '@upbox2-ui/core'
import { cva } from 'class-variance-authority'

interface TextareaProps {
  modelValue?: string
  rows?: number
  cols?: number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  size?: 'small' | 'medium' | 'large'
  placeholder?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  rows: 3,
  resize: 'vertical',
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaState = reactive(createTextarea({
  rows: props.rows,
  cols: props.cols,
  resize: props.resize,
  size: props.size,
  placeholder: props.placeholder,
  disabled: props.disabled,
  value: props.modelValue,
}))

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        small: 'text-xs px-2 py-1',
        medium: 'text-sm px-3 py-2',
        large: 'text-base px-4 py-3',
      },
      resize: {
        none: 'resize-none',
        both: 'resize',
        horizontal: 'resize-x',
        vertical: 'resize-y',
      },
    },
    defaultVariants: {
      size: 'medium',
      resize: 'vertical',
    },
  }
)

const textareaClasses = computed(() =>
  cn(
    textareaVariants({
      size: textareaState.size,
      resize: textareaState.resize,
    }),
    props.class
  )
)
</script>
