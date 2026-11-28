import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback (the default is WebP only).
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // /areas is now the area hub page. Any old /areas/<town> URLs fold into it.
      { source: "/areas/:slug+", destination: "/areas", permanent: true },
      // Gallery / "Our work" page was removed
      { source: "/gallery", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
