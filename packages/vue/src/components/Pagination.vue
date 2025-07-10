<template>
  <div 
    v-if="!hideOnSinglePage || totalPages > 1"
    class="flex items-center justify-between"
  >
    <!-- Total Info -->
    <div v-if="showTotal" class="text-sm text-gray-700">
      Showing {{ startItem }} to {{ endItem }} of {{ total }} results
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <!-- Simple Pagination -->
      <template v-if="simple">
        <button
          type="button"
          class="flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="[
            current <= 1 ? variantDisabledButtonClass : variantButtonClass,
          ]"
          :disabled="disabled || current <= 1"
          @click="handlePageChange(current - 1)"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <span class="text-sm text-gray-700">
          {{ current }} / {{ totalPages }}
        </span>

        <button
          type="button"
          class="flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="[
            current >= totalPages ? variantDisabledButtonClass : variantButtonClass,
          ]"
          :disabled="disabled || current >= totalPages"
          @click="handlePageChange(current + 1)"
        >
          Next
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>

      <!-- Full Pagination -->
      <template v-else>
        <!-- Previous Button -->
        <button
          type="button"
          class="relative inline-flex items-center rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="[
            sizeClass,
            current <= 1 ? variantDisabledButtonClass : variantButtonClass,
          ]"
          :disabled="disabled || current <= 1"
          @click="handlePageChange(current - 1)"
          :aria-label="'Go to previous page'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Page Numbers -->
        <template v-for="page in visiblePages" :key="page">
          <button
            v-if="typeof page === 'number'"
            type="button"
            class="relative inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :class="[
              sizeClass,
              page === current ? variantActiveButtonClass : variantButtonClass,
            ]"
            :disabled="disabled"
            @click="handlePageChange(page)"
            :aria-label="`Go to page ${page}`"
            :aria-current="page === current ? 'page' : undefined"
          >
            {{ page }}
          </button>
          
          <span
            v-else
            class="relative inline-flex items-center border border-gray-300 bg-white text-gray-500"
            :class="sizeClass"
          >
            ...
          </span>
        </template>

        <!-- Next Button -->
        <button
          type="button"
          class="relative inline-flex items-center rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="[
            sizeClass,
            current >= totalPages ? variantDisabledButtonClass : variantButtonClass,
          ]"
          :disabled="disabled || current >= totalPages"
          @click="handlePageChange(current + 1)"
          :aria-label="'Go to next page'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>
    </div>

    <!-- Size Changer -->
    <div v-if="showSizeChanger" class="flex items-center space-x-2">
      <span class="text-sm text-gray-700">Show</span>
      <select
        :value="pageSize"
        @change="handlePageSizeChange"
        class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        :disabled="disabled"
      >
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <span class="text-sm text-gray-700">per page</span>
    </div>

    <!-- Quick Jumper -->
    <div v-if="showQuickJumper" class="flex items-center space-x-2">
      <span class="text-sm text-gray-700">Go to</span>
      <input
        type="number"
        :min="1"
        :max="totalPages"
        class="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        :disabled="disabled"
        @keypress.enter="handleQuickJump"
        @blur="handleQuickJump"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type PaginationVariant = 'default' | 'outline' | 'ghost'
export type Size = 'small' | 'medium' | 'large'

interface Props {
  current: number
  total: number
  pageSize?: number
  variant?: PaginationVariant
  size?: Size
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
  disabled?: boolean
  simple?: boolean
  hideOnSinglePage?: boolean
  pageSizeOptions?: number[]
}

interface Emits {
  'update:current': [page: number]
  'update:pageSize': [pageSize: number]
  'change': [page: number, pageSize: number]
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  variant: 'default',
  size: 'medium',
  showSizeChanger: false,
  showQuickJumper: false,
  showTotal: false,
  disabled: false,
  simple: false,
  hideOnSinglePage: false,
  pageSizeOptions: () => [10, 20, 50, 100],
})

const emit = defineEmits<Emits>()

// Constants
const paginationVariants = {
  default: {
    button: 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700',
    activeButton: 'border-blue-500 bg-blue-50 text-blue-600',
    disabledButton: 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed',
  },
  outline: {
    button: 'border border-gray-300 bg-transparent text-gray-700 hover:border-gray-400 hover:text-gray-900',
    activeButton: 'border-blue-500 bg-transparent text-blue-600',
    disabledButton: 'border-gray-300 bg-transparent text-gray-400 cursor-not-allowed',
  },
  ghost: {
    button: 'border-transparent bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
    activeButton: 'border-transparent bg-blue-50 text-blue-600',
    disabledButton: 'border-transparent bg-transparent text-gray-400 cursor-not-allowed',
  },
} as const

const paginationSizes = {
  small: 'px-2 py-1 text-xs',
  medium: 'px-3 py-2 text-sm',
  large: 'px-4 py-2 text-base',
} as const

// Computed
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const startItem = computed(() => (props.current - 1) * props.pageSize + 1)
const endItem = computed(() => Math.min(props.current * props.pageSize, props.total))

const sizeClass = computed(() => paginationSizes[props.size])
const variantButtonClass = computed(() => paginationVariants[props.variant].button)
const variantActiveButtonClass = computed(() => paginationVariants[props.variant].activeButton)
const variantDisabledButtonClass = computed(() => paginationVariants[props.variant].disabledButton)

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = props.current
  
  if (total <= 7) {
    // Show all pages if total is small
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)
    
    if (current > 4) {
      pages.push('...')
    }
    
    // Show pages around current
    const start = Math.max(2, current - 2)
    const end = Math.min(total - 1, current + 2)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 3) {
      pages.push('...')
    }
    
    // Show last page
    if (total > 1) {
      pages.push(total)
    }
  }
  
  return pages
})

// Methods
const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value || page === props.current) return
  
  emit('update:current', page)
  emit('change', page, props.pageSize)
}

const handlePageSizeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newPageSize = parseInt(target.value)
  
  emit('update:pageSize', newPageSize)
  emit('change', props.current, newPageSize)
}

const handleQuickJump = (event: Event) => {
  const target = event.target as HTMLInputElement
  const page = parseInt(target.value)
  
  if (page >= 1 && page <= totalPages.value) {
    handlePageChange(page)
  }
  
  target.value = ''
}
</script>
