/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neutra: ['"Neutra Text"', "sans-serif"],
      },
      colors: {
        black: "#322625",
        grey: "#ebebeb",
        blue: "#c0e3e5",
        yellow: "#fdc936",
      },
    },
  },
  plugins: [],
};
