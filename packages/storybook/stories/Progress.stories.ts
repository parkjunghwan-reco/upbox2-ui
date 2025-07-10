import type { Meta, StoryObj } from '@storybook/vue3'
import { Progress } from '@upbox2-ui/vue'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: {
      control: 'number',
      min: 0,
      max: 100,
    },
    max: {
      control: 'number',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    showValue: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    indeterminate: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    value: 60,
    label: 'Progress',
  },
}

export const Success: Story = {
  args: {
    value: 80,
    variant: 'success',
    label: 'Success Progress',
    showValue: true,
  },
}

export const Warning: Story = {
  args: {
    value: 40,
    variant: 'warning',
    label: 'Warning Progress',
    showValue: true,
  },
}

export const Error: Story = {
  args: {
    value: 20,
    variant: 'error',
    label: 'Error Progress',
    showValue: true,
  },
}

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
    label: 'Download Progress',
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading...',
  },
}

export const Striped: Story = {
  args: {
    value: 65,
    striped: true,
    label: 'Striped Progress',
  },
}

export const StripedAnimated: Story = {
  args: {
    value: 65,
    striped: true,
    animated: true,
    label: 'Animated Striped Progress',
  },
}

export const Small: Story = {
  args: {
    value: 50,
    size: 'small',
    label: 'Small Progress',
  },
}

export const Large: Story = {
  args: {
    value: 50,
    size: 'large',
    label: 'Large Progress',
    showValue: true,
  },
}

export const NoLabel: Story = {
  args: {
    value: 30,
  },
}
