<template>
  <div 
    class="w-full"
    :class="variantContainerClass"
  >
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="accordion-item"
      :class="variantItemClass"
    >
      <!-- Header -->
      <button
        type="button"
        class="w-full flex items-center justify-between font-medium text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150"
        :class="[
          variantHeaderClass,
          sizeHeaderClass,
          {
            'opacity-50 cursor-not-allowed': item.disabled,
            'cursor-pointer': !item.disabled,
          }
        ]"
        :disabled="item.disabled"
        :aria-expanded="isItemOpen(item.id)"
        :aria-controls="`accordion-content-${item.id}`"
        :id="`accordion-header-${item.id}`"
        @click="handleHeaderClick(item)"
        @keydown="handleKeyDown($event, index)"
      >
        <div class="flex items-center">
          <!-- Icon -->
          <component
            v-if="item.icon"
            :is="item.icon"
            class="w-5 h-5 mr-3 text-gray-500"
          />
          
          <!-- Title -->
          <span class="text-gray-900">{{ item.title }}</span>
        </div>
        
        <!-- Arrow -->
        <svg
          class="w-5 h-5 text-gray-500 transform transition-transform duration-200"
          :class="{ 'rotate-180': isItemOpen(item.id) }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Content -->
      <div
        v-if="isItemOpen(item.id)"
        :id="`accordion-content-${item.id}`"
        :aria-labelledby="`accordion-header-${item.id}`"
        class="accordion-content text-gray-900"
        :class="[
          variantContentClass,
          sizeContentClass,
          {
            'animate-accordion-down': animated,
          }
        ]"
        role="region"
      >
        <slot 
          :name="item.id" 
          :item="item"
          :open="isItemOpen(item.id)"
        >
          <div v-if="item.content" class="text-gray-900 leading-relaxed" v-html="item.content" />
          <div v-else class="text-gray-500">
            Content for {{ item.title }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export type AccordionVariant = 'default' | 'bordered' | 'filled' | 'ghost'
export type AccordionType = 'single' | 'multiple'
export type Size = 'small' | 'medium' | 'large'

export interface AccordionItem {
  id: string
  title: string
  content?: string
  icon?: string
  disabled?: boolean
  defaultOpen?: boolean
}

interface Props {
  items: AccordionItem[]
  type?: AccordionType
  variant?: AccordionVariant
  size?: Size
  collapsible?: boolean
  modelValue?: string | string[]
  animated?: boolean
}

interface Emits {
  'update:modelValue': [value: string | string[]]
  'item-click': [item: AccordionItem]
  'item-open': [item: AccordionItem]
  'item-close': [item: AccordionItem]
}

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  variant: 'default',
  size: 'medium',
  collapsible: true,
  animated: true,
})

const emit = defineEmits<Emits>()

// Local state
const openItems = ref<string[]>([])

// Initialize open items
const initializeOpenItems = () => {
  if (props.modelValue) {
    if (Array.isArray(props.modelValue)) {
      openItems.value = [...props.modelValue]
    } else {
      openItems.value = [props.modelValue]
    }
  } else {
    // Use defaultOpen from items
    openItems.value = props.items
      .filter(item => item.defaultOpen && !item.disabled)
      .map(item => item.id)
  }
}

// Initialize on mount
initializeOpenItems()

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    if (Array.isArray(newValue)) {
      openItems.value = [...newValue]
    } else {
      openItems.value = [newValue]
    }
  } else {
    openItems.value = []
  }
}, { immediate: true })

