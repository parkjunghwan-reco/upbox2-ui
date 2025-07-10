import type { Meta, StoryObj } from '@storybook/vue3'
import { Toast } from '@upbox2-ui/vue'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
    duration: {
      control: 'number',
    },
    closable: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {
    title: 'Default Toast',
    description: 'This is a default toast notification.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please check your input and try again.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'Here is some helpful information for you.',
  },
}

export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'New Update Available',
    description: 'A new version of the app is available.',
    action: {
      label: 'Update Now',
      onClick: () => alert('Update clicked!'),
    },
  },
}

export const LongDuration: Story = {
  args: {
    variant: 'success',
    title: 'Long Duration Toast',
    description: 'This toast will stay visible for 10 seconds.',
    duration: 10000,
  },
}

export const NotClosable: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    description: 'This toast cannot be closed by the user.',
    closable: false,
    duration: 0, // Never auto-close
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'success',
    title: 'Small Toast',
    description: 'This is a small toast.',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'info',
    title: 'Large Toast',
    description: 'This is a large toast with more content and information.',
  },
}

export const BottomCenter: Story = {
  args: {
    position: 'bottom-center',
    variant: 'success',
    title: 'Bottom Center Toast',
    description: 'This toast appears at the bottom center of the screen.',
  },
}

export const TopLeft: Story = {
  args: {
    position: 'top-left',
    variant: 'error',
    title: 'Top Left Toast',
    description: 'This toast appears at the top left of the screen.',
  },
}
