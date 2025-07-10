import type { StorybookConfig } from '@storybook/vue3-vite'
import { join, dirname } from 'path'
import vue from '@vitejs/plugin-vue'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.mdx'
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-viewport'),
    getAbsolutePath('@storybook/addon-backgrounds'),
    getAbsolutePath('@storybook/addon-a11y')
  ],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  typescript: {
    check: false
  },
  viteFinal: async (config) => {
    // Vite configuration customizations
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': join(__dirname, '../'),
        '@upbox2-ui/vue': join(__dirname, '../../vue/src'),
        '@upbox2-ui/core': join(__dirname, '../../core/src')
      }
    }
    
    // Add Vue plugin
    config.plugins = config.plugins || []
    config.plugins.push(vue())
    
    return config
  }
}

export default config
