import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF9D30',
          50: '#FFF5EB',
          100: '#FFEBD6',
          200: '#FFD7AD',
          300: '#FFC285',
          400: '#FFAE5C',
          500: '#FF9D30',
          600: '#E88300',
          700: '#B56600',
          800: '#824A00',
          900: '#4F2D00',
        },
        secondary: {
          DEFAULT: '#1882E8',
          50: '#E6F3FD',
          100: '#CCE7FB',
          200: '#99CFF7',
          300: '#66B7F3',
          400: '#339FEF',
          500: '#1882E8',
          600: '#1268BA',
          700: '#0D4E8B',
          800: '#09345D',
          900: '#041A2E',
        },
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        background: '#FFFFFF',
        foreground: '#1A1A1A',
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#737373',
        },
        border: '#E5E5E5',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'dropdown': '0 4px 20px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config
