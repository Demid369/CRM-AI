import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { ContentDocument } from "@/types/content";
import {
  fetchHomePage,
  fetchWpBySlug,
  wpEntityToDocument,
} from "@/lib/wordpress";
import {
  getMappingByPath,
  getMappingBySlug,
  getProductSlugs,
} from "@/lib/url-mapping";

const CONTENT_DIR = join(process.cwd(), "data/content");
const CMS_MODE = process.env.CMS_MODE ?? "wordpress";

function readLocalDocument(path: string): ContentDocument | null {
  const filePath = join(CONTENT_DIR, `${path.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "home"}.json`);
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, "utf-8")) as ContentDocument;
}

export async function getPageByPath(path: string): Promise<ContentDocument | null> {
  if (CMS_MODE === "file") {
    return readLocalDocument(path);
  }

  const mapping = getMappingByPath(path);
  if (!mapping || mapping.redirectTo) return null;

  if (path === "/") {
    return fetchHomePage();
  }

  if (mapping.contentType === "product") {
    return getProductBySlug(mapping.slug);
  }

  const endpoint = mapping.wpEndpoint;
  if (!endpoint || endpoint === "product_cat") return null;

  const entity = await fetchWpBySlug(
    endpoint as "pages" | "posts" | "product" | "work",
    mapping.slug,
  );
  if (!entity) return null;

  return wpEntityToDocument(entity, mapping.contentType as ContentDocument["contentType"], mapping.path);
}

export async function getProductBySlug(slug: string): Promise<ContentDocument | null> {
  if (CMS_MODE === "file") {
    return readLocalDocument(`product/${slug}/`);
  }

  const entity = await fetchWpBySlug("product", slug);
  if (!entity) return null;
  return wpEntityToDocument(entity, "product", `product/${slug}/`);
}

export async function getContentBySlug(slug: string): Promise<ContentDocument | null> {
  const mapping = getMappingBySlug(slug);
  if (!mapping) {
  // product-category and other routes handled separately
    const productPath = `product/${slug}/`;
    const productMapping = getMappingByPath(productPath);
    if (productMapping) return getProductBySlug(slug);
    return null;
  }

  return getPageByPath(mapping.path);
}

export function getAllProductSlugsForStaticParams(): string[] {
  return getProductSlugs();
}

export async function getAllSlugsForStaticParams(): Promise<string[]> {
  const { getAllUrlMappings } = await import("@/lib/url-mapping");
  return getAllUrlMappings()
    .filter(
      (e) =>
        e.nextRoute === "app/[slug]/page.tsx" &&
        e.index &&
        !e.redirectTo &&
        e.path !== "/" &&
        // work CPT не в REST API — включите show_in_rest или используйте migrate:wp после scrape
        e.contentType !== "work" &&
        e.contentType !== "work-archive",
    )
    .map((e) => e.slug);
}
