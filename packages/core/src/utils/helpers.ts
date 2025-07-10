// ID generation utilities
let idCounter = 0

export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${++idCounter}`
}

export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// String utilities
export function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Object utilities
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target }
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key]
      const targetValue = result[key]
      
      if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue) as T[Extract<keyof T, string>]
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>]
      }
    }
  }
  
  return result
}

// Type checking utilities
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value)
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

// Array utilities
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key])
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

// Color utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}
