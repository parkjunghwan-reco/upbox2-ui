<template>
  <nav class="flex items-center space-x-1" :class="sizeClass" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-1">
      <!-- Home Link -->
      <li v-if="showHome" class="flex items-center">
        <component
          :is="homeHref ? 'a' : 'button'"
          :href="homeHref"
          class="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          @click="handleHomeClick"
        >
          <component
            :is="homeIcon || 'HomeIcon'"
            class="w-4 h-4"
            aria-hidden="true"
          />
          <span class="sr-only">Home</span>
        </component>
      </li>

      <!-- Separator after home -->
      <li v-if="showHome && visibleItems.length > 0" class="flex items-center">
        <span class="text-gray-400 mx-2" aria-hidden="true">{{ separator }}</span>
      </li>

      <!-- Breadcrumb Items -->
      <template v-for="(item, index) in visibleItems" :key="item.id">
        <li class="flex items-center">
          <component
            :is="getItemComponent(item)"
            :href="item.href"
            class="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            :class="getItemClass(item)"
            :aria-current="item.current ? 'page' : undefined"
            :disabled="item.disabled"
            @click="handleItemClick(item, $event)"
          >
            <!-- Icon -->
            <component
              v-if="item.icon"
              :is="item.icon"
              class="w-4 h-4 mr-1"
              aria-hidden="true"
            />
            
            <!-- Label -->
            <span>{{ item.label }}</span>
          </component>
        </li>

        <!-- Separator -->
        <li v-if="index < visibleItems.length - 1" class="flex items-center">
          <span class="text-gray-400 mx-2" aria-hidden="true">{{ separator }}</span>
        </li>
      </template>

      <!-- Collapsed Items Indicator -->
      <li v-if="hasCollapsedItems" class="flex items-center">
        <button
          type="button"
          class="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1"
          @click="showAllItems = !showAllItems"
          :aria-label="showAllItems ? 'Hide items' : 'Show all items'"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export type Size = 'small' | 'medium' | 'large'

export interface BreadcrumbItem {
  id: string
  label: string
  href?: string
  icon?: string
  disabled?: boolean
  current?: boolean
}

interface Props {
  items: BreadcrumbItem[]
  size?: Size
  separator?: string
  maxItems?: number
  showHome?: boolean
  homeIcon?: string
  homeHref?: string
}

interface Emits {
  'item-click': [item: BreadcrumbItem, event: Event]
  'home-click': [event: Event]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  separator: '/',
  maxItems: 0,
  showHome: false,
})

const emit = defineEmits<Emits>()

// Local state
const showAllItems = ref(false)

// Constants
const breadcrumbSizes = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
} as const

// Computed
const sizeClass = computed(() => breadcrumbSizes[props.size])

const hasCollapsedItems = computed(() => {
  return props.maxItems > 0 && props.items.length > props.maxItems && !showAllItems.value
})

const visibleItems = computed(() => {
  if (props.maxItems <= 0 || showAllItems.value) {
    return props.items
  }

  if (props.items.length <= props.maxItems) {
    return props.items
  }

  // Show first item, ellipsis, and last few items
  const firstItem = props.items[0]
  const lastItems = props.items.slice(-Math.max(1, props.maxItems - 1))
  
  return [firstItem, ...lastItems]
})

// Methods
const getItemComponent = (item: BreadcrumbItem) => {
  if (item.disabled || item.current) {
    return 'span'
  }
  return item.href ? 'a' : 'button'
}

const getItemClass = (item: BreadcrumbItem) => {
  const baseClass = 'transition-colors duration-150'
  
  if (item.disabled) {
    return `${baseClass} text-gray-400 cursor-not-allowed`
  }
  
  if (item.current) {
    return `${baseClass} text-gray-900 font-medium`
  }
  
  return `${baseClass} text-gray-500 hover:text-gray-700`
}

const handleItemClick = (item: BreadcrumbItem, event: Event) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  
  emit('item-click', item, event)
}

const handleHomeClick = (event: Event) => {
  emit('home-click', event)
}
</script>
