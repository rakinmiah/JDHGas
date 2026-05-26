import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JDH Gas Services",
    short_name: "JDH Gas",
    description:
      "Gas Safe registered gas and heating engineer in Burgess Hill and Mid Sussex.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b1220",
    icons: [
      { src: "/shield-logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
