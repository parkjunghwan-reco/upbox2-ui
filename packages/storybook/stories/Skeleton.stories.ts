import type { Meta, StoryObj } from '@storybook/vue3'
import { Skeleton } from '@upbox2-ui/vue'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangle', 'circle', 'avatar', 'button'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    lines: {
      control: 'number',
      min: 1,
      max: 10,
    },
    loading: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    loading: true,
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    loading: true,
  },
}

export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 3,
    loading: true,
  },
}

export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
    loading: true,
  },
}

export const Circle: Story = {
  args: {
    variant: 'circle',
    loading: true,
  },
}

export const Avatar: Story = {
  args: {
    variant: 'avatar',
    loading: true,
  },
}

export const Button: Story = {
  args: {
    variant: 'button',
    loading: true,
  },
}

export const CustomSize: Story = {
  args: {
    variant: 'rectangle',
    width: '200px',
    height: '100px',
    loading: true,
  },
}

export const NotAnimated: Story = {
  args: {
    variant: 'text',
    animated: false,
    loading: true,
  },
}

export const WithContent: Story = {
  args: {
    loading: false,
  },
  render: (args) => ({
    components: { Skeleton },
    setup() {
      return { args }
    },
    template: `
      <Skeleton v-bind="args">
        <div class="p-4 bg-gray-100 rounded">
          <h3 class="text-lg font-semibold">Content Loaded</h3>
          <p class="text-gray-600">This content is shown when loading is false.</p>
        </div>
      </Skeleton>
    `,
  }),
}

export const CardSkeleton: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    components: { Skeleton },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <Skeleton variant="rectangle" height="200px" :loading="args.loading" />
        <div class="p-4">
          <Skeleton variant="text" :loading="args.loading" />
          <Skeleton variant="text" :loading="args.loading" class="mt-2" />
          <Skeleton variant="text" width="60%" :loading="args.loading" class="mt-2" />
        </div>
      </div>
    `,
  }),
}
