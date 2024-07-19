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
      },
    },
  },
  plugins: [],
}