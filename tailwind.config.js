/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#c19977",
        "primary-same": "#e6c5a9",
        "primary-100": "#fcf3ec"
      },
      borderColor: {
        "primary": "#c19977",
        "primary-100": "#fcf3ec",
        "primary-same": "#e6c5a9",
      },
      textColor: {
        "primary": "#c19977",
        "primary-100": "#fcf3ec",
        "primary-same": "#e6c5a9"
      },
      minHeight: {
        "custom-h-60px": "60px",
        "140px": "140px",
        "400px": "400px"
      }, screens: {
        "laptop-small": "1500px"
      }
    },
  },
  plugins: [],
};