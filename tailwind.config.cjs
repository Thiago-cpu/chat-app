/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      neutral: {
        DEFAULT: "#FAFAFB",
        50: "#FAFAFB",
        100: "#F2F2F2",
        200: "#E0E0E0",
        300: "#D3D3D3",
        400: "#BDBDBD",
        500: "#828282",
        600: "#4F4F4F",
        700: "#333333",
        800: "#252329",
      },
      red: {
        DEFAULT: "#F0402C",
        50: "#F0402C",
        300: "#EB5757",
        600: "#C73622",
      },
      blue: {
        DEFAULT: "#2F80ED",
        50: "#2F80ED",
        400: "#2D9CDB",
      },
      indigo: {
        DEFAULT: "#282051",
        800: "#282051",
      },
    },
    extend: {
      fontFamily: {
        NotoSans: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
