import urlMappingData from "../../data/url-mapping.json";
import type { UrlMappingEntry, UrlMappingFile } from "@/types/content";

const mappingFile = urlMappingData as UrlMappingFile;

export function getAllUrlMappings(): UrlMappingEntry[] {
  return mappingFile.entries;
}

export function getMappingByPath(path: string): UrlMappingEntry | undefined {
  const normalized = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  return mappingFile.entries.find((e) => e.path === normalized);
}

export function getMappingBySlug(slug: string): UrlMappingEntry | undefined {
  return mappingFile.entries.find(
    (e) =>
      e.slug === slug &&
      e.nextRoute === "app/[slug]/page.tsx" &&
      !e.redirectTo,
  );
}

export function getProductSlugs(): string[] {
  return mappingFile.entries
    .filter((e) => e.contentType === "product")
    .map((e) => e.slug);
}

export function getIndexedPaths(): UrlMappingEntry[] {
  return mappingFile.entries.filter((e) => e.index && !e.redirectTo);
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://delsnab.ru";

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (path === "/") return `${base}/`;
  return `${base}/${path.replace(/^\/|\/$/g, "")}/`;
}
