import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '@upbox2-ui/vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Primary: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary</Button>',
  }),
  args: {
    variant: 'primary',
  },
};

export const Outline: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Outline</Button>',
  }),
  args: {
    variant: 'outline',
  },
};

export const Secondary: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary</Button>',
  }),
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Ghost</Button>',
  }),
  args: {
    variant: 'ghost',
  },
};

export const Link: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Link</Button>',
  }),
  args: {
    variant: 'link',
  },
};

export const Small: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Small</Button>',
  }),
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Large</Button>',
  }),
  args: {
    size: 'large',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Disabled</Button>',
  }),
  args: {
    disabled: true,
  },
};
