/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B7A99",
        primaryHover: "#326985",
        secondary: "#1F4E79",
        secondaryHover: "#6FA3D8",
        background: "#F3F4F6",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        icon: "#3B7A99",
      },
    },
  },
  plugins: [],
};
