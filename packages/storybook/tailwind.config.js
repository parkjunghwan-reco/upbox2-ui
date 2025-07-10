/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './stories/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../vue/src/**/*.{vue,js,ts,jsx,tsx}',
    '../vue/dist/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
