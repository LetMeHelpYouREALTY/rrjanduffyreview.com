import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        label: ["var(--font-label)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      spacing: {
        section: "5rem",
        "section-lg": "7.5rem",
      },
      borderRadius: {
        clinical: "0.25rem",
        "clinical-lg": "0.5rem",
      },
      colors: {
        surface: "#f9f9ff",
        "surface-low": "#f1f3ff",
        "surface-container": "#e9edff",
        "surface-container-high": "#e1e8fd",
        "on-surface": "#141b2b",
        "on-surface-variant": "#444651",
        "inverse-surface": "#293040",
        "inverse-on-surface": "#edf0ff",
        outline: "#757682",
        "outline-variant": "#c5c5d3",
        primary: "#00236f",
        "on-primary": "#ffffff",
        "primary-container": "#1e3a8a",
        secondary: "#0051d5",
        "on-secondary": "#ffffff",
        "secondary-container": "#316bf3",
        "on-secondary-container": "#fefcff",
        tertiary: "#282b2c",
        "chip-bg": "#e1e8fd",
        "insight-bg": "#dce1ff",
        charcoal: "#141b2b",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
