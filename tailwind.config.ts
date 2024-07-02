import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'toast-progress': {
          '100%': {
            right: '100%',
          },
        },
      },
      animation: {
        'toast-progress': 'toast-progress 5s linear forwards',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: false,
            },
            'code::after': {
              content: false,
            },
            'a[target="_blank"]::before': {
              content: '"🔗 "',
            },
          }
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
