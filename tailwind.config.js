  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1a73e8',
          secondary: '#213547',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'scale(0.9)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
        },
        animation: {
          fadeIn: 'fadeIn 0.3s ease-out',
        },
      },
    },
    plugins: [],
  }
