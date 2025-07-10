import type { Meta, StoryObj } from '@storybook/vue3';
import { Checkbox } from '@upbox2-ui/vue';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
    components: { Checkbox },
    template: `
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <Checkbox size="small" />
          <span class="text-sm text-gray-900">Small</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox size="medium" />
          <span class="text-sm text-gray-900">Medium</span>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox size="large" />
          <span class="text-sm text-gray-900">Large</span>
        </div>
      </div>
    `,
  }),
};

export const WithLabels: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <Checkbox id="terms" />
          <label for="terms" class="text-sm font-medium text-gray-900">
            I agree to the terms and conditions
          </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="newsletter" :modelValue="true" />
          <label for="newsletter" class="text-sm font-medium text-gray-900">
            Subscribe to newsletter
          </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="marketing" :disabled="true" />
          <label for="marketing" class="text-sm font-medium text-gray-400">
            Marketing emails (unavailable)
          </label>
        </div>
      </div>
    `,
  }),
};

export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div class="space-y-3">
        <div class="font-medium text-gray-900">Select your interests:</div>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Checkbox id="tech" />
            <label for="tech" class="text-sm text-gray-900">Technology</label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="design" :modelValue="true" />
            <label for="design" class="text-sm text-gray-900">Design</label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="business" />
            <label for="business" class="text-sm text-gray-900">Business</label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="science" :modelValue="true" />
            <label for="science" class="text-sm text-gray-900">Science</label>
          </div>
        </div>
      </div>
    `,
  }),
};
