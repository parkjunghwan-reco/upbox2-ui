import type { Meta, StoryObj } from '@storybook/vue3'
import { Tabs } from '@upbox2-ui/vue'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline', 'card'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    fullWidth: {
      control: 'boolean',
    },
    lazy: {
      control: 'boolean',
    },
    keepAlive: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const sampleTabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
]

export const Default: Story = {
  args: {
    items: sampleTabs,
    modelValue: 'tab1',
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args }
    },
    template: `
      <Tabs v-bind="args">
        <template #tab1>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 1 Content</h3>
            <p class="text-gray-600">This is the content for the first tab.</p>
          </div>
        </template>
        <template #tab2>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 2 Content</h3>
            <p class="text-gray-600">This is the content for the second tab.</p>
          </div>
        </template>
        <template #tab3>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 3 Content</h3>
            <p class="text-gray-600">This is the content for the third tab.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
}

export const Pills: Story = {
  args: {
    items: sampleTabs,
    modelValue: 'tab1',
    variant: 'pills',
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args }
    },
    template: `
      <Tabs v-bind="args">
        <template #tab1>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 1 Content</h3>
            <p class="text-gray-600">This is the content for the first tab.</p>
          </div>
        </template>
        <template #tab2>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 2 Content</h3>
            <p class="text-gray-600">This is the content for the second tab.</p>
          </div>
        </template>
        <template #tab3>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 3 Content</h3>
            <p class="text-gray-600">This is the content for the third tab.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
}

export const WithIcons: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', icon: 'HomeIcon' },
      { id: 'settings', label: 'Settings', icon: 'CogIcon' },
      { id: 'profile', label: 'Profile', icon: 'UserIcon' },
    ],
    modelValue: 'home',
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args }
    },
    template: `
      <Tabs v-bind="args">
        <template #home>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Home</h3>
            <p class="text-gray-600">Welcome to the home tab!</p>
          </div>
        </template>
        <template #settings>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Settings</h3>
            <p class="text-gray-600">Configure your preferences here.</p>
          </div>
        </template>
        <template #profile>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Profile</h3>
            <p class="text-gray-600">Manage your profile information.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
}

export const WithBadges: Story = {
  args: {
    items: [
      { id: 'inbox', label: 'Inbox', badge: 5 },
      { id: 'sent', label: 'Sent' },
      { id: 'drafts', label: 'Drafts', badge: 2 },
    ],
    modelValue: 'inbox',
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args }
    },
    template: `
      <Tabs v-bind="args">
        <template #inbox>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Inbox</h3>
            <p class="text-gray-600">You have 5 new messages.</p>
          </div>
        </template>
        <template #sent>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Sent</h3>
            <p class="text-gray-600">Your sent messages appear here.</p>
          </div>
        </template>
        <template #drafts>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Drafts</h3>
            <p class="text-gray-600">You have 2 draft messages.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
}

export const Vertical: Story = {
  args: {
    items: sampleTabs,
    modelValue: 'tab1',
    orientation: 'vertical',
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args }
    },
    template: `
      <div class="h-64">
        <Tabs v-bind="args">
          <template #tab1>
            <div class="p-4">
              <h3 class="text-lg font-semibold">Tab 1 Content</h3>
              <p class="text-gray-600">This is the content for the first tab.</p>
            </div>
          </template>
          <template #tab2>
            <div class="p-4">
              <h3 class="text-lg font-semibold">Tab 2 Content</h3>
              <p class="text-gray-600">This is the content for the second tab.</p>
            </div>
          </template>
          <template #tab3>
            <div class="p-4">
              <h3 class="text-lg font-semibold">Tab 3 Content</h3>
              <p class="text-gray-600">This is the content for the third tab.</p>
            </div>
          </template>
        </Tabs>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  args: {
    items: sampleTabs,
    modelValue: 'tab1',
    fullWidth: true,
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args }
    },
    template: `
      <Tabs v-bind="args">
        <template #tab1>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 1 Content</h3>
            <p class="text-gray-600">This is the content for the first tab.</p>
          </div>
        </template>
        <template #tab2>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 2 Content</h3>
            <p class="text-gray-600">This is the content for the second tab.</p>
          </div>
        </template>
        <template #tab3>
          <div class="p-4">
            <h3 class="text-lg font-semibold">Tab 3 Content</h3>
            <p class="text-gray-600">This is the content for the third tab.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
}
