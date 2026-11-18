import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://science.bookchaowalit.com/", changeFrequency: "monthly", priority: 1 }];
}
