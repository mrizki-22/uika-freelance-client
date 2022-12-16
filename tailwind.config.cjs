/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "police-blue": "#344D67",
        aquamarine: "#6ECCAF",
        "granny-apple": "#ADE792",
        champagne: "#F3ECB0",
      },
    },
  },
  plugins: [],
};
