/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "dodgroll-gold": "#f79f1a",
        "apple-green": "#046e1b",
        "dire-wold": "@292727",
      },
      fontFamily: {
        Montserrat: "Montserrat, sans-serif",
      },
      container: {
        center: true,
        padding: "2rem",
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
