import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Upbox2UIVue',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@upbox2-ui/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@upbox2-ui/core': 'Upbox2UICore'
        }
      }
    }
  }
})
