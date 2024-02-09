/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentRed: "#890000",
        accentDarkRed: "#3D0607",
      },
    },
  },
  plugins: [],
}
