import type { Meta, StoryObj } from '@storybook/vue3';
import { Switch } from '@upbox2-ui/vue';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    class: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
  },
};

export const Checked: Story = {
  args: {
    modelValue: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const AllSizes: Story = {
  render: () => ({
    components: { Switch },
    template: `
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <Switch size="small" />
          <span class="text-sm">Small</span>
        </div>
        <div class="flex items-center gap-2">
          <Switch size="medium" />
          <span class="text-sm">Medium</span>
        </div>
        <div class="flex items-center gap-2">
          <Switch size="large" />
          <span class="text-sm">Large</span>
        </div>
      </div>
    `,
  }),
};

export const WithLabels: Story = {
  render: () => ({
    components: { Switch },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <Switch id="notifications" />
          <label for="notifications" class="text-sm font-medium">
            Enable notifications
          </label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="marketing" :modelValue="true" />
          <label for="marketing" class="text-sm font-medium">
            Marketing emails
          </label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="analytics" :disabled="true" />
          <label for="analytics" class="text-sm font-medium text-gray-400">
            Analytics (unavailable)
          </label>
        </div>
      </div>
    `,
  }),
};
