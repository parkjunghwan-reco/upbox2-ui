# Upbox2 UI

A modern Vue 3 + TypeScript + TailwindCSS design system library built with reka-ui foundation.

## 🌐 Live Demo

Visit our GitHub Pages deployment:
- **Main Page**: [https://your-username.github.io/upbox2-ui/](https://your-username.github.io/upbox2-ui/)
- **Storybook**: [https://your-username.github.io/upbox2-ui/storybook/](https://your-username.github.io/upbox2-ui/storybook/)
- **Example App**: [https://your-username.github.io/upbox2-ui/example/](https://your-username.github.io/upbox2-ui/example/)

## Features

- **Modern Stack**: Vue 3, TypeScript, TailwindCSS
- **Headless UI**: Built on reka-ui for accessibility and customization
- **Monorepo Structure**: Core logic, Vue components, and TailwindCSS preset
- **Type Safe**: Full TypeScript support with proper type definitions
- **Customizable**: CVA (Class Variance Authority) for styling variants
- **Utility-First**: TailwindCSS utility classes and custom design tokens
- **MCP Integration**: Built using Model Context Protocol for rapid development

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
    
    <Card variant="default" padding="medium">
      <h3>Card Title</h3>
      <p>Card content</p>
    </Card>
    
    <Badge variant="primary" size="medium">New</Badge>
    
    <Switch v-model="switchValue" size="medium" />
    
    <Checkbox v-model="checkboxValue" size="medium" />
    
    <Textarea 
      v-model="textareaValue" 
      placeholder="Enter your message..."
      :rows="3"
    />
    
    <Alert 
      variant="success" 
      title="Success!" 
      description="Your action was completed successfully."
    />
    
    <Select 
      v-model="selectedValue" 
      :options="selectOptions" 
      placeholder="Choose an option..."
    />
    
    <Radio 
      v-model="radioValue" 
      :options="radioOptions" 
      name="radio-group"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Button, 
  Input, 
  Modal, 
  Card, 
  Badge, 
  Switch, 
  Checkbox, 
  Textarea, 
  Alert,
  Select,
  Radio
} from '@upbox2-ui/vue'
import type { SelectOption, RadioOption } from '@upbox2-ui/vue'

const inputValue = ref('')
const isModalOpen = ref(false)
const switchValue = ref(false)
const checkboxValue = ref(false)
const textareaValue = ref('')
const selectedValue = ref('')
const radioValue = ref('')

const selectOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

const radioOptions: RadioOption[] = [
  { value: 'radio1', label: 'Radio Option 1' },
  { value: 'radio2', label: 'Radio Option 2' },
  { value: 'radio3', label: 'Radio Option 3' },
]

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

### Card
- Variants: `default`, `outline`
- Padding: `none`, `small`, `medium`, `large`

### Badge
- Variants: `default`, `primary`, `secondary`, `success`, `warning`, `error`
- Sizes: `small`, `medium`, `large`

### Switch
- Sizes: `small`, `medium`, `large`
- v-model support
- Disabled state

### Checkbox
- Sizes: `small`, `medium`, `large`
- v-model support
- Indeterminate state
- Disabled state

### Textarea
- Sizes: `small`, `medium`, `large`
- Resize options: `none`, `both`, `horizontal`, `vertical`
- v-model support

### Alert
- Variants: `default`, `info`, `success`, `warning`, `error`
- Sizes: `small`, `medium`, `large`
- Optional title and description
- Closable option
- Custom content via slots

### Select
- Sizes: `small`, `medium`, `large`
- v-model support
- Option groups with disabled items
- Keyboard navigation (Arrow keys, Enter, Escape)
- Search functionality
- Custom option rendering

### Radio
- Sizes: `small`, `medium`, `large`
- v-model support
- Option groups with disabled items
- Keyboard navigation
- Grouped radio buttons with name attribute

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
