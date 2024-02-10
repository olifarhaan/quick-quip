/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentLightPink: "#FEE5E4",
        accentLightPinkDark: "#FDB8B4",
        accentRed: "#890000",
        accentDarkRed: "#3D0607",
        darkBlack: "#131313",
      },
    },
  },
  plugins: [],
}
