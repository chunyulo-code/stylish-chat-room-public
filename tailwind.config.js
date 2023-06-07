/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "chatroom-light-gray": "#D9D9D9",
        "chatroom-gray": "#3F3A3A"
      }
    },
    screens: {
      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      lg: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      md: { max: "480px" },
      // => @media (max-width: 767px) { ... }
      "chun-lg": "1280px"
    }
  },
  plugins: []
};
