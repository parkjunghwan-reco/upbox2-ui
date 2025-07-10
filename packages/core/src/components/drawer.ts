// Drawer position variants
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'

// Drawer size variants
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// Drawer configuration
export interface DrawerConfig {
  position?: DrawerPosition
  size?: DrawerSize
  overlay?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
  overlayClassName?: string
  contentClassName?: string
}

// Default drawer configuration
export const defaultDrawerConfig: Required<DrawerConfig> = {
  position: 'right',
  size: 'md',
  overlay: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  className: '',
  overlayClassName: '',
  contentClassName: ''
}

// Drawer position classes
export const drawerPositionClasses: Record<DrawerPosition, string> = {
  left: 'left-0 top-0 h-full',
  right: 'right-0 top-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full'
}

// Drawer size classes
export const drawerSizeClasses: Record<DrawerPosition, Record<DrawerSize, string>> = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[28rem]',
    full: 'w-full'
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[28rem]',
    full: 'w-full'
  },
  top: {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
    xl: 'h-[28rem]',
    full: 'h-full'
  },
  bottom: {
    sm: 'h-64',
    md: 'h-80',
    lg: 'h-96',
    xl: 'h-[28rem]',
    full: 'h-full'
  }
}

// Drawer transform classes for animation
export const drawerTransformClasses: Record<DrawerPosition, {
  hidden: string
  visible: string
}> = {
  left: {
    hidden: '-translate-x-full',
    visible: 'translate-x-0'
  },
  right: {
    hidden: 'translate-x-full',
    visible: 'translate-x-0'
  },
  top: {
    hidden: '-translate-y-full',
    visible: 'translate-y-0'
  },
  bottom: {
    hidden: 'translate-y-full',
    visible: 'translate-y-0'
  }
}

// Base drawer classes
export const drawerBaseClasses = [
  'fixed',
  'bg-white',
  'text-gray-900',
  'shadow-lg',
  'border',
  'border-gray-200',
  'z-50',
  'transition-transform',
  'duration-300',
  'ease-in-out',
  'flex',
  'flex-col'
].join(' ')

// Overlay classes
export const drawerOverlayClasses = [
  'fixed',
  'inset-0',
  'bg-black',
  'bg-opacity-50',
  'z-40',
  'transition-opacity',
  'duration-300'
].join(' ')

// Generate drawer classes
export function generateDrawerClasses(config: DrawerConfig, isVisible: boolean): {
  overlay: string
  content: string
  closeButton: string
} {
  const mergedConfig = { ...defaultDrawerConfig, ...config }
  
  const overlayClasses = [
    drawerOverlayClasses,
    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
    mergedConfig.overlayClassName
  ].filter(Boolean).join(' ')

  const contentClasses = [
    drawerBaseClasses,
    drawerPositionClasses[mergedConfig.position],
    drawerSizeClasses[mergedConfig.position][mergedConfig.size],
    isVisible 
      ? drawerTransformClasses[mergedConfig.position].visible 
      : drawerTransformClasses[mergedConfig.position].hidden,
    mergedConfig.contentClassName
  ].filter(Boolean).join(' ')

  const closeButtonClasses = [
    'absolute',
    'top-4',
    'right-4',
    'p-2',
    'text-gray-500',
    'hover:text-gray-700',
    'hover:bg-gray-100',
    'rounded-md',
    'transition-colors',
    'duration-200'
  ].join(' ')

  return {
    overlay: overlayClasses,
    content: contentClasses,
    closeButton: closeButtonClasses
  }
}
