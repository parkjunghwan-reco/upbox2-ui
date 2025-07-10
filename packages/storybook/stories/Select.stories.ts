import type { Meta, StoryObj } from '@storybook/vue3';
import { Select } from '@upbox2-ui/vue';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
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

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'kiwi', label: 'Kiwi' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select a fruit...',
  },
};

export const WithValue: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'apple',
    placeholder: 'Select a fruit...',
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
    placeholder: 'Select a fruit...',
  },
};

export const Small: Story = {
  args: {
    options: defaultOptions,
    size: 'small',
    placeholder: 'Select a fruit...',
  },
};

export const Medium: Story = {
  args: {
    options: defaultOptions,
    size: 'medium',
    placeholder: 'Select a fruit...',
  },
};

export const Large: Story = {
  args: {
    options: defaultOptions,
    size: 'large',
    placeholder: 'Select a fruit...',
  },
};

export const WithManyOptions: Story = {
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
      { value: 'grape', label: 'Grape' },
      { value: 'kiwi', label: 'Kiwi' },
      { value: 'mango', label: 'Mango' },
      { value: 'pineapple', label: 'Pineapple' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'raspberry', label: 'Raspberry' },
      { value: 'peach', label: 'Peach' },
      { value: 'cherry', label: 'Cherry' },
    ],
    placeholder: 'Select from many options...',
  },
};

export const WithCustomWidth: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select a fruit...',
    class: 'w-64',
  },
};

export const InForm: Story = {
  render: () => ({
    components: { Select },
    setup() {
      return {
        fruitOptions: defaultOptions,
        countryOptions: [
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
          { value: 'jp', label: 'Japan' },
        ],
      };
    },
    template: `
      <div class="w-80 p-6 border rounded-lg space-y-4">
        <h3 class="text-lg font-semibold">User Preferences</h3>
        <div class="space-y-2">
          <label class="text-sm font-medium">Favorite Fruit</label>
          <Select 
            :options="fruitOptions" 
            placeholder="Select your favorite fruit..."
            class="w-full"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Country</label>
          <Select 
            :options="countryOptions"
            placeholder="Select your country..."
            class="w-full"
          />
        </div>
        <div class="flex gap-2 pt-4">
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
          <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    `,
  }),
};
