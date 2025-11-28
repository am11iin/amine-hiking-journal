/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        accent: "#10b981",
        beige: "#f5f5dc",
        brown: "#8b5e3c",
        dark: "#1e293b",
        lighter: "#1a2332",
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0f172a 0%, #1a2332 100%)',
        'gradient-card': 'linear-gradient(135deg, #1a2332 0%, #0f172a 100%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(16, 185, 129, 0.15)',
        'glow-lg': '0 0 60px rgba(16, 185, 129, 0.2)',
      },
    },
  },
  plugins: [],
}
