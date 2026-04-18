/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo-based theme colors
        'ledger-dark': '#0a1d37', // Dark blue background (like in logo)
        'ledger-gold': '#f1b31c', // Golden-orange from logo
        'ledger-accent': '#1c4a8a', // A slightly lighter blue for highlights
        'ledger-light': '#f3f6f9', // Very light gray for main content area
      },
    },
  },
  plugins: [],
}