/** @type {import('tailwindcss').Config} */
export default {
  // Replaces the Play CDN's runtime DOM scan — build-time Tailwind needs an
  // explicit content glob to know which files to scan for class names.
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['Anton', 'sans-serif'],
        condiment: ['Condiment', 'cursive'],
        "headline-xl": ["Montserrat", "sans-serif"],
        "headline-lg": ["Montserrat", "sans-serif"],
        "headline-md": ["Montserrat", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-md": ["Geist", "monospace"],
        "label-sm": ["Geist", "monospace"]
      },
      colors: {
        cream: '#EFF4FF',
        neon: '#6FFF00',
        "surface": "#ffffff",
        "surface-dim": "#f1f5f9",
        "surface-bright": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f8fafc",
        "surface-container": "#f1f5f9",
        "surface-container-high": "#e2e8f0",
        "surface-container-highest": "#cbd5e1",
        "on-surface": "#0f172a",
        "on-surface-variant": "#475569",
        "primary": "#0284c7",
        "secondary": "#0284c7",
        "secondary-container": "#38bdf8",
        "on-secondary": "#ffffff",
        "tertiary": "#6366f1",
        "background": "#f8fafc",
        "on-background": "#0f172a",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      }
    }
  },
  // ponytail: the CDN tag loaded `?plugins=forms,container-queries`, but
  // nothing in src/ actually uses their classes (no `@container`, no bare
  // `form-input`/`form-checkbox` utilities — only custom-named CSS classes
  // that happen to contain those substrings). Skipped installing
  // @tailwindcss/forms + @tailwindcss/container-queries; add them back (as
  // real imports, not require() — this file is ESM) if a component starts
  // using their utilities.
  plugins: [],
}
