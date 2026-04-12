import type { MetadataRoute } from "next";
import { docsNav } from "./docs/_lib/docs-nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://reeckon.io";
  const now = new Date();

  const docPages = docsNav.flatMap((section) =>
    section.items.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...docPages,
  ];
}
