# Upbox2 UI

A modern Vue 3 + TypeScript + TailwindCSS design system library built with reka-ui foundation.

## Features

- **Modern Stack**: Vue 3, TypeScript, TailwindCSS
- **Headless UI**: Built on reka-ui for accessibility and customization
- **Monorepo Structure**: Core logic, Vue components, and TailwindCSS preset
- **Type Safe**: Full TypeScript support with proper type definitions
- **Customizable**: CVA (Class Variance Authority) for styling variants
- **Utility-First**: TailwindCSS utility classes and custom design tokens

## Packages

### @upbox2-ui/core
Headless component logic, utilities, and type definitions.

### @upbox2-ui/vue
Vue 3 components with full TypeScript support.

### @upbox2-ui/tailwind
TailwindCSS preset with design tokens and utility classes.

## Installation

```bash
npm install @upbox2-ui/vue @upbox2-ui/tailwind
```

## Usage

### Vue Components

```vue
<template>
  <div>
    <Button variant="primary" size="medium" @click="handleClick">
      Click me
    </Button>
    
    <Input 
      v-model="inputValue" 
      placeholder="Enter text..."
      size="medium"
    />
    
    <Modal v-model:open="isModalOpen">
      <h2>Modal Title</h2>
      <p>Modal content goes here</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Modal } from '@upbox2-ui/vue'

const inputValue = ref('')
const isModalOpen = ref(false)

const handleClick = () => {
  isModalOpen.value = true
}
</script>
```

### TailwindCSS Configuration

```js
// tailwind.config.js
import { preset } from '@upbox2-ui/tailwind'

export default {
  presets: [preset],
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@upbox2-ui/vue/dist/**/*.{js,ts,vue}'
  ],
  // ... your config
}
```

## Components

### Button
- Variants: `default`, `primary`, `secondary`, `outline`, `ghost`, `link`
- Sizes: `small`, `medium`, `large`
- Radius: `small`, `medium`, `large`

### Input
- Types: `text`, `email`, `password`, `number`, `tel`, `url`, `search`
- Sizes: `small`, `medium`, `large`
- Error states and validation

### Modal
- Backdrop control
- Keyboard navigation (ESC to close)
- Focus management
- Scroll locking

## Type System

The library includes comprehensive TypeScript definitions:

```typescript
import type { ButtonVariant, Size, Radius } from '@upbox2-ui/core'

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
type Size = 'small' | 'medium' | 'large'
type Radius = 'small' | 'medium' | 'large'
```

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Development mode
npm run dev

# Type checking
npm run type-check
```

## Design System

The library follows modern design system principles:

- **Consistent spacing** using 8px grid system
- **Semantic color system** with CSS custom properties
- **Responsive typography** scale
- **Accessibility-first** approach
- **Component composition** patterns

## License

MIT
