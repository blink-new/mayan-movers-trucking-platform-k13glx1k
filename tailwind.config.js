/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1B365D",
        accent: "#F59E0B",
        background: "#F8FAFC",
        darkMode: "#0F172A",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "inter-semibold": ["Inter-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};