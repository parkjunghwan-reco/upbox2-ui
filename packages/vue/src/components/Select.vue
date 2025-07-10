<template>
  <div class="relative" ref="selectContainer">
    <button
      :id="selectState.id"
      :class="selectClasses"
      :disabled="selectState.disabled"
      :aria-expanded="selectState.isOpen"
      :aria-haspopup="true"
      type="button"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      @keydown.escape="close"
      @keydown.arrow-down.prevent="handleArrowDown"
      @keydown.arrow-up.prevent="handleArrowUp"
      @focus="selectState.focused = true"
      @blur="selectState.focused = false"
      v-bind="$attrs"
    >
      <span class="block truncate">
        {{ selectedLabel || selectState.placeholder || 'Select option...' }}
      </span>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          class="w-5 h-5 text-gray-500"
          :class="{ 'transform rotate-180': selectState.isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="selectState.isOpen"
        class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        role="listbox"
        :aria-labelledby="selectState.id"
      >
        <div
          v-for="(option, index) in selectState.options"
          :key="option.value"
          :class="optionClasses(option, index)"
          :aria-selected="modelValue === option.value"
          role="option"
          @click="selectOption(option)"
          @mouseenter="highlightedIndex = index"
        >
          <span class="block truncate">{{ option.label }}</span>
          <span
            v-if="modelValue === option.value"
            class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import { cn, createSelect, type SelectOption } from '@upbox2-ui/core'
import { cva } from 'class-variance-authority'

interface SelectProps {
  modelValue?: string
  options?: SelectOption[]
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectContainer = ref<HTMLElement>()
const highlightedIndex = ref(-1)

const selectState = reactive(createSelect({
  options: props.options,
  value: props.modelValue,
  placeholder: props.placeholder,
  size: props.size,
  disabled: props.disabled,
}))

const selectedLabel = computed(() => {
  const selectedOption = selectState.options.find(option => option.value === props.modelValue)
  return selectedOption?.label
})

const toggle = () => {
  if (selectState.disabled) return
  selectState.isOpen = !selectState.isOpen
  if (selectState.isOpen) {
    highlightedIndex.value = selectState.options.findIndex(option => option.value === props.modelValue)
  }
}

const close = () => {
  selectState.isOpen = false
  highlightedIndex.value = -1
}

const selectOption = (option: SelectOption) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  close()
}

const handleArrowDown = () => {
  if (!selectState.isOpen) {
    toggle()
    return
  }
  highlightedIndex.value = Math.min(highlightedIndex.value + 1, selectState.options.length - 1)
}

const handleArrowUp = () => {
  if (!selectState.isOpen) {
    toggle()
    return
  }
  highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
}

const handleClickOutside = (event: Event) => {
  if (selectContainer.value && !selectContainer.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const selectVariants = cva(
  'relative w-full cursor-pointer rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        small: 'text-sm py-1.5 pl-2 pr-8',
        medium: 'text-sm py-2 pl-3 pr-10',
        large: 'text-base py-3 pl-4 pr-12',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
)

const optionClasses = (option: SelectOption, index: number) => {
  return cn(
    'relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100 hover:text-gray-900',
    {
      'bg-gray-100 text-gray-900': index === highlightedIndex.value,
      'text-gray-400 cursor-not-allowed': option.disabled,
    }
  )
}

const selectClasses = computed(() =>
  cn(
    selectVariants({
      size: selectState.size,
    }),
    props.class
  )
)
</script>
