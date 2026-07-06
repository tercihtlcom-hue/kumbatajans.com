import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { webDesignSites } from "@/lib/webdesign-sites";

const BASE = "https://kumbatajans.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...services.map((s) => ({
      url: `${BASE}/hizmetler/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...webDesignSites.map((w) => ({
      url: `${BASE}/web-tasarim/${w.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
