import type { MetadataRoute } from "next";
import { reizen } from "@/lib/data/reizen";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    "",
    "/umrah-reizen",
    "/reisdetails",
    "/werkwijze",
    "/over-ons",
    "/veelgestelde-vragen",
    "/contact",
    "/privacyverklaring",
    "/algemene-voorwaarden",
  ];

  const nu = new Date();

  return [
    ...paginas.map((pad) => ({
      url: `${site.url}${pad}`,
      lastModified: nu,
      changeFrequency: "monthly" as const,
      priority: pad === "" ? 1 : 0.7,
    })),
    ...reizen.map((reis) => ({
      url: `${site.url}/umrah-reizen/${reis.slug}`,
      lastModified: nu,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
