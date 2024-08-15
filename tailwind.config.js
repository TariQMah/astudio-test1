/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neutra: ["NeutraText-Light"],
        "neutra-book-alt": ["NeutraText-BookAlt"],
        "neutra-tf-book": ["NeutraTextTF-Book"],
        "neutra-bold": ["NeutraText-Bold"],
        "neutra-bold-italic": ["NeutraText-BoldItalic"],
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
