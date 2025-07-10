import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Upbox2UITailwind',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['tailwindcss', 'tailwindcss/plugin'],
      output: {
        globals: {
          tailwindcss: 'tailwindcss',
          'tailwindcss/plugin': 'tailwindcss/plugin'
        }
      }
    }
  }
})
