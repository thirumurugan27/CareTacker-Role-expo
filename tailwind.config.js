/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary:"#4A5B9B",
        secondary:"#2A36630D",
        bggreen:"#86CD821A",
        lettergreen:"#41973C",
        bggray:"#F9FAFB",
        txtyellow: "#FFD355",
        

      },
    },
  },
  plugins: [],
};
