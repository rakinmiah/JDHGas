// JDH Gas design tokens — typed exports for compile-time references.
// Mirror of src/app/globals.css @theme (commit 5115dce). Light theme only.

export const color = {
  ink: "#0b1220",
  primary: "#1b46c2",
  primaryHover: "#15368f",
  flame: "#f2731b",
  steel: "#8da2bc",
  gasSafe: "#ffd200",
  whatsapp: "#127c3f", // AA: white text 5.28:1
  whatsappHover: "#0e6a34",
  surface: "#ffffff",
  sunken: "#f4f7fb",
  inkSoft: "#142036",
  borderSubtle: "#e4e9f0",
  borderStrong: "#c9d2de",
  text: "#0b1220",
  muted: "#51607a",
  inverse: "#f5f8fc",
} as const;

export const radius = {
  md: "10px",
  lg: "16px",
  pill: "999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(11,18,32,.06), 0 1px 3px rgba(11,18,32,.08)",
  md: "0 4px 12px rgba(11,18,32,.08), 0 2px 4px rgba(11,18,32,.06)",
  lg: "0 12px 32px rgba(11,18,32,.12)",
} as const;

export const motion = {
  fast: 150,
  base: 200,
  slow: 300,
  reveal: 500,
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeSpring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

export const breakpoint = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

export const layout = {
  containerMax: 1200,
  gutter: 20, // 1.25rem
  gutterMd: 32, // 2rem
} as const;

export const icon = { xs: 14, sm: 16, md: 20, lg: 24, xl: 28 } as const;

export const z = {
  map: 0,
  overlap: 10,
  header: 200,
  menu: 300,
  skiplink: 600,
} as const;

export type ColorToken = keyof typeof color;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadow;
export type IconSize = keyof typeof icon;
