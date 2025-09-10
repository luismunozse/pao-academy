/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}" // opcional
  ],
  theme: {
    extend: { fontFamily: { sans: ["var(--font-sans)"] } },
  },
  plugins: [],
};
