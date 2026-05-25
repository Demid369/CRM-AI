import type { MetadataRoute } from "next";
import { getIndexedPaths, absoluteUrl } from "@/lib/url-mapping";

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexedPaths().map((entry) => ({
    url: absoluteUrl(entry.path),
    changeFrequency: entry.contentType === "post" ? "monthly" : "yearly",
    priority: entry.priority === "high" ? 1 : 0.8,
  }));
}
