import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import '../src/styles/globals.css'

// Global setup for all stories
setup((app) => {
  // You can configure your app instance here
  // For example: app.use(router), app.use(store), etc.
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'dark',
          value: '#0f172a'
        },
        {
          name: 'gray',
          value: '#f8fafc'
        }
      ]
    },
    a11y: {
      config: {
        rules: [
          {
            // This rule is not compatible with Vue components
            id: 'autocomplete-valid',
            enabled: false,
          },
        ],
      },
    },
    viewport: {
      viewports: {
        small: {
          name: 'Small',
          styles: {
            width: '375px',
            height: '667px'
          }
        },
        medium: {
          name: 'Medium',
          styles: {
            width: '768px',
            height: '1024px'
          }
        },
        large: {
          name: 'Large',
          styles: {
            width: '1024px',
            height: '768px'
          }
        },
        xlarge: {
          name: 'Extra Large',
          styles: {
            width: '1440px',
            height: '900px'
          }
        }
      }
    }
  },
  argTypes: {
    // Global arg types for all components
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    variant: {
      control: { type: 'select' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  }
}

export default preview
