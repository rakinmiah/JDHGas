import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Area landing pages were removed — send their old (indexed) URLs to /services
      { source: "/areas", destination: "/services", permanent: true },
      { source: "/areas/:slug*", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
