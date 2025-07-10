import type { Meta, StoryObj } from '@storybook/vue3'
import { Tooltip } from '@upbox2-ui/vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component that displays additional information when hovering over an element.'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to display in the tooltip'
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The position of the tooltip relative to the trigger element'
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
      description: 'The trigger method for showing the tooltip'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the tooltip'
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the tooltip'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled'
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show an arrow pointing to the trigger element'
    },
    dark: {
      control: 'boolean',
      description: 'Whether to use dark theme'
    }
  }
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    trigger: 'hover',
    size: 'md',
    delay: 0,
    disabled: false,
    arrow: true,
    dark: false
  },
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Hover me
        </button>
      </Tooltip>
    `
  })
}

export const Positions: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="grid grid-cols-2 gap-8 p-8">
        <div class="flex flex-col items-center space-y-4">
          <Tooltip content="Top tooltip" position="top">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Top
            </button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Bottom
            </button>
          </Tooltip>
        </div>
        <div class="flex flex-col items-center space-y-4">
          <Tooltip content="Left tooltip" position="left">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Left
            </button>
          </Tooltip>
          <Tooltip content="Right tooltip" position="right">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Right
            </button>
          </Tooltip>
        </div>
      </div>
    `
  })
}

export const Triggers: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex space-x-4">
        <Tooltip content="Hover to show" trigger="hover">
          <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Hover
          </button>
        </Tooltip>
        <Tooltip content="Click to toggle" trigger="click">
          <button class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Click
          </button>
        </Tooltip>
        <Tooltip content="Focus to show" trigger="focus">
          <button class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Focus
          </button>
        </Tooltip>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex space-x-4">
        <Tooltip content="Small tooltip" size="sm">
          <button class="px-3 py-1 bg-gray-500 text-white rounded text-sm">
            Small
          </button>
        </Tooltip>
        <Tooltip content="Medium tooltip" size="md">
          <button class="px-4 py-2 bg-gray-500 text-white rounded">
            Medium
          </button>
        </Tooltip>
        <Tooltip content="Large tooltip with more content" size="lg">
          <button class="px-5 py-3 bg-gray-500 text-white rounded text-lg">
            Large
          </button>
        </Tooltip>
      </div>
    `
  })
}

export const DarkTheme: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex space-x-4">
        <Tooltip content="Light tooltip" :dark="false">
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Light
          </button>
        </Tooltip>
        <Tooltip content="Dark tooltip" :dark="true">
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Dark
          </button>
        </Tooltip>
      </div>
    `
  })
}

export const WithDelay: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex space-x-4">
        <Tooltip content="No delay" :delay="0">
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            No delay
          </button>
        </Tooltip>
        <Tooltip content="500ms delay" :delay="500">
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            500ms delay
          </button>
        </Tooltip>
        <Tooltip content="1000ms delay" :delay="1000">
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            1000ms delay
          </button>
        </Tooltip>
      </div>
    `
  })
}

export const CustomContent: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <Tooltip>
        <template #content>
          <div class="p-2">
            <h4 class="font-bold mb-1">Custom Content</h4>
            <p class="text-sm">This tooltip has custom HTML content with <strong>bold text</strong> and formatting.</p>
          </div>
        </template>
        <button class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
          Custom Content
        </button>
      </Tooltip>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex space-x-4">
        <Tooltip content="This tooltip is enabled" :disabled="false">
          <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Enabled
          </button>
        </Tooltip>
        <Tooltip content="This tooltip is disabled" :disabled="true">
          <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Disabled
          </button>
        </Tooltip>
      </div>
    `
  })
}
