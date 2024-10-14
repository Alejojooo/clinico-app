/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      primary: '#FAF9F3',
      secondary: '#D5DCE6',
      'secondary-light': '#EAEEF3',
      tertiary: '#BECEDD',
      neutral: '#647994',
      accent: '#193152',
      error: '#941b1b',
      disabled: '#e9ecef',
      'disabled-accent': '#6c757d'
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
}
