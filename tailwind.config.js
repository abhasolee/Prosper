/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ["Inter",  "regular"],
      },
      backgroundImage:{
        'hero-bg' : "url('/src/assets/home-bg.jpeg')"
      }
    },
  },
  plugins: [],
}