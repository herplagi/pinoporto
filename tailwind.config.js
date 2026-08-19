/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080B11",
        "bg-subtle": "#0F141F",
        surface: {
          DEFAULT: "#141B2B",
          hover: "#1B2438",
          border: "#232F47",
        },
        brand: {
          emerald: "#10B981",
          amber: "#F59E0B",
          cyan: "#06B6D4",
          rose: "#F43F5E",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-glow": "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.12) 0%, transparent 65%)",
        "mesh-glow-amber": "radial-gradient(circle at 100% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        }
      }
    },
  },
  plugins: [],
};
