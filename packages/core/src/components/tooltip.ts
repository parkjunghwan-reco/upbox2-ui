// Tooltip position variants
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

// Tooltip trigger variants
export type TooltipTrigger = 'hover' | 'click' | 'focus'

// Tooltip size variants
export type TooltipSize = 'sm' | 'md' | 'lg'

// Tooltip configuration
export interface TooltipConfig {
  position?: TooltipPosition
  trigger?: TooltipTrigger
  size?: TooltipSize
  content?: string
  delay?: number
  disabled?: boolean
  arrow?: boolean
  dark?: boolean
  className?: string
  contentClassName?: string
}

// Default tooltip configuration
export const defaultTooltipConfig: Required<TooltipConfig> = {
  position: 'top',
  trigger: 'hover',
  size: 'md',
  content: '',
  delay: 0,
  disabled: false,
  arrow: true,
  dark: false,
  className: '',
  contentClassName: ''
}

// Tooltip position classes
export const tooltipPositionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2'
}

// Tooltip arrow classes
export const tooltipArrowClasses: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
}

// Tooltip size classes
export const tooltipSizeClasses: Record<TooltipSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base'
}

// Base tooltip classes
export const tooltipBaseClasses = [
  'absolute',
  'z-50',
  'rounded-md',
  'shadow-lg',
  'border',
  'whitespace-nowrap',
  'pointer-events-none',
  'transition-opacity',
  'duration-200'
].join(' ')

// Tooltip theme classes
export const tooltipThemeClasses = {
  light: 'bg-white text-gray-900 border-gray-200',
  dark: 'bg-gray-900 text-white border-gray-700'
}

// Generate tooltip classes
export function generateTooltipClasses(config: TooltipConfig): {
  container: string
  content: string
  arrow: string
} {
  const mergedConfig = { ...defaultTooltipConfig, ...config }
  
  const containerClasses = [
    'relative',
    'inline-block',
    mergedConfig.className
  ].filter(Boolean).join(' ')

  const contentClasses = [
    tooltipBaseClasses,
    tooltipPositionClasses[mergedConfig.position],
    tooltipSizeClasses[mergedConfig.size],
    mergedConfig.dark ? tooltipThemeClasses.dark : tooltipThemeClasses.light,
    mergedConfig.contentClassName
  ].filter(Boolean).join(' ')

  const arrowClasses = mergedConfig.arrow ? [
    'absolute',
    'w-0',
    'h-0',
    'border-4',
    tooltipArrowClasses[mergedConfig.position],
    mergedConfig.dark ? 'border-gray-900' : 'border-white'
  ].filter(Boolean).join(' ') : ''

  return {
    container: containerClasses,
    content: contentClasses,
    arrow: arrowClasses
  }
}
