import type { Meta, StoryObj } from '@storybook/vue3'
import { Pagination } from '@upbox2-ui/vue'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    current: {
      control: 'number',
    },
    total: {
      control: 'number',
    },
    pageSize: {
      control: 'number',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    showSizeChanger: {
      control: 'boolean',
    },
    showQuickJumper: {
      control: 'boolean',
    },
    showTotal: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    simple: {
      control: 'boolean',
    },
    hideOnSinglePage: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    current: 1,
    total: 500,
    pageSize: 10,
  },
}

export const WithTotal: Story = {
  args: {
    current: 3,
    total: 500,
    pageSize: 10,
    showTotal: true,
  },
}

export const WithSizeChanger: Story = {
  args: {
    current: 1,
    total: 500,
    pageSize: 10,
    showSizeChanger: true,
  },
}

export const WithQuickJumper: Story = {
  args: {
    current: 1,
    total: 500,
    pageSize: 10,
    showQuickJumper: true,
  },
}

export const Complete: Story = {
  args: {
    current: 5,
    total: 500,
    pageSize: 10,
    showTotal: true,
    showSizeChanger: true,
    showQuickJumper: true,
  },
}

export const Simple: Story = {
  args: {
    current: 3,
    total: 500,
    pageSize: 10,
    simple: true,
  },
}

export const Outline: Story = {
  args: {
    current: 3,
    total: 500,
    pageSize: 10,
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    current: 3,
    total: 500,
    pageSize: 10,
    variant: 'ghost',
  },
}

export const Small: Story = {
  args: {
    current: 3,
    total: 500,
    pageSize: 10,
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    current: 3,
    total: 500,
    pageSize: 10,
    size: 'large',
  },
}

export const FewPages: Story = {
  args: {
    current: 2,
    total: 25,
    pageSize: 10,
  },
}

export const SinglePage: Story = {
  args: {
    current: 1,
    total: 5,
    pageSize: 10,
  },
}

export const HideOnSinglePage: Story = {
  args: {
    current: 1,
    total: 5,
    pageSize: 10,
    hideOnSinglePage: true,
  },
}

export const Disabled: Story = {
  args: {
    current: 3,
    total: 500,
    pageSize: 10,
    disabled: true,
  },
}
