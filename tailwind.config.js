/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      colors: {
        'picturist-charcoal': 'var(--picturist-charcoal)',
        'picturist-text-muted': 'var(--picturist-text-muted)',
        'picturist-soft-gray': 'var(--picturist-soft-gray)',
        'picturist-teal': 'var(--picturist-teal)',
        'picturist-light-teal': 'var(--picturist-light-teal)',
        'picturist-gold': 'var(--picturist-gold)',
        'picturist-warm-white': 'var(--picturist-warm-white)',
        'picturist-error': 'var(--picturist-error)',
        'picturist-error-bg': 'var(--picturist-error-bg)',
      },
      borderRadius: {
        'radius': 'var(--radius)',
      }
    },
  },
  plugins: [],
} 