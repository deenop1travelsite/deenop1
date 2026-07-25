import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.naam} – ${site.slogan}`,
    short_name: site.naam,
    description: site.beschrijving,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e1a38",
    lang: "nl",
    categories: ["travel", "lifestyle"],
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
