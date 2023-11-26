/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '_45': '-45deg',
      },
      colors: {
        'salmon': '#E7C192',
        'negro': '#1A0913', 
        'rojo-claro': '#F53E4C',
        'bordo': '#910019',
        'bordo-claro': '#FA174A',
        'blanco': '#F0F0F0',
        'transparent': 'rgba(0,0,0,0)',
        'half-transparent': 'rgba(0,0,0, 0.8)',
      },
      transitionProperty: {
        'width': 'width'
      }
    },
  },
  plugins: [],
}

