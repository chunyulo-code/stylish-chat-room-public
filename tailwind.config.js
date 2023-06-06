/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1280px",
      xl: "1440px"
    },
    extend: {
      colors: {
        "chatroom-light-gray": "#D9D9D9",
        "chatroom-gray": "#3F3A3A"
      }
    }
  },
  plugins: []
};
