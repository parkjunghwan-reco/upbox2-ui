<template>
  <div :class="classes.container">
    <!-- Value display -->
    <div 
      v-if="showValue && !range"
      :class="classes.value"
      :style="valueStyle"
    >
      {{ formatValue(currentValue as number) }}
    </div>
    
    <!-- Track -->
    <div 
      :class="classes.track"
      ref="trackRef"
      @mousedown="handleTrackMouseDown"
      @touchstart="handleTrackTouchStart"
    >
      <!-- Fill -->
      <div 
        :class="classes.fill"
        :style="fillStyle"
      />
      
      <!-- Ticks -->
      <div 
        v-if="showTicks"
        v-for="tick in ticks"
        :key="tick.value"
        :class="classes.tick"
        :style="tick.style"
      />
      
      <!-- Single thumb -->
      <div 
        v-if="!range"
        :class="classes.thumb"
        :style="thumbStyle"
        @mousedown="handleThumbMouseDown"
        @touchstart="handleThumbTouchStart"
        @keydown="handleThumbKeyDown"
        tabindex="0"
        role="slider"
        :aria-valuenow="currentValue as number"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-disabled="disabled"
        :aria-orientation="orientation"
      />
      
      <!-- Range thumbs -->
      <template v-else>
        <div 
          :class="classes.thumb"
          :style="startThumbStyle"
          @mousedown="(e) => handleThumbMouseDown(e, 0)"
          @touchstart="(e) => handleThumbTouchStart(e, 0)"
          @keydown="(e) => handleThumbKeyDown(e, 0)"
          tabindex="0"
          role="slider"
          :aria-valuenow="(currentValue as number[])[0]"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-disabled="disabled"
          :aria-orientation="orientation"
        />
        <div 
          :class="classes.thumb"
          :style="endThumbStyle"
          @mousedown="(e) => handleThumbMouseDown(e, 1)"
          @touchstart="(e) => handleThumbTouchStart(e, 1)"
          @keydown="(e) => handleThumbKeyDown(e, 1)"
          tabindex="0"
          role="slider"
          :aria-valuenow="(currentValue as number[])[1]"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-disabled="disabled"
          :aria-orientation="orientation"
        />
      </template>
    </div>
    
    <!-- Range values -->
    <div v-if="showValue && range" class="flex justify-between mt-2">
      <span :class="classes.value">{{ formatValue((currentValue as number[])[0]) }}</span>
      <span :class="classes.value">{{ formatValue((currentValue as number[])[1]) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { 
  generateSliderClasses, 
  roundToStep, 
  getPercentage, 
  getValueFromPercentage,
  clamp,
  type SliderConfig, 
  type SliderSize, 
  type SliderOrientation 
} from '@upbox2-ui/core'

interface Props {
  modelValue?: number | number[]
  min?: number
  max?: number
  step?: number
  orientation?: SliderOrientation
  size?: SliderSize
  disabled?: boolean
  showValue?: boolean
  showTicks?: boolean
  tickStep?: number
  range?: boolean
  formatter?: (value: number) => string
  className?: string
  trackClassName?: string
  thumbClassName?: string
  tickClassName?: string
}

interface Emits {
  (event: 'update:modelValue', value: number | number[]): void
  (event: 'change', value: number | number[]): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal',
  size: 'md',
  disabled: false,
  showValue: false,
  showTicks: false,
  tickStep: 10,
  range: false,
  className: '',
  trackClassName: '',
  thumbClassName: '',
  tickClassName: ''
})

const emit = defineEmits<Emits>()

const trackRef = ref<HTMLElement>()
const isDragging = ref(false)
const activeThumb = ref<number | null>(null)

const config = computed<SliderConfig>(() => ({
  min: props.min,
  max: props.max,
  step: props.step,
  value: props.modelValue,
  orientation: props.orientation,
  size: props.size,
  disabled: props.disabled,
  showValue: props.showValue,
  showTicks: props.showTicks,
  tickStep: props.tickStep,
  range: props.range,
  className: props.className,
  trackClassName: props.trackClassName,
  thumbClassName: props.thumbClassName,
  tickClassName: props.tickClassName
}))

const classes = computed(() => generateSliderClasses(config.value))

const currentValue = computed(() => {
  if (props.range) {
    return Array.isArray(props.modelValue) ? props.modelValue : [props.min, props.max]
  }
  return typeof props.modelValue === 'number' ? props.modelValue : props.min
})

const fillStyle = computed((): CSSProperties => {
  if (props.range) {
    const values = currentValue.value as number[]
    const startPercent = getPercentage(values[0], props.min, props.max)
    const endPercent = getPercentage(values[1], props.min, props.max)
    
    if (props.orientation === 'horizontal') {
      return {
        left: `${startPercent}%`,
        width: `${endPercent - startPercent}%`,
        top: 0,
        height: '100%'
      }
    } else {
      return {
        bottom: `${startPercent}%`,
        height: `${endPercent - startPercent}%`,
        left: 0,
        width: '100%'
      }
    }
  } else {
    const percent = getPercentage(currentValue.value as number, props.min, props.max)
    
    if (props.orientation === 'horizontal') {
      return {
        left: 0,
        width: `${percent}%`,
        top: 0,
        height: '100%'
      }
    } else {
      return {
        bottom: 0,
        height: `${percent}%`,
        left: 0,
        width: '100%'
      }
    }
  }
})

const thumbStyle = computed((): CSSProperties => {
  if (props.range) return {}
  
  const percent = getPercentage(currentValue.value as number, props.min, props.max)
  
  if (props.orientation === 'horizontal') {
    return { left: `${percent}%` }
  } else {
    return { bottom: `${percent}%` }
  }
})

const startThumbStyle = computed((): CSSProperties => {
  if (!props.range) return {}
  
  const values = currentValue.value as number[]
  const percent = getPercentage(values[0], props.min, props.max)
  
  if (props.orientation === 'horizontal') {
    return { left: `${percent}%` }
  } else {
    return { bottom: `${percent}%` }
  }
})

const endThumbStyle = computed((): CSSProperties => {
  if (!props.range) return {}
  
  const values = currentValue.value as number[]
  const percent = getPercentage(values[1], props.min, props.max)
  
  if (props.orientation === 'horizontal') {
    return { left: `${percent}%` }
  } else {
    return { bottom: `${percent}%` }
  }
})

const valueStyle = computed((): CSSProperties => {
  if (props.range) return {}
  
  const percent = getPercentage(currentValue.value as number, props.min, props.max)
  
  if (props.orientation === 'horizontal') {
    return {
      left: `${percent}%`,
      transform: 'translateX(-50%)',
      bottom: '100%',
      marginBottom: '0.5rem'
    }
  } else {
    return {
      bottom: `${percent}%`,
      transform: 'translateY(50%)',
      left: '100%',
      marginLeft: '0.5rem'
    }
  }
})

const ticks = computed(() => {
  if (!props.showTicks) return []
  
  const ticks = []
  const tickCount = Math.floor((props.max - props.min) / props.tickStep) + 1
  
  for (let i = 0; i < tickCount; i++) {
    const value = props.min + i * props.tickStep
    if (value > props.max) break
    
    const percent = getPercentage(value, props.min, props.max)
    
    ticks.push({
      value,
      style: props.orientation === 'horizontal' 
        ? { left: `${percent}%`, top: '50%', transform: 'translate(-50%, -50%)' }
        : { bottom: `${percent}%`, left: '50%', transform: 'translate(-50%, 50%)' }
    })
  }
  
  return ticks
})

const formatValue = (value: number): string => {
  return props.formatter ? props.formatter(value) : value.toString()
}

const updateValue = (newValue: number | number[]) => {
  if (props.disabled) return
  
  let clampedValue: number | number[]
  
  if (props.range) {
    const values = Array.isArray(newValue) ? newValue : [props.min, props.max]
    clampedValue = [
      roundToStep(clamp(values[0], props.min, props.max), props.step),
      roundToStep(clamp(values[1], props.min, props.max), props.step)
    ]
    // Ensure start <= end
    if (clampedValue[0] > clampedValue[1]) {
      clampedValue = [clampedValue[1], clampedValue[0]]
    }
  } else {
    clampedValue = roundToStep(clamp(newValue as number, props.min, props.max), props.step)
  }
  
  emit('update:modelValue', clampedValue)
  emit('change', clampedValue)
}

const getValueFromMouseEvent = (event: MouseEvent | TouchEvent): number => {
  if (!trackRef.value) return props.min
  
  const rect = trackRef.value.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
  
  let percent: number
  
  if (props.orientation === 'horizontal') {
    percent = ((clientX - rect.left) / rect.width) * 100
  } else {
    percent = ((rect.bottom - clientY) / rect.height) * 100
  }
  
  return getValueFromPercentage(clamp(percent, 0, 100), props.min, props.max)
}

const handleTrackMouseDown = (event: MouseEvent) => {
  if (props.disabled) return
  
  const newValue = getValueFromMouseEvent(event)
  
  if (props.range) {
    const values = currentValue.value as number[]
    const startDistance = Math.abs(newValue - values[0])
    const endDistance = Math.abs(newValue - values[1])
    
    if (startDistance <= endDistance) {
      updateValue([newValue, values[1]])
      activeThumb.value = 0
    } else {
      updateValue([values[0], newValue])
      activeThumb.value = 1
    }
  } else {
    updateValue(newValue)
  }
  
  isDragging.value = true
  event.preventDefault()
}

const handleTrackTouchStart = (event: TouchEvent) => {
  handleTrackMouseDown(event as any)
}

const handleThumbMouseDown = (event: MouseEvent, thumbIndex?: number) => {
  if (props.disabled) return
  
  activeThumb.value = thumbIndex ?? null
  isDragging.value = true
  event.preventDefault()
  event.stopPropagation()
}

const handleThumbTouchStart = (event: TouchEvent, thumbIndex?: number) => {
  handleThumbMouseDown(event as any, thumbIndex)
}

const handleThumbKeyDown = (event: KeyboardEvent, thumbIndex?: number) => {
  if (props.disabled) return
  
  const increment = event.shiftKey ? props.step * 10 : props.step
  let newValue: number | number[]
  
  if (props.range) {
    const values = [...(currentValue.value as number[])]
    const index = thumbIndex ?? 0
    
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        values[index] += increment
        newValue = values
        break
      case 'ArrowDown':
      case 'ArrowLeft':
        values[index] -= increment
        newValue = values
        break
      case 'Home':
        values[index] = props.min
        newValue = values
        break
      case 'End':
        values[index] = props.max
        newValue = values
        break
      default:
        return
    }
  } else {
    const current = currentValue.value as number
    
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        newValue = current + increment
        break
      case 'ArrowDown':
      case 'ArrowLeft':
        newValue = current - increment
        break
      case 'Home':
        newValue = props.min
        break
      case 'End':
        newValue = props.max
        break
      default:
        return
    }
  }
  
  updateValue(newValue)
  event.preventDefault()
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || props.disabled) return
  
  const newValue = getValueFromMouseEvent(event)
  
  if (props.range) {
    const values = [...(currentValue.value as number[])]
    if (activeThumb.value !== null) {
      values[activeThumb.value] = newValue
      updateValue(values)
    }
  } else {
    updateValue(newValue)
  }
}

const handleTouchMove = (event: TouchEvent) => {
  handleMouseMove(event as any)
}

const handleMouseUp = () => {
  isDragging.value = false
  activeThumb.value = null
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('touchend', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('touchend', handleMouseUp)
})
</script>
