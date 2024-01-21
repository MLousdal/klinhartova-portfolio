const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

export default {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './slices/**/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      backgroundImage: {
        'noise': "url('/noise.svg')",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: colors.rose
      },
      fontFamily: {
        'sans': ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        'serif': ['"MuseoModerno"', ...defaultTheme.fontFamily.serif],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-headings': colors.rose[400],
            '--tw-prose-bold': colors.rose[400],
          },
        },
      },
    }
  },
  plugins: [require('@tailwindcss/typography'),]
}
