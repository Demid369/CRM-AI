#!/usr/bin/env node
/**
 * Экспорт контента из WordPress REST API в data/content/*.json
 * Сохраняет Yoast title/description/canonical/schema для SEO-safe миграции.
 *
 * Usage:
 *   node scripts/migrate-from-wordpress.mjs
 *   WORDPRESS_API_URL=https://delsnab.ru/wp-json node scripts/migrate-from-wordpress.mjs
 */

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mapping = JSON.parse(
  readFileSync(join(root, "data/url-mapping.json"), "utf-8"),
);
const WP_API = process.env.WORDPRESS_API_URL ?? "https://delsnab.ru/wp-json";
const OUT_DIR = join(root, "data/content");

mkdirSync(OUT_DIR, { recursive: true });

async function fetchWp(endpoint, slug) {
  const url = `${WP_API}/wp/v2/${endpoint}?slug=${encodeURIComponent(slug)}&_fields=id,slug,link,date,modified,title,content,excerpt,yoast_head_json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  const items = await res.json();
  return items[0] ?? null;
}

async function fetchHomePage() {
  const url = `${WP_API}/wp/v2/pages?per_page=100&_fields=id,slug,link,date,modified,title,content,excerpt,yoast_head_json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`pages list → ${res.status}`);
  const pages = await res.json();
  return pages.find((p) => p.link === "https://delsnab.ru/") ?? null;
}

function stripHtml(v) {
  return v.replace(/<[^>]+>/g, "").trim();
}

function toDocument(entity, contentType, path) {
  const yoast = entity.yoast_head_json ?? {};
  const title = stripHtml(entity.title.rendered);
  const h1Match = entity.content.rendered.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? stripHtml(h1Match[1]) : title;

  return {
    id: entity.id,
    slug: entity.slug,
    path,
    contentType,
    title,
    h1,
    content: entity.content.rendered,
    excerpt: entity.excerpt ? stripHtml(entity.excerpt.rendered) : undefined,
    seo: {
      title: yoast.title ?? title,
      description: yoast.description ?? "",
      canonical: yoast.canonical ?? `https://delsnab.ru/${path.replace(/^\/|\/$/g, "")}/`,
      robots: yoast.robots
        ? Object.values(yoast.robots).join(", ")
        : "index, follow",
      ogImage: yoast.og_image?.[0]?.url,
    },
    schema: yoast.schema,
    modifiedAt: entity.modified,
    publishedAt: entity.date,
  };
}

function fileKey(path) {
  return path.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "home";
}

let ok = 0;
let fail = 0;

for (const entry of mapping.entries) {
  if (entry.redirectTo || !entry.index) continue;
  if (entry.contentType === "product_category") continue;

  try {
    let entity = null;

    if (entry.path === "/") {
      entity = await fetchHomePage();
    } else if (entry.wpEndpoint) {
      entity = await fetchWp(entry.wpEndpoint, entry.slug);
    }

    if (!entity) {
      console.warn(`⚠ skip ${entry.path} — not found in WP API`);
      fail += 1;
      continue;
    }

    const doc = toDocument(entity, entry.contentType, entry.path);
    const outPath = join(OUT_DIR, `${fileKey(entry.path)}.json`);
    writeFileSync(outPath, JSON.stringify(doc, null, 2), "utf-8");
    console.log(`✓ ${entry.path}`);
    ok += 1;
  } catch (err) {
    console.error(`✗ ${entry.path}:`, err.message);
    fail += 1;
  }

  await new Promise((r) => setTimeout(r, 200));
}

console.log(`\nDone: ${ok} exported, ${fail} failed → ${OUT_DIR}`);
console.log("Set CMS_MODE=file in .env.local for offline mode.");
