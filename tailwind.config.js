/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FFAE02',
          secondary: '#1863DC',
          accent: '#4281D9',
          bg: '#F5F5F5',
          text: '#181818',
          link: '#BB122A',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        heading: ['Ubuntu', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
