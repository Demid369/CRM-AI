import type { ContentDocument, WpEntity } from "@/types/content";

const WP_API = process.env.WORDPRESS_API_URL ?? "https://delsnab.ru/wp-json";

type WpEndpoint = "pages" | "posts" | "product" | "work";

async function fetchWp<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_API}${path}`, {
    next: { revalidate: Number(process.env.REVALIDATE_SECONDS ?? 3600) },
  });
  if (!res.ok) {
    throw new Error(`WP API ${path} → ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchWpBySlug(
  endpoint: WpEndpoint,
  slug: string,
): Promise<WpEntity | null> {
  const items = await fetchWp<WpEntity[]>(
    `/wp/v2/${endpoint}?slug=${encodeURIComponent(slug)}&_fields=id,slug,link,date,modified,title,content,excerpt,yoast_head_json`,
  );
  return items[0] ?? null;
}

export async function fetchAllWp(endpoint: WpEndpoint): Promise<WpEntity[]> {
  const perPage = 100;
  let page = 1;
  const all: WpEntity[] = [];

  while (true) {
    const batch = await fetchWp<WpEntity[]>(
      `/wp/v2/${endpoint}?per_page=${perPage}&page=${page}&_fields=id,slug,link,date,modified,title,content,excerpt,yoast_head_json`,
    );
    all.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }

  return all;
}

export function wpEntityToDocument(
  entity: WpEntity,
  contentType: ContentDocument["contentType"],
  path: string,
): ContentDocument {
  const yoast = entity.yoast_head_json;
  const title = stripHtml(entity.title.rendered);
  const canonical = yoast?.canonical ?? `https://delsnab.ru/${path.replace(/^\/|\/$/g, "")}/`;

  return {
    id: entity.id,
    slug: entity.slug,
    path,
    contentType,
    title,
    h1: extractFirstH1(entity.content.rendered, title),
    content: entity.content.rendered,
    excerpt: entity.excerpt ? stripHtml(entity.excerpt.rendered) : undefined,
    seo: {
      title: yoast?.title ?? title,
      description: yoast?.description ?? "",
      canonical,
      robots: yoast?.robots
        ? Object.values(yoast.robots).join(", ")
        : "index, follow",
      ogImage: yoast?.og_image?.[0]?.url,
    },
    schema: yoast?.schema,
    modifiedAt: entity.modified,
    publishedAt: entity.date,
  };
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").trim();
}

function extractFirstH1(html: string, fallback: string): string {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return fallback;
  return stripHtml(match[1]) || fallback;
}

export async function fetchHomePage(): Promise<ContentDocument | null> {
  // Front page in WP is often page with slug or static front page
  const bySlug = await fetchWpBySlug("pages", "home");
  if (bySlug) {
    return wpEntityToDocument(bySlug, "page", "/");
  }

  // Fallback: fetch pages and find link ending with delsnab.ru/
  const pages = await fetchWp<WpEntity[]>(
    `/wp/v2/pages?per_page=100&_fields=id,slug,link,date,modified,title,content,excerpt,yoast_head_json`,
  );
  const front = pages.find((p) => p.link === "https://delsnab.ru/");
  if (front) {
    return wpEntityToDocument(front, "page", "/");
  }

  return null;
}
