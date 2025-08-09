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
        color1: "#9C84D9", // className="text-color1"

        color2: {         // className="text-color2-100"
          100: "#9C84E3",
          200: "#9C84D9",
        },

        customGreen: "#058808", // className="bg-customGreen"
        customRed: "#F90604",   // className="bg-customRed"
      },
    },
  },
  plugins: [],
};
