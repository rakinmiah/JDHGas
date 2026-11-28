/**
 * The honeycomb from the van's rear window, as a flat brand device: outlined
 * hex cells that drop out whole (no fading) away from one corner. Deterministic
 * (seeded), so server and client render the same path. Decorative only.
 */
type Corner = "top-right" | "top-left";

function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function combPath(width: number, height: number, r: number, corner: Corner, density: number, seed: number) {
  const rnd = seeded(seed);
  const w = 1.5 * r;
  const h = Math.sqrt(3) * r;
  let d = "";
  for (let col = -1; col * w < width + r; col++) {
    for (let row = -1; row * h < height + h; row++) {
      const cx = col * w;
      const cy = row * h + (col % 2 ? h / 2 : 0);
      const dx = corner === "top-right" ? (width - cx) / width : cx / width;
      const dy = cy / height;
      const dist = Math.hypot(dx, dy) / Math.SQRT2; // 0 at the anchor corner
      if (rnd() > density - dist * 1.6) continue;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (i * Math.PI) / 3;
        return `${(cx + (r - 2) * Math.cos(a)).toFixed(1)} ${(cy + (r - 2) * Math.sin(a)).toFixed(1)}`;
      });
      d += `M${pts.join("L")}Z`;
    }
  }
  return d;
}

export function Honeycomb({
  width,
  height,
  cell = 22,
  corner = "top-right",
  density = 0.95,
  seed = 7,
  className = "",
}: {
  width: number;
  height: number;
  cell?: number;
  corner?: Corner;
  density?: number;
  seed?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`pointer-events-none absolute ${className}`}
    >
      <path
        d={combPath(width, height, cell, corner, density, seed)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  );
}
