import type { Meta, StoryObj } from '@storybook/vue3'
import { Textarea } from '@upbox2-ui/vue'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The textarea value',
    },
    rows: {
      control: 'number',
      description: 'Number of rows',
    },
    cols: {
      control: 'number',
      description: 'Number of columns',
    },
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: 'Resize behavior',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Textarea size',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description: 'Event emitted when value changes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: 'This is a default textarea content.',
    rows: 3,
    resize: 'vertical',
    size: 'medium',
    placeholder: 'Enter your text here...',
    disabled: false,
  },
}

export const Small: Story = {
  args: {
    modelValue: 'Small textarea content.',
    rows: 2,
    resize: 'vertical',
    size: 'small',
    placeholder: 'Small textarea placeholder...',
  },
}

export const Large: Story = {
  args: {
    modelValue: 'Large textarea content with more space.',
    rows: 5,
    resize: 'vertical',
    size: 'large',
    placeholder: 'Large textarea placeholder...',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 'This textarea is disabled.',
    rows: 3,
    resize: 'vertical',
    size: 'medium',
    placeholder: 'Disabled textarea...',
    disabled: true,
  },
}

export const NoResize: Story = {
  args: {
    modelValue: 'This textarea cannot be resized.',
    rows: 4,
    resize: 'none',
    size: 'medium',
    placeholder: 'Non-resizable textarea...',
  },
}

export const HorizontalResize: Story = {
  args: {
    modelValue: 'This textarea can be resized horizontally.',
    rows: 3,
    resize: 'horizontal',
    size: 'medium',
    placeholder: 'Horizontally resizable textarea...',
  },
}

export const BothResize: Story = {
  args: {
    modelValue: 'This textarea can be resized in both directions.',
    rows: 4,
    resize: 'both',
    size: 'medium',
    placeholder: 'Fully resizable textarea...',
  },
}

export const WithCols: Story = {
  args: {
    modelValue: 'This textarea has specific columns defined.',
    rows: 3,
    cols: 50,
    resize: 'vertical',
    size: 'medium',
    placeholder: 'Textarea with defined columns...',
  },
}

export const Empty: Story = {
  args: {
    modelValue: '',
    rows: 4,
    resize: 'vertical',
    size: 'medium',
    placeholder: 'Start typing your message here...',
  },
}
