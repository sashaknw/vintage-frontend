/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
  plugins: [],
};
