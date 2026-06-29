import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Moroccan-inspired color palette
        morocco: {
          clover: "#415416", // Deep olive green
          "clover-dark": "#2A3A0E", // Darker olive green
          prairie: "#9D3824", // Rich terracotta/rust
          "prairie-dark": "#7A2A1C", // Darker terracotta
          salmon: "#FA8A65", // Warm coral/salmon
          "salmon-light": "#FBB09A", // Lighter coral
          givry: "#F8EBC9", // Light cream/beige
          "givry-dark": "#E8D4A0", // Darker cream
          charcoal: "#2A2A2A", // Dark charcoal for backgrounds
          "charcoal-light": "#3D3D3D", // Lighter charcoal
          sand: "#D9C9A3", // Sandy color
          amber: "#D97D48", // Amber/orange-brown color for buttons
          "amber-light": "#E89A6F", // Lighter amber for hover states
          copper: "#B35A38", // Copper/bronze color
          "copper-light": "#C97B5C", // Lighter copper for hover states
        },
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
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      backgroundImage: {
        "moroccan-pattern": "url('/patterns/moroccan-pattern.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
