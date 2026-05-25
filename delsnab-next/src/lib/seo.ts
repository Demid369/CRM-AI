import type { Metadata } from "next";
import type { ContentDocument, YoastHeadJson } from "@/types/content";
import { absoluteUrl } from "@/lib/url-mapping";

export function yoastToMetadata(
  yoast: YoastHeadJson | undefined,
  fallback: { title: string; description?: string; path: string },
): Metadata {
  const title = yoast?.title ?? fallback.title;
  const description = yoast?.description ?? fallback.description;
  const canonical = yoast?.canonical ?? absoluteUrl(fallback.path);
  const ogImage = yoast?.og_image?.[0]?.url;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: yoast?.og_title ?? title,
      description: yoast?.og_description ?? description,
      url: yoast?.og_url ?? canonical,
      locale: "ru_RU",
      type: "website",
      siteName: "ДЕЛСНАБ",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    robots: parseRobots(yoast?.robots),
    twitter: { card: "summary_large_image" },
  };
}

function parseRobots(robots?: Record<string, string>): Metadata["robots"] {
  if (!robots) return { index: true, follow: true };
  return {
    index: robots.index !== "noindex",
    follow: robots.follow !== "nofollow",
  };
}

export function documentToMetadata(doc: ContentDocument): Metadata {
  return {
    title: doc.seo.title,
    description: doc.seo.description,
    alternates: { canonical: doc.seo.canonical },
    openGraph: {
      title: doc.seo.title,
      description: doc.seo.description,
      url: doc.seo.canonical,
      locale: "ru_RU",
      type: "website",
      siteName: "ДЕЛСНАБ",
      ...(doc.seo.ogImage ? { images: [{ url: doc.seo.ogImage }] } : {}),
    },
    robots: parseRobotsString(doc.seo.robots),
  };
}

function parseRobotsString(robots: string): Metadata["robots"] {
  return {
    index: !robots.includes("noindex"),
    follow: !robots.includes("nofollow"),
  };
}

export function extractH1(html: string, fallback: string): string {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return fallback;
  return match[1].replace(/<[^>]+>/g, "").trim() || fallback;
}

export function robotsMetaFromYoast(yoast?: YoastHeadJson): string {
  if (!yoast?.robots) {
    return "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  }
  const parts = Object.entries(yoast.robots).map(([k, v]) => {
    if (k === "index" || k === "follow") return v;
    return `${k}:${v}`;
  });
  return parts.join(", ");
}
