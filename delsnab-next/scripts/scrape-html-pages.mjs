#!/usr/bin/env node
/**
 * Scrape public HTML pages (work CPT и др.) когда REST API недоступен.
 * Парсит title, meta description, canonical, JSON-LD из Yoast.
 *
 * Usage: node scripts/scrape-html-pages.mjs
 */

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mapping = JSON.parse(
  readFileSync(join(root, "data/url-mapping.json"), "utf-8"),
);
const OUT_DIR = join(root, "data/content");
const BASE = "https://delsnab.ru";

mkdirSync(OUT_DIR, { recursive: true });

function parseHtml(html, path, contentType, slug) {
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? slug;
  const description =
    html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "";
  const canonical =
    html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ??
    `${BASE}/${path.replace(/^\/|\/$/g, "")}/`;
  const schemaMatch = html.match(
    /<script type="application\/ld\+json" class="yoast-schema-graph">([\s\S]*?)<\/script>/i,
  );
  const schema = schemaMatch ? JSON.parse(schemaMatch[1]) : undefined;
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match
    ? h1Match[1].replace(/<[^>]+>/g, "").trim()
    : title.split("|")[0].trim();

  const bodyMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const content = bodyMatch?.[1] ?? "";

  return {
    id: 0,
    slug,
    path,
    contentType,
    title,
    h1,
    content,
    seo: {
      title,
      description,
      canonical,
      robots: "index, follow",
    },
    schema,
    modifiedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  };
}

function fileKey(path) {
  return path.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "home";
}

const targets = mapping.entries.filter(
  (e) =>
    (e.contentType === "work" || e.contentType === "work-archive") &&
    e.index &&
    !e.redirectTo,
);

for (const entry of targets) {
  const url = `${BASE}/${entry.path.replace(/^\/|\/$/g, "")}${entry.path === "/" ? "" : "/"}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const doc = parseHtml(html, entry.path, entry.contentType, entry.slug);
    const out = join(OUT_DIR, `${fileKey(entry.path)}.json`);
    writeFileSync(out, JSON.stringify(doc, null, 2));
    console.log(`✓ scraped ${entry.path}`);
  } catch (err) {
    console.error(`✗ ${entry.path}:`, err.message);
  }
  await new Promise((r) => setTimeout(r, 300));
}

console.log(`\nScraped ${targets.length} work pages → ${OUT_DIR}`);
