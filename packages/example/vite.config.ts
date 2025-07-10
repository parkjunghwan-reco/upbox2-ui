import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@upbox2-ui/core': resolve(__dirname, '../core/src'),
      '@upbox2-ui/vue': resolve(__dirname, '../vue/src'),
    },
  },
})
