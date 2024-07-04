/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color1": "#09203F",
        "color2": "#537895"
      }
    },
  },
  plugins: [],
}