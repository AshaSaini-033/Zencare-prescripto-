/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",   // react / nextjs
    "./public/index.html"           // simple html
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",   // custom blue
        secondary: "#9333ea"  // custom purple
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
