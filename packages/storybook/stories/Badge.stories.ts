import type { Meta, StoryObj } from '@storybook/vue3';
import { Badge } from '@upbox2-ui/vue';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'],
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
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
};

export const Primary: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Primary</Badge>',
  }),
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Secondary</Badge>',
  }),
  args: {
    variant: 'secondary',
  },
};

export const Success: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Success</Badge>',
  }),
  args: {
    variant: 'success',
  },
};

export const Warning: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Warning</Badge>',
  }),
  args: {
    variant: 'warning',
  },
};

export const Error: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Error</Badge>',
  }),
  args: {
    variant: 'error',
  },
};

export const Small: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Small</Badge>',
  }),
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Medium</Badge>',
  }),
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Large</Badge>',
  }),
  args: {
    size: 'large',
  },
};

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex items-center gap-2">
        <Badge size="small">Small</Badge>
        <Badge size="medium">Medium</Badge>
        <Badge size="large">Large</Badge>
      </div>
    `,
  }),
};
