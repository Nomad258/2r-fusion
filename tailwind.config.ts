import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium color palette
        gold: {
          50: "#faf8f3",
          100: "#f5f1e8",
          200: "#ebe5d9",
          300: "#d4c5a9",
          400: "#c9b896",
          500: "#b89a6b",
          600: "#a68356",
          700: "#8a6a45",
          800: "#6e5635",
          900: "#5a472d",
          950: "#3c2f1f",
        },
        bronze: {
          50: "#faf9f7",
          100: "#f5f2ef",
          200: "#e8e4df",
          300: "#d4ccc4",
          400: "#b8ada1",
          500: "#a4927f",
          600: "#92785f",
          700: "#78614d",
          800: "#63503f",
          900: "#504236",
          950: "#2a211a",
        },
        ocean: {
          50: "#f5f9fb",
          100: "#ebf3f7",
          200: "#d4e4ed",
          300: "#a8cde1",
          400: "#7ab3d1",
          500: "#5a9bc2",
          600: "#4682ac",
          700: "#3a6a91",
          800: "#305877",
          900: "#2a4a63",
          950: "#1a2f42",
        },
        cream: {
          50: "#fffbf5",
          100: "#fef7ee",
          200: "#fde8d8",
          300: "#fbd4b8",
          400: "#f8b88e",
          500: "#f39c6f",
          600: "#e6815a",
          700: "#cf6b47",
          800: "#b1553f",
          900: "#8f463a",
          950: "#4f241c",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29d",
          500: "#78716b",
          600: "#57534e",
          700: "#43403c",
          800: "#292522",
          900: "#1c1917",
          950: "#0f0d0c",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        slideDown: "slideDown 0.4s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      spacing: {
        "safe-top": "max(1rem, env(safe-area-inset-top))",
        "safe-bottom": "max(1rem, env(safe-area-inset-bottom))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
