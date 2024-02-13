/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      margin: {
        "120px": "120px",
      },
      border: {
        "heroSection-border": "1px solid #ffffff10",
      },
    },
  },
  plugins: [],
};
