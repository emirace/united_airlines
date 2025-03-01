/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5143d9",
      },
      fontFamily: {
        dmsans: ["DM Sans", "serif"],
      },
    },
  },
  plugins: [],
};
