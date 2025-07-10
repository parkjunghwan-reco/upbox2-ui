import type { Meta, StoryObj } from '@storybook/vue3'
import { Radio } from '@upbox2-ui/vue'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The selected value',
    },
    options: {
      control: 'object',
      description: 'Array of radio options',
    },
    name: {
      control: 'text',
      description: 'Radio group name',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Radio size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled',
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
    modelValue: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    name: 'default-radio',
    size: 'medium',
    disabled: false,
  },
}

export const Small: Story = {
  args: {
    modelValue: 'small1',
    options: [
      { value: 'small1', label: 'Small Option 1' },
      { value: 'small2', label: 'Small Option 2' },
      { value: 'small3', label: 'Small Option 3' },
    ],
    name: 'small-radio',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    modelValue: 'large1',
    options: [
      { value: 'large1', label: 'Large Option 1' },
      { value: 'large2', label: 'Large Option 2' },
      { value: 'large3', label: 'Large Option 3' },
    ],
    name: 'large-radio',
    size: 'large',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 'disabled1',
    options: [
      { value: 'disabled1', label: 'Disabled Option 1' },
      { value: 'disabled2', label: 'Disabled Option 2' },
      { value: 'disabled3', label: 'Disabled Option 3' },
    ],
    name: 'disabled-radio',
    size: 'medium',
    disabled: true,
  },
}

export const WithDisabledOptions: Story = {
  args: {
    modelValue: 'mixed1',
    options: [
      { value: 'mixed1', label: 'Available Option 1' },
      { value: 'mixed2', label: 'Disabled Option 2', disabled: true },
      { value: 'mixed3', label: 'Available Option 3' },
      { value: 'mixed4', label: 'Disabled Option 4', disabled: true },
    ],
    name: 'mixed-radio',
    size: 'medium',
  },
}

export const NoSelection: Story = {
  args: {
    modelValue: undefined,
    options: [
      { value: 'none1', label: 'Option 1' },
      { value: 'none2', label: 'Option 2' },
      { value: 'none3', label: 'Option 3' },
    ],
    name: 'no-selection-radio',
    size: 'medium',
  },
}
