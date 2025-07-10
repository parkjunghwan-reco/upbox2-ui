<template>
  <div class="w-full" :class="{ 'flex': orientation === 'vertical' }">
    <!-- Tab List -->
    <div
      class="flex"
      :class="[
        orientation === 'horizontal' ? 'flex-row' : 'flex-col border-r border-gray-200 mr-4',
        variantListClass,
        {
          'w-full': fullWidth && orientation === 'horizontal',
          'min-w-48': orientation === 'vertical',
        }
      ]"
      role="tablist"
      :aria-orientation="orientation"
    >
      <button
        v-for="(tab, index) in items"
        :key="tab.id"
        type="button"
        class="relative flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :class="[
          sizeClass,
          variantTabClass,
          {
            [variantActiveTabClass]: modelValue === tab.id,
            'opacity-50 cursor-not-allowed': tab.disabled,
            'flex-1': fullWidth && orientation === 'horizontal',
            'justify-start': orientation === 'vertical',
          }
        ]"
        :disabled="tab.disabled"
        :aria-selected="modelValue === tab.id"
        :aria-controls="`tabpanel-${tab.id}`"
        :id="`tab-${tab.id}`"
        role="tab"
        @click="handleTabClick(tab)"
        @keydown="handleKeyDown($event, index)"
      >
        <!-- Icon -->
        <component
          v-if="tab.icon"
          :is="tab.icon"
          class="w-4 h-4"
          :class="{ 'mr-2': tab.label }"
        />
        
        <!-- Label -->
        <span v-if="tab.label">{{ tab.label }}</span>
        
        <!-- Badge -->
        <span
          v-if="tab.badge"
          class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full"
        >
          {{ tab.badge }}
        </span>
        
        <!-- Close Button -->
        <button
          v-if="tab.closable"
          type="button"
          class="ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @click.stop="handleTabClose(tab)"
          :aria-label="`Close ${tab.label}`"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </button>
    </div>

    <!-- Tab Panels -->
    <div class="flex-1" :class="{ 'mt-4': orientation === 'horizontal' }">
      <div
        v-for="tab in items"
        :key="tab.id"
        v-show="modelValue === tab.id"
        :id="`tabpanel-${tab.id}`"
        :aria-labelledby="`tab-${tab.id}`"
        role="tabpanel"
        class="focus:outline-none"
        :tabindex="modelValue === tab.id ? 0 : -1"
      >
        <slot 
          :name="tab.id" 
          :tab="tab"
          :active="modelValue === tab.id"
        >
          <div class="p-4 text-gray-500">
            Content for {{ tab.label }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type TabsVariant = 'default' | 'pills' | 'underline' | 'card'
export type TabsOrientation = 'horizontal' | 'vertical'
export type Size = 'small' | 'medium' | 'large'

export interface TabItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  badge?: string | number
  closable?: boolean
}

interface Props {
  items: TabItem[]
  modelValue?: string
  variant?: TabsVariant
  size?: Size
  orientation?: TabsOrientation
  fullWidth?: boolean
  lazy?: boolean
  keepAlive?: boolean
}

interface Emits {
  'update:modelValue': [value: string]
  'tab-click': [tab: TabItem]
  'tab-close': [tab: TabItem]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'medium',
  orientation: 'horizontal',
  fullWidth: false,
  lazy: false,
  keepAlive: false,
})

const emit = defineEmits<Emits>()

// Constants
const tabsVariants = {
  default: {
    list: 'border-b border-gray-200',
    tab: 'border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 text-gray-500',
    activeTab: 'border-blue-500 text-blue-600',
  },
  pills: {
    list: 'bg-gray-100 rounded-lg p-1',
    tab: 'rounded-md hover:bg-gray-200 text-gray-600',
    activeTab: 'bg-white shadow-sm text-gray-900',
  },
  underline: {
    list: 'border-b border-gray-200',
    tab: 'border-b-2 border-transparent hover:border-gray-300 text-gray-500',
    activeTab: 'border-blue-500 text-blue-600',
  },
  card: {
    list: 'border-b border-gray-200',
    tab: 'border border-transparent border-b-gray-200 hover:border-gray-300 -mb-px rounded-t-lg text-gray-500',
    activeTab: 'border-gray-300 border-b-white text-gray-900 bg-white',
  },
} as const

const tabsSizes = {
  small: 'px-3 py-2 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
} as const

// Computed
const variantListClass = computed(() => tabsVariants[props.variant].list)
const variantTabClass = computed(() => tabsVariants[props.variant].tab)
const variantActiveTabClass = computed(() => tabsVariants[props.variant].activeTab)
const sizeClass = computed(() => tabsSizes[props.size])

// Methods
const handleTabClick = (tab: TabItem) => {
  if (tab.disabled) return
  
  emit('update:modelValue', tab.id)
  emit('tab-click', tab)
}

const handleTabClose = (tab: TabItem) => {
  emit('tab-close', tab)
}

const handleKeyDown = (event: KeyboardEvent, _currentIndex: number) => {
  const enabledTabs = props.items.filter(tab => !tab.disabled)
  const currentEnabledIndex = enabledTabs.findIndex(tab => tab.id === props.modelValue)
  
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      if (currentEnabledIndex > 0) {
        const prevTab = enabledTabs[currentEnabledIndex - 1]
        handleTabClick(prevTab)
      }
      break
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      if (currentEnabledIndex < enabledTabs.length - 1) {
        const nextTab = enabledTabs[currentEnabledIndex + 1]
        handleTabClick(nextTab)
      }
      break
    case 'Home':
      event.preventDefault()
      if (enabledTabs.length > 0) {
        handleTabClick(enabledTabs[0])
      }
      break
    case 'End':
      event.preventDefault()
      if (enabledTabs.length > 0) {
        handleTabClick(enabledTabs[enabledTabs.length - 1])
      }
      break
  }
}
</script>
