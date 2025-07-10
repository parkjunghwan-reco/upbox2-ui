<template>
  <div 
    :class="classes.container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    ref="containerRef"
  >
    <!-- Trigger slot -->
    <slot />
    
    <!-- Tooltip content -->
    <teleport to="body">
      <div
        v-if="isVisible"
        :class="classes.content"
        :style="tooltipStyle"
        ref="tooltipRef"
        role="tooltip"
        :aria-describedby="tooltipId"
      >
        <slot name="content">
          {{ content }}
        </slot>
        
        <!-- Arrow -->
        <div
          v-if="arrow && classes.arrow"
          :class="classes.arrow"
        />
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, type CSSProperties } from 'vue'
import { generateTooltipClasses, type TooltipConfig, type TooltipPosition, type TooltipTrigger, type TooltipSize } from '@upbox2-ui/core'

interface Props {
  content?: string
  position?: TooltipPosition
  trigger?: TooltipTrigger
  size?: TooltipSize
  delay?: number
  disabled?: boolean
  arrow?: boolean
  dark?: boolean
  className?: string
  contentClassName?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  position: 'top',
  trigger: 'hover',
  size: 'md',
  delay: 0,
  disabled: false,
  arrow: true,
  dark: false,
  className: '',
  contentClassName: ''
})

const containerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const isVisible = ref(false)
const showTimeout = ref<number>()
const hideTimeout = ref<number>()
const tooltipId = ref(`tooltip-${Math.random().toString(36).substr(2, 9)}`)
const tooltipStyle = ref<CSSProperties>({})

const config = computed<TooltipConfig>(() => ({
  content: props.content,
  position: props.position,
  trigger: props.trigger,
  size: props.size,
  delay: props.delay,
  disabled: props.disabled,
  arrow: props.arrow,
  dark: props.dark,
  className: props.className,
  contentClassName: props.contentClassName
}))

const classes = computed(() => generateTooltipClasses(config.value))

const show = () => {
  if (props.disabled) return
  
  clearTimeout(hideTimeout.value)
  
  if (props.delay > 0) {
    showTimeout.value = window.setTimeout(() => {
      isVisible.value = true
      nextTick(() => {
        updatePosition()
      })
    }, props.delay)
  } else {
    isVisible.value = true
    nextTick(() => {
      updatePosition()
    })
  }
}

const hide = () => {
  clearTimeout(showTimeout.value)
  hideTimeout.value = window.setTimeout(() => {
    isVisible.value = false
  }, 100)
}

const updatePosition = () => {
  if (!containerRef.value || !tooltipRef.value) return
  
  const containerRect = containerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  
  let left = 0
  let top = 0
  
  switch (props.position) {
    case 'top':
      left = containerRect.left + (containerRect.width - tooltipRect.width) / 2
      top = containerRect.top - tooltipRect.height - 8
      break
    case 'bottom':
      left = containerRect.left + (containerRect.width - tooltipRect.width) / 2
      top = containerRect.bottom + 8
      break
    case 'left':
      left = containerRect.left - tooltipRect.width - 8
      top = containerRect.top + (containerRect.height - tooltipRect.height) / 2
      break
    case 'right':
      left = containerRect.right + 8
      top = containerRect.top + (containerRect.height - tooltipRect.height) / 2
      break
  }
  
  // Keep tooltip within viewport
  const padding = 8
  left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding))
  top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding))
  
  tooltipStyle.value = {
    position: 'fixed',
    left: `${left}px`,
    top: `${top}px`,
    zIndex: 9999
  }
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    show()
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    hide()
  }
}

const handleClick = () => {
  if (props.trigger === 'click') {
    if (isVisible.value) {
      hide()
    } else {
      show()
    }
  }
}

const handleFocus = () => {
  if (props.trigger === 'focus') {
    show()
  }
}

const handleBlur = () => {
  if (props.trigger === 'focus') {
    hide()
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    props.trigger === 'click' &&
    containerRef.value &&
    tooltipRef.value &&
    !containerRef.value.contains(event.target as Node) &&
    !tooltipRef.value.contains(event.target as Node)
  ) {
    hide()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition)
  clearTimeout(showTimeout.value)
  clearTimeout(hideTimeout.value)
})
</script>
