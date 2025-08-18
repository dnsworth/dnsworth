/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',    // Gold
        secondary: '#FF8C00',  // Orange
        accent: '#FFA500',     // Shining Orange
        background: '#000000', // Pure Black
        surface: '#111111',    // Slightly lighter black
        text: '#FFFFFF',       // Pure White
        'text-muted': '#CCCCCC', // Muted white
        'gold-light': '#FFED4E', // Light gold
        'orange-light': '#FFB84D', // Light orange
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}
