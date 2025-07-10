import type { Meta, StoryObj } from '@storybook/vue3';
import { Card } from '@upbox2-ui/vue';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    class: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" class="w-80">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Card Title</h3>
          <p class="text-sm text-gray-600">
            This is a default card with some content. Cards are useful for grouping related information.
          </p>
        </div>
      </Card>
    `,
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" class="w-80">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Outline Card</h3>
          <p class="text-sm text-gray-600">
            This card has an outline variant with a visible border.
          </p>
        </div>
      </Card>
    `,
  }),
};

export const SmallPadding: Story = {
  args: {
    padding: 'small',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" class="w-80">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Small Padding</h3>
          <p class="text-sm text-gray-600">
            This card has small padding.
          </p>
        </div>
      </Card>
    `,
  }),
};

export const LargePadding: Story = {
  args: {
    padding: 'large',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" class="w-80">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Large Padding</h3>
          <p class="text-sm text-gray-600">
            This card has large padding for more spacious content.
          </p>
        </div>
      </Card>
    `,
  }),
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" class="w-80">
        <div class="p-4 space-y-2">
          <h3 class="text-lg font-semibold">No Padding</h3>
          <p class="text-sm text-gray-600">
            This card has no padding, so we manually add padding to the content.
          </p>
        </div>
      </Card>
    `,
  }),
};

export const WithActions: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" class="w-80">
        <div class="space-y-4">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Card with Actions</h3>
            <p class="text-sm text-gray-600">
              This card includes action buttons at the bottom.
            </p>
          </div>
          <div class="flex gap-2 pt-2">
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
              Primary
            </button>
            <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
              Secondary
            </button>
          </div>
        </div>
      </Card>
    `,
  }),
};
