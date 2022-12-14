/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        Outrun: ["Outrun"],
        Azonix: ["Azonix Regular"],
        Underground: ["Underground"],
      },
      colors: {
        cxgGrey: "#3d3d3d",
        cxgYellow: "#ffec4c",
        cxgYellow2: "#d9973a",
        cxgOrange: "#f17b2c",
        cxgRed: "#d80b31",
      },
      keyframes: {
        redLineAnim: {
          "0%": { "background-position": "100% 0%" },
          "100%": { "background-position": "-100% 0%" },
        },
      },
      animation: {
        redLineAnim: "redLineAnim 10s infinite linear",
      },
    },
  },
  plugins: [],
};
