/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Boosting contrast: Remapping slate shades to be lighter/brighter
      colors: {
        slate: {
          300: '#e2e8f0', // Now brighter (Standard Slate-200) for main text
          400: '#cbd5e1', // Now brighter (Standard Slate-300)
          500: '#94a3b8', // Now much more readable (Standard Slate-400) for muted text
          800: '#1e293b', // Borders stay subtle
          900: '#0f172a', // Backgrounds stay dark
          950: '#020617', // Main background stays pitch black
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'progress': 'progress 2.5s ease-out forwards',
        'scan': 'scan 3s linear infinite',
      }
    },
  },
  plugins: [],
}