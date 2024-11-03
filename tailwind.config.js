/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['char', 'sans-serif'],
        vidaloka: ['vidaloka', 'san-serif']
      },
        animation: {
          'slow-spin': 'spin 5s linear infinite' // Change 5s to desired speed
        }
      },
    },
    plugins: [],
  }

