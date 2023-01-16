/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lobster: ["Lobster", "cursive"],
      },
      colors: {
        "space-cadet": "#193254",
        "police-blue": "#344D67",
        aquamarine: "#6ECCAF",
        "granny-apple": "#ADE792",
        champagne: "#F3ECB0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true }), require("@tailwindcss/line-clamp")],
  variants: {
    scrollbar: ["rounded"],
  },
};
