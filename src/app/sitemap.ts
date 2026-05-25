import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { TOWN_CONTENT } from "@/lib/towns-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/areas",
    "/about",
    "/reviews",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];
  const serviceRoutes = SERVICE_CONTENT.map((s) => `/services/${s.slug}`);
  const areaRoutes = TOWN_CONTENT.map((t) => `/areas/${t.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "monthly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/services") || path.startsWith("/areas") ? 0.8 : 0.5,
  }));
}
