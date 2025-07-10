// vite.config.ts
import { defineConfig } from "file:///Users/parkjh/Documents/dev/upbox2-ui/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/parkjh/Documents/dev/upbox2-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/parkjh/Documents/dev/upbox2-ui/packages/tailwind";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "Upbox2UITailwind",
      fileName: "index",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["tailwindcss", "tailwindcss/plugin"],
      output: {
        globals: {
          tailwindcss: "tailwindcss",
          "tailwindcss/plugin": "tailwindcss/plugin"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGFya2poL0RvY3VtZW50cy9kZXYvdXBib3gyLXVpL3BhY2thZ2VzL3RhaWx3aW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcGFya2poL0RvY3VtZW50cy9kZXYvdXBib3gyLXVpL3BhY2thZ2VzL3RhaWx3aW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9wYXJramgvRG9jdW1lbnRzL2Rldi91cGJveDItdWkvcGFja2FnZXMvdGFpbHdpbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGR0cyh7XG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdVcGJveDJVSVRhaWx3aW5kJyxcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnXVxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsndGFpbHdpbmRjc3MnLCAndGFpbHdpbmRjc3MvcGx1Z2luJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHRhaWx3aW5kY3NzOiAndGFpbHdpbmRjc3MnLFxuICAgICAgICAgICd0YWlsd2luZGNzcy9wbHVnaW4nOiAndGFpbHdpbmRjc3MvcGx1Z2luJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VixTQUFTLG9CQUFvQjtBQUNwWCxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBRnhCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLE1BQ2xCLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxJQUN2QjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLGVBQWUsb0JBQW9CO0FBQUEsTUFDOUMsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2Isc0JBQXNCO0FBQUEsUUFDeEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
