import preset from '@upbox2-ui/tailwind/preset'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../vue/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  presets: [preset],
}
