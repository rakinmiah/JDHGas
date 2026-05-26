import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICE_CONTENT } from "@/lib/services-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/about",
    "/reviews",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];
  const serviceRoutes = SERVICE_CONTENT.map((s) => `/services/${s.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/services") ? 0.8 : 0.5,
  }));
}
