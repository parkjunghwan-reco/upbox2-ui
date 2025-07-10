import type { Meta, StoryObj } from '@storybook/vue3'
import { Dropdown } from '@upbox2-ui/vue'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'focus'],
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    closeOnClick: {
      control: 'boolean',
    },
    offset: {
      control: 'number',
    },
    arrow: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

const sampleItems = [
  { id: '1', label: 'Profile', icon: 'UserIcon' },
  { id: '2', label: 'Settings', icon: 'CogIcon' },
  { id: '3', label: 'Help', icon: 'QuestionMarkCircleIcon' },
  { id: 'divider1', label: '', divider: true },
  { id: '4', label: 'Sign out', icon: 'LogoutIcon', danger: true },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const HoverTrigger: Story = {
  args: {
    items: sampleItems,
    trigger: 'hover',
  },
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: '1', label: 'Active Item' },
      { id: '2', label: 'Disabled Item', disabled: true },
      { id: '3', label: 'Another Active Item' },
    ],
  },
}

export const WithShortcuts: Story = {
  args: {
    items: [
      { id: '1', label: 'New File', shortcut: '⌘N' },
      { id: '2', label: 'Open File', shortcut: '⌘O' },
      { id: '3', label: 'Save File', shortcut: '⌘S' },
      { id: 'divider1', label: '', divider: true },
      { id: '4', label: 'Quit', shortcut: '⌘Q', danger: true },
    ],
  },
}

export const SmallSize: Story = {
  args: {
    items: sampleItems,
    size: 'small',
  },
}

export const LargeSize: Story = {
  args: {
    items: sampleItems,
    size: 'large',
  },
}

export const BottomEnd: Story = {
  args: {
    items: sampleItems,
    placement: 'bottom-end',
  },
}

export const TopStart: Story = {
  args: {
    items: sampleItems,
    placement: 'top-start',
  },
}

export const CustomTrigger: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      return { args }
    },
    template: `
      <Dropdown v-bind="args">
        <template #trigger>
          <button class="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Custom Trigger
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </template>
      </Dropdown>
    `,
  }),
}
