<template>
  <div class="relative inline-block" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <!-- Trigger -->
    <div
      ref="triggerRef"
      @click="handleTriggerClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeyDown"
      :tabindex="disabled ? -1 : 0"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <slot name="trigger">
        <button
          type="button"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="disabled"
        >
          Menu
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </slot>
    </div>

    <!-- Dropdown Menu -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="menuRef"
        :style="menuStyle"
        class="absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        :class="[sizeClass, 'animate-in fade-in-0 zoom-in-95']"
        role="menu"
        :aria-orientation="'vertical'"
        :aria-labelledby="'menu-button'"
        @click="handleMenuClick"
        @keydown="handleMenuKeyDown"
      >
        <div class="py-1" role="none">
          <template v-for="(item, index) in items" :key="item.id">
            <!-- Divider -->
            <hr v-if="item.divider" class="my-1 border-gray-200" />
            
            <!-- Menu Item -->
            <button
              v-else
              type="button"
              class="group flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              :class="{
                'text-gray-400 cursor-not-allowed': item.disabled,
                'text-red-700 hover:bg-red-50 focus:bg-red-50': item.danger && !item.disabled,
                'text-gray-700': !item.danger && !item.disabled,
              }"
              :disabled="item.disabled"
              :data-item-id="item.id"
              :data-item-index="index"
              role="menuitem"
              @click="handleItemClick(item, $event)"
            >
              <!-- Icon -->
              <span v-if="item.icon" class="mr-3 w-5 h-5 flex items-center justify-center">
                <component :is="item.icon" class="w-4 h-4" />
              </span>
              
              <!-- Label -->
              <span class="flex-1">{{ item.label }}</span>
              
              <!-- Shortcut -->
              <span v-if="item.shortcut" class="ml-auto text-xs text-gray-400">
                {{ item.shortcut }}
              </span>
              
              <!-- Submenu Arrow -->
              <svg
                v-if="item.children && item.children.length > 0"
                class="w-4 h-4 ml-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </template>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

export type DropdownTrigger = 'click' | 'hover' | 'focus'
export type DropdownPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end'

export type Size = 'small' | 'medium' | 'large'

export interface DropdownItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  danger?: boolean
  shortcut?: string
  children?: DropdownItem[]
}

interface Props {
  items: DropdownItem[]
  trigger?: DropdownTrigger
  placement?: DropdownPlacement
  size?: Size
  disabled?: boolean
  closeOnClick?: boolean
  offset?: number
  arrow?: boolean
}

interface Emits {
  'item-click': [item: DropdownItem, event: Event]
  'open': []
  'close': []
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'click',
  placement: 'bottom-start',
  size: 'medium',
  disabled: false,
  closeOnClick: true,
  offset: 4,
  arrow: false,
})

const emit = defineEmits<Emits>()

// Refs
const triggerRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()
const isOpen = ref(false)
const menuStyle = ref({})

// Constants
const dropdownSizes = {
  small: 'min-w-32 text-sm',
  medium: 'min-w-40 text-base',
  large: 'min-w-48 text-lg',
} as const

// Computed
const sizeClass = computed(() => dropdownSizes[props.size])

// Methods
const open = () => {
  if (props.disabled) return
  
  isOpen.value = true
  emit('open')
  
  nextTick(() => {
    updateMenuPosition()
    if (menuRef.value) {
      menuRef.value.focus()
    }
  })
}

const close = () => {
  isOpen.value = false
  emit('close')
}

const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const updateMenuPosition = () => {
  if (!triggerRef.value || !menuRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const menuRect = menuRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  let top = 0
  let left = 0

  // Calculate position based on placement
  switch (props.placement) {
    case 'top':
      top = triggerRect.top - menuRect.height - props.offset
      left = triggerRect.left + (triggerRect.width - menuRect.width) / 2
      break
    case 'top-start':
      top = triggerRect.top - menuRect.height - props.offset
      left = triggerRect.left
      break
    case 'top-end':
      top = triggerRect.top - menuRect.height - props.offset
      left = triggerRect.right - menuRect.width
      break
    case 'bottom':
      top = triggerRect.bottom + props.offset
      left = triggerRect.left + (triggerRect.width - menuRect.width) / 2
      break
    case 'bottom-start':
      top = triggerRect.bottom + props.offset
      left = triggerRect.left
      break
    case 'bottom-end':
      top = triggerRect.bottom + props.offset
      left = triggerRect.right - menuRect.width
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - menuRect.height) / 2
      left = triggerRect.left - menuRect.width - props.offset
      break
    case 'left-start':
      top = triggerRect.top
      left = triggerRect.left - menuRect.width - props.offset
      break
    case 'left-end':
      top = triggerRect.bottom - menuRect.height
      left = triggerRect.left - menuRect.width - props.offset
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - menuRect.height) / 2
      left = triggerRect.right + props.offset
      break
    case 'right-start':
      top = triggerRect.top
      left = triggerRect.right + props.offset
      break
    case 'right-end':
      top = triggerRect.bottom - menuRect.height
      left = triggerRect.right + props.offset
      break
  }

  // Adjust for viewport boundaries
  if (top < 0) top = 8
  if (left < 0) left = 8
  if (top + menuRect.height > viewportHeight) top = viewportHeight - menuRect.height - 8
  if (left + menuRect.width > viewportWidth) left = viewportWidth - menuRect.width - 8

  menuStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: 50,
  }
}

// Event handlers
const handleTriggerClick = () => {
  if (props.trigger === 'click') {
    toggle()
  }
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    open()
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    close()
  }
}

const handleFocus = () => {
  if (props.trigger === 'focus') {
    open()
  }
}

const handleBlur = () => {
  if (props.trigger === 'focus') {
    close()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggle()
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        open()
      }
      break
    case 'Escape':
      close()
      break
  }
}

const handleMenuClick = (event: Event) => {
  event.stopPropagation()
}

const handleMenuKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      close()
      triggerRef.value?.focus()
      break
    case 'ArrowUp':
    case 'ArrowDown':
      event.preventDefault()
      // Focus navigation logic would go here
      break
  }
}

const handleItemClick = (item: DropdownItem, event: Event) => {
  if (item.disabled) return
  
  emit('item-click', item, event)
  
  if (props.closeOnClick) {
    close()
  }
}

const handleClickOutside = (event: Event) => {
  if (
    isOpen.value &&
    !triggerRef.value?.contains(event.target as Node) &&
    !menuRef.value?.contains(event.target as Node)
  ) {
    close()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateMenuPosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateMenuPosition)
})

// Watch for position updates
watch(isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      updateMenuPosition()
    })
  }
})
</script>

<style scoped>
@keyframes animate-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-in {
  animation: animate-in 0.1s ease-out;
}

.fade-in-0 {
  animation-name: fade-in-0;
}

.zoom-in-95 {
  animation-name: zoom-in-95;
}

@keyframes fade-in-0 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoom-in-95 {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
</style>
