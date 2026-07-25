import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Donkerblauw: de basiskleur van de huisstijl
        navy: {
          50: "#f2f5fa",
          100: "#e2e9f4",
          200: "#c3d0e6",
          300: "#94aad1",
          400: "#5f7db4",
          500: "#3d5c96",
          600: "#2b4478",
          700: "#1f3260",
          800: "#16244a",
          900: "#0e1a38",
          950: "#080f22",
        },
        // Goud: alleen als accent. Vanaf 600 donker genoeg voor tekst op wit.
        gold: {
          50: "#fdf9ef",
          100: "#faf0d7",
          200: "#f3ddab",
          300: "#e9c477",
          400: "#dfab4c",
          500: "#c9962f",
          600: "#a97724",
          700: "#87591f",
          800: "#6f4720",
          900: "#5d3b1e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        // Vloeiende koppen: schalen mee met de schermbreedte, zonder mediaqueries
        "titel-hero": [
          "clamp(2.35rem, 1.6rem + 3.4vw, 4rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
        "titel-xl": ["clamp(2rem, 1.4rem + 3vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "titel-lg": ["clamp(1.6rem, 1.25rem + 1.7vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "titel-md": ["clamp(1.25rem, 1.1rem + 0.8vw, 1.6rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "1200px",
        lees: "68ch",
      },
      spacing: {
        // Vast verticaal ritme voor secties
        sectie: "clamp(3.5rem, 2.5rem + 4vw, 6rem)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14, 26, 56, 0.05), 0 6px 20px rgba(14, 26, 56, 0.07)",
        lift: "0 4px 8px rgba(14, 26, 56, 0.07), 0 18px 44px rgba(14, 26, 56, 0.13)",
        knop: "0 1px 2px rgba(14, 26, 56, 0.12), 0 6px 16px rgba(201, 150, 47, 0.25)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        glans: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "scale-in": "scale-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        glans: "glans 1.6s linear infinite",
      },
      transitionTimingFunction: {
        zacht: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
