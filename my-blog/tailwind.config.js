// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        'celadon': '#9bc995',
        'cambridge-blue': '#98B9AB',
        'true-blue': '#5171A5',
        'english-violet': '#3F3047',
        'icterine': '#EEF36A',
        'raisin-black': '#242124',
        'azure': '#007FFF',
        'cardinal': '#C51E3A',
        'emerald': '#06e574',
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
        'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
      gradientColorStops: {
        'delete-start': '#f56565', // Red
        'delete-end': '#c53030', // Dark Red
        
        'primary-start': '#667eea',
        'primary-end': '#764ba2',

        // Gradient for Save Button
        'save-start': '#48bb78', // Green
        'save-end': '#2f855a', // Dark Green

        // Gradient for Info Section
        'info-start': '#63b3ed', // Light Blue
        'info-end': '#4299e1', // Blue

        // Gradient for Warning Section
        'warning-start': '#f6e05e', // Yellow
        'warning-end': '#dd6b20', // Dark Orange
      },
      keyframes: {
        'light-up': {
          '0%': { opacity: 0.5 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.5 },
        },
      },
      animation: {
        'light-up': 'light-up 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}