/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['"Helvetica Neue"', 'sans-serif'],
      'francisco': ['"Sue Ellen Francisco"', 'cursive'],
      'titan': ['"Titan One"', 'sans-serif']

    }
  },
  plugins: [],
}

