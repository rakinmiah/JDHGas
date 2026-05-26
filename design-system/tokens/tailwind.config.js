/**
 * JDH Gas — Tailwind mapping reference.
 *
 * This project uses **Tailwind CSS v4 (CSS-first)**. There is NO authored
 * tailwind.config.js in the app — tokens are declared in `@theme { … }` inside
 * `src/app/globals.css`, which is the runtime source of truth. Tailwind v4
 * auto-generates utilities (`bg-primary`, `text-ink`, `fill-flame`,
 * `rounded-[var(--radius-lg)]`, etc.) directly from those custom properties.
 *
 * This file exists only as a **reference mapping** for anyone porting the tokens
 * to a Tailwind v3 (config-based) project. Do NOT add this file to the app — it
 * would be ignored/duplicative. Regenerate from tokens.css per INFRASTRUCTURE.md.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        "ink-soft": "#142036",
        primary: "#1b46c2",
        "primary-hover": "#15368f",
        flame: "#f2731b",
        steel: "#8da2bc",
        "gas-safe": "#ffd200",
        whatsapp: "#25d366",
        "whatsapp-hover": "#1eb759",
        surface: "#ffffff",
        sunken: "#f4f7fb",
        "border-subtle": "#e4e9f0",
        "border-strong": "#c9d2de",
        text: "#0b1220",
        muted: "#51607a",
        inverse: "#f5f8fc",
      },
      fontFamily: {
        display: ["var(--font-display-src)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body-src)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { md: "10px", lg: "16px", pill: "999px" },
      boxShadow: {
        sm: "0 1px 2px rgba(11,18,32,.06), 0 1px 3px rgba(11,18,32,.08)",
        md: "0 4px 12px rgba(11,18,32,.08), 0 2px 4px rgba(11,18,32,.06)",
        lg: "0 12px 32px rgba(11,18,32,.12)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      maxWidth: { container: "1200px" },
    },
  },
};
