/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        black: "#020202",
        gray: "#f2f2f2",
        "gray-dark": "#616161",
        white: "#fefefe",
        yellow: "#f5ec47",
        red: "#f6685d",
      },
      fontFamily: {
        sans: ["alice", "sans-serif"],
        display: ["playfair display", "serif"],
      },
    },
  },
  plugins: [],
};
