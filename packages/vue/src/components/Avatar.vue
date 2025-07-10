<template>
  <div
    class="inline-flex items-center justify-center font-medium select-none overflow-hidden"
    :class="[sizeClass, variantClass, colorClass]"
    :style="customStyles"
  >
    <!-- Image -->
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt || 'Avatar'"
      class="w-full h-full object-cover"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    
    <!-- Fallback content -->
    <div v-else-if="showFallback" class="flex items-center justify-center w-full h-full">
      <!-- Initials -->
      <span v-if="displayInitials" class="font-semibold uppercase">
        {{ displayInitials }}
      </span>
      
      <!-- Fallback text -->
      <span v-else-if="fallback" class="text-center">
        {{ fallback }}
      </span>
      
      <!-- Default icon -->
      <svg
        v-else
        class="w-1/2 h-1/2 opacity-60"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export type AvatarVariant = 'circle' | 'square' | 'rounded'
export type Size = 'small' | 'medium' | 'large'

interface Props {
  src?: string
  alt?: string
  size?: Size
  variant?: AvatarVariant
  fallback?: string
  showFallback?: boolean
  initials?: string
  color?: string
  backgroundColor?: string
}

interface Emits {
  error: [event: Event]
  load: [event: Event]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  variant: 'circle',
  showFallback: true,
})

const emit = defineEmits<Emits>()

const imageError = ref(false)

// Constants
const avatarSizes = {
  small: 'w-8 h-8 text-xs',
  medium: 'w-10 h-10 text-sm',
  large: 'w-12 h-12 text-base',
} as const

const avatarVariants = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg',
} as const

const avatarColors = [
  'bg-red-500 text-white',
  'bg-blue-500 text-white',
  'bg-green-500 text-white',
  'bg-yellow-500 text-white',
  'bg-purple-500 text-white',
  'bg-pink-500 text-white',
  'bg-indigo-500 text-white',
  'bg-gray-500 text-white',
] as const

// Computed properties
const sizeClass = computed(() => avatarSizes[props.size])
const variantClass = computed(() => avatarVariants[props.variant])

const displayInitials = computed(() => {
  if (props.initials) {
    return props.initials.substring(0, 2)
  }
  
  if (props.alt) {
    const names = props.alt.split(' ')
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase()
    }
    return names[0][0].toUpperCase()
  }
  
  return null
})

const colorClass = computed(() => {
  if (props.color && props.backgroundColor) {
    return '' // Will use custom styles
  }
  
  if (!props.src || imageError.value) {
    // Generate color based on initials or fallback
    const text = props.initials || props.alt || props.fallback || 'A'
    const index = text.charCodeAt(0) % avatarColors.length
    return avatarColors[index]
  }
  
  return ''
})

const customStyles = computed(() => {
  if (props.color && props.backgroundColor) {
    return {
      color: props.color,
      backgroundColor: props.backgroundColor,
    }
  }
  
  return {}
})

// Methods
const handleImageError = (event: Event) => {
  imageError.value = true
  emit('error', event)
}

const handleImageLoad = (event: Event) => {
  imageError.value = false
  emit('load', event)
}
</script>
