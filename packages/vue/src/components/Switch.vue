<template>
  <button
    :id="switchState.id"
    :class="switchClasses"
    :disabled="switchState.disabled"
    :data-state="switchState.checked ? 'checked' : 'unchecked'"
    :data-disabled="switchState.disabled"
    :data-focused="switchState.focused"
    :data-hovered="switchState.hovered"
    type="button"
    role="switch"
    :aria-checked="switchState.checked"
    @click="toggle"
    @mouseenter="switchState.hovered = true"
    @mouseleave="switchState.hovered = false"
    @focus="switchState.focused = true"
    @blur="switchState.focused = false"
    v-bind="$attrs"
  >
    <span :class="thumbClasses" />
  </button>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { cn, createSwitch } from '@upbox2-ui/core'
import { cva } from 'class-variance-authority'

interface SwitchProps {
  modelValue?: boolean
  size?: 'small' | 'medium' | 'large'
  name?: string
  value?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const switchState = reactive(createSwitch({
  checked: props.modelValue,
  size: props.size,
  disabled: props.disabled,
  name: props.name,
  value: props.value,
}))

const toggle = () => {
  if (switchState.disabled) return
  switchState.checked = !switchState.checked
  emit('update:modelValue', switchState.checked)
}

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      checked: {
        true: 'bg-primary',
        false: 'bg-input',
      },
      size: {
        small: 'h-4 w-7',
        medium: 'h-6 w-11',
        large: 'h-8 w-14',
      },
    },
    defaultVariants: {
      checked: false,
      size: 'medium',
    },
  }
)

const thumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    variants: {
      checked: {
        true: '',
        false: '',
      },
      size: {
        small: 'h-3 w-3',
        medium: 'h-5 w-5',
        large: 'h-7 w-7',
      },
    },
    defaultVariants: {
      checked: false,
      size: 'medium',
    },
  }
)

const switchClasses = computed(() =>
  cn(
    switchVariants({
      checked: switchState.checked,
      size: switchState.size,
    }),
    props.class
  )
)

const thumbClasses = computed(() => {
  const translateMap = {
    small: switchState.checked ? 'translate-x-3' : 'translate-x-0',
    medium: switchState.checked ? 'translate-x-5' : 'translate-x-0',
    large: switchState.checked ? 'translate-x-7' : 'translate-x-0',
  }
  
  return cn(
    thumbVariants({
      checked: switchState.checked,
      size: switchState.size,
    }),
    translateMap[switchState.size as keyof typeof translateMap]
  )
})
</script>
