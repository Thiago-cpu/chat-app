/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: {
        default: "#000000",
        600: "#120f13",
        700: "#0B090C",
        A: "rgba(18, 15, 19, 0.5)",
      },
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
      gray: {
        100: "#3C393F",
        400: "#1c1b1e",
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
        600: "#065fa3",
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
      willChange: {
        "transform-opacity": "transform, opacity",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
