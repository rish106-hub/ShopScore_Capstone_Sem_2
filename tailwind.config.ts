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
        background: "hsl(var(--bg))",
        foreground: "hsl(var(--fg))",
        card: "hsl(var(--card-bg))",
        "card-foreground": "hsl(var(--card-text))",
        popover: "hsl(var(--pop-bg))",
        "popover-foreground": "hsl(var(--pop-text))",
        primary: "hsl(var(--pri))",
        "primary-foreground": "hsl(var(--pri-text))",
        secondary: "hsl(var(--sec))",
        "secondary-foreground": "hsl(var(--sec-text))",
        muted: "hsl(var(--mut))",
        "muted-foreground": "hsl(var(--mut-text))",
        accent: "hsl(var(--acc))",
        "accent-foreground": "hsl(var(--acc-text))",
        destructive: "hsl(var(--des))",
        "destructive-foreground": "hsl(var(--des-text))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input-bg))",
        ring: "hsl(var(--ring-color))",
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
  plugins: [require("tailwindcss-animate"), plugin(() => {})],
} satisfies Config
