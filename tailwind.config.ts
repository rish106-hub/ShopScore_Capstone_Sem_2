import { type Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        card: "var(--card-bg)",
        "card-foreground": "var(--card-text)",
        popover: "var(--pop-bg)",
        "popover-foreground": "var(--pop-text)",
        primary: "var(--pri)",
        "primary-foreground": "var(--pri-text)",
        secondary: "var(--sec)",
        "secondary-foreground": "var(--sec-text)",
        muted: "var(--mut)",
        "muted-foreground": "var(--mut-text)",
        accent: "var(--acc)",
        "accent-foreground": "var(--acc-text)",
        destructive: "var(--des)",
        "destructive-foreground": "var(--des-text)",
        border: "var(--border)",
        input: "var(--input-bg)",
        ring: "var(--ring-color)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), plugin(() => { })],
} satisfies Config
