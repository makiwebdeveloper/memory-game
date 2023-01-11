/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        blue: "#475386",
        gray: "#dfe4fa",
        orange: "#ffad42",
      },
    },
  },
  plugins: [],
};
