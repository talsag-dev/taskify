// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A90E2",
          light: "#7EB7F0",
          dark: "#2D68A0",
        },
        secondary: {
          DEFAULT: "#50E3C2",
          light: "#82F0D9",
          dark: "#3A9F91",
        },
        accent: {
          DEFAULT: "#F5A623",
          light: "#F8C368",
          dark: "#B87417",
        },
        error: {
          DEFAULT: "#E94E77",
          light: "#F28C9E",
          dark: "#AD3555",
        },
      },
      fontFamily: {
        robotoMono: ["Roboto Mono", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
