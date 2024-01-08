/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}','node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {colors: {
      "w-background": "#fff",
      "grayscale-background": "#f7f7fc",
      dimgray: {
        "100": "#666",
        "200": "rgba(102, 102, 102, 0.25)",
      },
      blueviolet: "#5f2eea",
      "grayscale-label": "#6e7191",
      black: "#000",
      "grayscale-title-active": "#14142b",
      lightgray: "#ccc",
      "grayscale-line": "#d9dbe9",
    },
    spacing: {},
    fontFamily: {
      "mobile-text-small": "Poppins",
      "noto-sans": "'Noto Sans'",
    },
    borderRadius: {
      "21xl": "40px",
      "11xl": "30px",
    },
  },
  fontSize: {
    xl: "20px",
    "7xl": "26px",
    sm: "14px",
    xs: "12px",
    base: "16px",
    "5xl": "24px",
    "17xl": "36px",
    inherit: "inherit",
  },
  
  },
  plugins: [require('flowbite/plugin',"tw-elements/dist/plugin.cjs")],
}

