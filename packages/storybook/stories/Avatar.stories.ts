import type { Meta, StoryObj } from '@storybook/vue3'
import { Avatar } from '@upbox2-ui/vue'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
    },
    fallback: {
      control: 'text',
    },
    showFallback: {
      control: 'boolean',
    },
    initials: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    alt: 'John Doe',
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    alt: 'John Doe',
  },
}

export const WithInitials: Story = {
  args: {
    initials: 'JD',
    alt: 'John Doe',
  },
}

export const WithFallback: Story = {
  args: {
    fallback: 'User',
  },
}

export const Square: Story = {
  args: {
    variant: 'square',
    alt: 'John Doe',
  },
}

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    alt: 'John Doe',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    alt: 'John Doe',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    alt: 'John Doe',
  },
}

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-image-url.com/image.jpg',
    alt: 'John Doe',
  },
}

export const CustomColors: Story = {
  args: {
    initials: 'AB',
    color: '#ffffff',
    backgroundColor: '#8b5cf6',
  },
}