// Constants
const accordionVariants = {
  default: {
    container: 'border border-gray-200 rounded-lg divide-y divide-gray-200',
    item: 'bg-white',
    header: 'px-4 py-3 hover:bg-gray-50 text-gray-900',
    content: 'px-4 py-3 bg-gray-50 text-gray-900',
  },
  bordered: {
    container: 'border border-gray-300 rounded-lg',
    item: 'bg-white border-b border-gray-200 last:border-b-0',
    header: 'px-4 py-3 hover:bg-gray-50 text-gray-900',
    content: 'px-4 py-3 border-t border-gray-200 text-gray-900',
  },
  filled: {
    container: 'bg-gray-100 rounded-lg',
    item: 'bg-white mb-2 last:mb-0 rounded-lg shadow-sm',
    header: 'px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-900',
    content: 'px-4 py-3 bg-gray-50 rounded-b-lg text-gray-900',
  },
  ghost: {
    container: '',
    item: 'mb-2 last:mb-0',
    header: 'px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-900',
    content: 'px-4 py-3 text-gray-900',
  },
} as const

const accordionSizes = {
  small: {
    header: 'px-3 py-2 text-sm text-gray-900',
    content: 'px-3 py-2 text-sm text-gray-900',
  },
  medium: {
    header: 'px-4 py-3 text-base text-gray-900',
    content: 'px-4 py-3 text-base text-gray-900',
  },
  large: {
    header: 'px-6 py-4 text-lg text-gray-900',
    content: 'px-6 py-4 text-base text-gray-900',
  },
} as const

// Computed
const variantContainerClass = computed(() => accordionVariants[props.variant].container)
const variantItemClass = computed(() => accordionVariants[props.variant].item)
const variantHeaderClass = computed(() => accordionVariants[props.variant].header)
const variantContentClass = computed(() => accordionVariants[props.variant].content)
const sizeHeaderClass = computed(() => accordionSizes[props.size].header)
const sizeContentClass = computed(() => accordionSizes[props.size].content)

// Methods
const isItemOpen = (itemId: string) => {
  return openItems.value.includes(itemId)
}

const openItem = (itemId: string) => {
  if (props.type === 'single') {
    openItems.value = [itemId]
  } else {
    if (!openItems.value.includes(itemId)) {
      openItems.value.push(itemId)
    }
  }
  
  emitValue()
  
  const item = props.items.find(i => i.id === itemId)
  if (item) {
    emit('item-open', item)
  }
}

const closeItem = (itemId: string) => {
  openItems.value = openItems.value.filter(id => id !== itemId)
  emitValue()
  
  const item = props.items.find(i => i.id === itemId)
  if (item) {
    emit('item-close', item)
  }
}

const toggleItem = (itemId: string) => {
  if (isItemOpen(itemId)) {
    if (props.collapsible || props.type === 'multiple') {
      closeItem(itemId)
    }
  } else {
    openItem(itemId)
  }
}

const emitValue = () => {
  if (props.type === 'single') {
    emit('update:modelValue', openItems.value[0] || '')
  } else {
    emit('update:modelValue', [...openItems.value])
  }
}

const handleHeaderClick = (item: AccordionItem) => {
  if (item.disabled) return
  
  emit('item-click', item)
  toggleItem(item.id)
}

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  const enabledItems = props.items.filter(item => !item.disabled)
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (index < enabledItems.length - 1) {
        const nextButton = document.getElementById(`accordion-header-${enabledItems[index + 1].id}`)
        nextButton?.focus()
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (index > 0) {
        const prevButton = document.getElementById(`accordion-header-${enabledItems[index - 1].id}`)
        prevButton?.focus()
      }
      break
    case 'Home':
      event.preventDefault()
      if (enabledItems.length > 0) {
        const firstButton = document.getElementById(`accordion-header-${enabledItems[0].id}`)
        firstButton?.focus()
      }
      break
    case 'End':
      event.preventDefault()
      if (enabledItems.length > 0) {
        const lastButton = document.getElementById(`accordion-header-${enabledItems[enabledItems.length - 1].id}`)
        lastButton?.focus()
      }
      break
  }
}
</script>

<style scoped>
@keyframes accordion-down {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
    opacity: 1;
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}

.animate-accordion-down {
  animation: accordion-down 0.2s ease-out;
}

.animate-accordion-up {
  animation: accordion-up 0.2s ease-out;
}
</style>
