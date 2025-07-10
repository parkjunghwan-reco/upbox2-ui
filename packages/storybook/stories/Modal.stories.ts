import type { Meta, StoryObj } from '@storybook/vue3';
import { Modal } from '@upbox2-ui/vue';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    closeOnBackdrop: {
      control: 'boolean',
    },
    preventScroll: {
      control: 'boolean',
    },
    titleId: {
      control: 'text',
    },
    descriptionId: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    titleId: 'modal-title',
    descriptionId: 'modal-description',
  },
  render: (args) => ({
    components: { Modal },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 id="modal-title" class="text-lg font-semibold">Modal Title</h2>
            <button class="text-gray-400 hover:text-gray-600" @click="args.open = false">
              ✕
            </button>
          </div>
          <p id="modal-description" class="text-sm text-gray-600">
            This is a modal description that explains what this modal is about.
          </p>
          <div class="space-y-2">
            <p>Modal content goes here...</p>
            <div class="flex gap-2 pt-4">
              <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Confirm
              </button>
              <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" @click="args.open = false">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    `,
  }),
};

export const WithCustomContent: Story = {
  args: {
    open: true,
    titleId: 'custom-modal-title',
    descriptionId: 'custom-modal-description',
  },
  render: (args) => ({
    components: { Modal },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 id="custom-modal-title" class="text-lg font-semibold">Custom Modal</h2>
            <button class="text-gray-400 hover:text-gray-600" @click="args.open = false">
              ✕
            </button>
          </div>
          <p id="custom-modal-description" class="text-sm text-gray-600">
            This modal has custom content
          </p>
          <div class="space-y-4">
            <p>This is custom content with multiple elements.</p>
            <div class="flex gap-2">
              <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Action 1
              </button>
              <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Action 2
              </button>
            </div>
          </div>
        </div>
      </Modal>
    `,
  }),
};

export const Closed: Story = {
  args: {
    open: false,
    titleId: 'closed-modal-title',
    descriptionId: 'closed-modal-description',
  },
  render: (args) => ({
    components: { Modal },
    setup() {
      return { args };
    },
    template: `
      <div>
        <button @click="args.open = true" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Open Modal
        </button>
        <Modal v-bind="args">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 id="closed-modal-title" class="text-lg font-semibold">Closed Modal</h2>
              <button class="text-gray-400 hover:text-gray-600" @click="args.open = false">
                ✕
              </button>
            </div>
            <p id="closed-modal-description" class="text-sm text-gray-600">
              This modal was closed by default
            </p>
            <p>You can now see this content!</p>
          </div>
        </Modal>
      </div>
    `,
  }),
};
