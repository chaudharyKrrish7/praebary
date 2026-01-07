/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': '#1B3022',
        'parchment': '#F5F5DC',
        'sienna': '#A0522D',
        'charcoal': '#333333',
      },
    },
  },
  plugins: [],
}