// Slider size variants
export type SliderSize = 'sm' | 'md' | 'lg'

// Slider orientation variants
export type SliderOrientation = 'horizontal' | 'vertical'

// Slider configuration
export interface SliderConfig {
  min?: number
  max?: number
  step?: number
  value?: number | number[]
  orientation?: SliderOrientation
  size?: SliderSize
  disabled?: boolean
  showValue?: boolean
  showTicks?: boolean
  tickStep?: number
  range?: boolean
  className?: string
  trackClassName?: string
  thumbClassName?: string
  tickClassName?: string
}

// Default slider configuration
export const defaultSliderConfig: Required<SliderConfig> = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
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
}

// Slider size classes
export const sliderSizeClasses: Record<SliderSize, {
  track: string
  thumb: string
  value: string
}> = {
  sm: {
    track: 'h-1',
    thumb: 'w-3 h-3',
    value: 'text-xs'
  },
  md: {
    track: 'h-2',
    thumb: 'w-4 h-4',
    value: 'text-sm'
  },
  lg: {
    track: 'h-3',
    thumb: 'w-5 h-5',
    value: 'text-base'
  }
}

// Slider orientation classes
export const sliderOrientationClasses: Record<SliderOrientation, {
  container: string
  track: string
  thumb: string
}> = {
  horizontal: {
    container: 'w-full flex items-center',
    track: 'w-full relative',
    thumb: 'absolute top-1/2 -translate-y-1/2 -translate-x-1/2'
  },
  vertical: {
    container: 'h-full flex flex-col items-center',
    track: 'h-full relative',
    thumb: 'absolute left-1/2 -translate-x-1/2 -translate-y-1/2'
  }
}

// Base slider classes
export const sliderBaseClasses = {
  container: 'relative',
  track: 'bg-gray-200 rounded-full relative',
  fill: 'bg-blue-500 rounded-full absolute',
  thumb: 'bg-white border-2 border-blue-500 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  tick: 'absolute w-1 h-1 bg-gray-400 rounded-full',
  value: 'absolute whitespace-nowrap',
  disabled: 'opacity-50 cursor-not-allowed'
}

// Generate slider classes
export function generateSliderClasses(config: SliderConfig): {
  container: string
  track: string
  fill: string
  thumb: string
  tick: string
  value: string
} {
  const mergedConfig = { ...defaultSliderConfig, ...config }
  
  const orientationClasses = sliderOrientationClasses[mergedConfig.orientation]
  const sizeClasses = sliderSizeClasses[mergedConfig.size]
  
  const containerClasses = [
    sliderBaseClasses.container,
    orientationClasses.container,
    mergedConfig.disabled ? sliderBaseClasses.disabled : '',
    mergedConfig.className
  ].filter(Boolean).join(' ')

  const trackClasses = [
    sliderBaseClasses.track,
    orientationClasses.track,
    sizeClasses.track,
    mergedConfig.trackClassName
  ].filter(Boolean).join(' ')

  const fillClasses = [
    sliderBaseClasses.fill,
    mergedConfig.orientation === 'horizontal' ? sizeClasses.track : 'w-full'
  ].filter(Boolean).join(' ')

  const thumbClasses = [
    sliderBaseClasses.thumb,
    orientationClasses.thumb,
    sizeClasses.thumb,
    mergedConfig.disabled ? 'cursor-not-allowed hover:scale-100' : '',
    mergedConfig.thumbClassName
  ].filter(Boolean).join(' ')

  const tickClasses = [
    sliderBaseClasses.tick,
    mergedConfig.tickClassName
  ].filter(Boolean).join(' ')

  const valueClasses = [
    sliderBaseClasses.value,
    sizeClasses.value
  ].filter(Boolean).join(' ')

  return {
    container: containerClasses,
    track: trackClasses,
    fill: fillClasses,
    thumb: thumbClasses,
    tick: tickClasses,
    value: valueClasses
  }
}

// Slider utilities
export function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step
}

export function getPercentage(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100
}

export function getValueFromPercentage(percentage: number, min: number, max: number): number {
  return min + (percentage / 100) * (max - min)
}
