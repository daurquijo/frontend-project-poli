/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#4CAF50',
          dark: '#1a1a2e',
        }
      }
    },
  },
  plugins: [],
}
