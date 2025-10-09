// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4", // vivid aqua (primary)
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        grape: {
          400: "#8B5CF6",
          500: "#7C3AED",
          600: "#6D28D9", // bold purple (secondary/CTA)
          700: "#5B21B6",
        },
        raspberry: {
          500: "#E11D48", // accent for sale/labels
          600: "#BE123C",
        },
        sunshine: {
          400: "#FBBF24", // highlight
          500: "#F59E0B",
        },
        ink: {
          900: "#0F172A", // deep text
        },
      },
      boxShadow: {
        pop: "0 10px 30px -10px rgba(6,182,212,0.35)",
        grape: "0 10px 30px -10px rgba(124,58,237,0.35)",
      },
      borderRadius: { xl2: "1.25rem" },

      // NEW: logo font + animations
      fontFamily: {
        logo: ['"Baloo 2"', "system-ui", "sans-serif"],
      },
      keyframes: {
        pop: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(124,58,237,0.0)" },
          "50%": { boxShadow: "0 12px 28px -8px rgba(124,58,237,0.45)" },
        },
      },
      animation: {
        pop: "pop 320ms ease-in-out",
        glow: "glow 1400ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
