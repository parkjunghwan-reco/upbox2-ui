import type { Meta, StoryObj } from '@storybook/vue3'
import { Accordion } from '@upbox2-ui/vue'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    collapsible: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

const sampleItems = [
  {
    id: 'item1',
    title: 'What is your refund policy?',
    content: 'We offer a 30-day money-back guarantee for all purchases. If you are not satisfied with your purchase, you can request a full refund within 30 days of your purchase date.',
  },
  {
    id: 'item2',
    title: 'How do I track my order?',
    content: 'You can track your order by logging into your account and visiting the "My Orders" section. You will also receive email notifications with tracking information.',
  },
  {
    id: 'item3',
    title: 'Do you offer international shipping?',
    content: 'Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by location. Please check our shipping page for more details.',
  },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const Multiple: Story = {
  args: {
    items: sampleItems,
    type: 'multiple',
  },
}

export const Bordered: Story = {
  args: {
    items: sampleItems,
    variant: 'bordered',
  },
}

export const Filled: Story = {
  args: {
    items: sampleItems,
    variant: 'filled',
  },
}

export const Ghost: Story = {
  args: {
    items: sampleItems,
    variant: 'ghost',
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'account',
        title: 'Account Settings',
        icon: 'UserIcon',
        content: 'Manage your account preferences and personal information.',
      },
      {
        id: 'security',
        title: 'Security',
        icon: 'ShieldCheckIcon',
        content: 'Update your password and security settings.',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        icon: 'BellIcon',
        content: 'Configure how you receive notifications.',
      },
    ],
  },
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        id: 'item1',
        title: 'Available Feature',
        content: 'This feature is available and can be accessed.',
      },
      {
        id: 'item2',
        title: 'Disabled Feature',
        content: 'This feature is currently disabled.',
        disabled: true,
      },
      {
        id: 'item3',
        title: 'Another Available Feature',
        content: 'This feature is also available.',
      },
    ],
  },
}

export const CustomContent: Story = {
  args: {
    items: [
      { id: 'form', title: 'Contact Form' },
      { id: 'chart', title: 'Analytics Chart' },
      { id: 'table', title: 'Data Table' },
    ],
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args }
    },
    template: `
      <Accordion v-bind="args">
        <template #form>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Submit
            </button>
          </div>
        </template>
        <template #chart>
          <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">Chart Component Would Go Here</p>
          </div>
        </template>
        <template #table>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">john@example.com</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </Accordion>
    `,
  }),
}
