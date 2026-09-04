import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICE_CONTENT } from "@/lib/services-content";
import { LOCAL_TOWNS } from "@/lib/local-pages";
import { HELP_PAGES } from "@/lib/help-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/areas",
    "/about",
    "/reviews",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];
  const serviceRoutes = SERVICE_CONTENT.map((s) => `/services/${s.slug}`);
  const helpRoutes = ["/help", ...HELP_PAGES.map((h) => `/help/${h.slug}`)];
  const localRoutes = LOCAL_TOWNS.map((t) => `/${t.slug}`);

  function priority(path: string) {
    if (path === "") return 1;
    if (path === "/areas") return 0.8;
    if (path.startsWith("/services")) return 0.8;
    if (localRoutes.includes(path)) return 0.7;
    if (path.startsWith("/help")) return 0.6;
    return 0.5;
  }

  return [...staticRoutes, ...serviceRoutes, ...localRoutes, ...helpRoutes].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: priority(path),
  }));
}
