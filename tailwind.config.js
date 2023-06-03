/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "chatroom-light-gray": "#D9D9D9",
        "chatroom-gray": "#3F3A3A"
      }
    }
  },
  plugins: []
};
