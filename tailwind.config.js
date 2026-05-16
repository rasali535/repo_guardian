/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f62fe',
          dark: '#0043ce',
          light: '#4589ff',
        },
        secondary: {
          DEFAULT: '#8a3ffc',
          dark: '#6929c4',
          light: '#a56eff',
        },
        success: '#24a148',
        warning: '#f1c21b',
        error: '#da1e28',
        background: {
          dark: '#161616',
          light: '#f4f4f4',
        },
        surface: {
          dark: '#262626',
          light: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

// Made with Bob
