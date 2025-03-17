/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        black: "#131417",
        slate: {
          100: "#f8fafc",
          200: "#e2e8f0",
        },
        gray: {
          50: "#f9fafb",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: [
          '"DM Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        marker: ['"Permanent Marker"', "cursive"],
        golos: ['"Golos Text"', "Roboto"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: "-32" },
        },
      },
      animation: {
        dash: "dash 1.5s linear infinite",
      },
    },
  },
  // Configure daisyUI with specific theme only
  daisyui: {
    themes: ["light"], // Use light theme only
    darkTheme: "light", // Force light theme even when system prefers dark
    base: true, // Keep base styles
    utils: true, // Keep utility classes
  },
  plugins: [require("daisyui")],
};
