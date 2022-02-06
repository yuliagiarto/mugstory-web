module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amber: { 200: "#fde18b", 400: "#f4a261", 500: "#d45f01" },
        teal: { 200: "#b4d6c1", 300: "#8dc3a7", 500: "#4e9c81" },
        red: { 200: "#fbedeb", 300: "#ec9488", 500: "#ef7564" },
        blue: { 200: "#bbdefb", 300: "#64b5f6", 500: "#2196f3" },
        yellow: { 200: "#fff9c4", 300: "#fff59d", 500: "#ffee58" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
