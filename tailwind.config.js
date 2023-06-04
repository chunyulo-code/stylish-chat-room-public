/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      lg: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      md: { max: "480px" },
      // => @media (max-width: 767px) { ... }
    },
  },
  plugins: [],
};
