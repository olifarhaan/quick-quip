/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        light: "#F2F7FE",
        lightTextMuted: "#6F6F6F",
        dark: "#000819",
        accentRed: "#890000",
        accentDarkRed: "#3D0607",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
}
