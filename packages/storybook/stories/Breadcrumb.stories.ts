import type { Meta, StoryObj } from '@storybook/vue3'
import { Breadcrumb } from '@upbox2-ui/vue'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    separator: {
      control: 'select',
      options: ['/', '>', '→', '»'],
    },
    maxItems: {
      control: 'number',
    },
    showHome: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

const sampleItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'electronics', label: 'Electronics', href: '/products/electronics' },
  { id: 'laptops', label: 'Laptops', href: '/products/electronics/laptops' },
  { id: 'gaming', label: 'Gaming Laptops', current: true },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const WithHome: Story = {
  args: {
    items: sampleItems.slice(1), // Remove home from items since we're showing it separately
    showHome: true,
    homeHref: '/',
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'HomeIcon' },
      { id: 'users', label: 'Users', href: '/users', icon: 'UsersIcon' },
      { id: 'user-profile', label: 'User Profile', current: true, icon: 'UserIcon' },
    ],
  },
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'admin', label: 'Admin', disabled: true },
      { id: 'settings', label: 'Settings', current: true },
    ],
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'docs', label: 'Documentation', href: '/docs' },
      { id: 'guides', label: 'Guides', href: '/docs/guides' },
      { id: 'components', label: 'Components', href: '/docs/guides/components' },
      { id: 'forms', label: 'Forms', href: '/docs/guides/components/forms' },
      { id: 'inputs', label: 'Inputs', href: '/docs/guides/components/forms/inputs' },
      { id: 'text-input', label: 'Text Input', current: true },
    ],
  },
}

export const CollapsedPath: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'docs', label: 'Documentation', href: '/docs' },
      { id: 'guides', label: 'Guides', href: '/docs/guides' },
      { id: 'components', label: 'Components', href: '/docs/guides/components' },
      { id: 'forms', label: 'Forms', href: '/docs/guides/components/forms' },
      { id: 'inputs', label: 'Inputs', href: '/docs/guides/components/forms/inputs' },
      { id: 'text-input', label: 'Text Input', current: true },
    ],
    maxItems: 3,
  },
}

export const CustomSeparator: Story = {
  args: {
    items: sampleItems,
    separator: '→',
  },
}

export const SmallSize: Story = {
  args: {
    items: sampleItems,
    size: 'small',
  },
}

export const LargeSize: Story = {
  args: {
    items: sampleItems,
    size: 'large',
  },
}
