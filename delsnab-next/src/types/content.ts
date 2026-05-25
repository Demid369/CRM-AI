export type ContentType =
  | "page"
  | "product"
  | "post"
  | "work"
  | "work-archive"
  | "product_category"
  | "woocommerce-utility";

export type UrlMappingEntry = {
  path: string;
  contentType: ContentType;
  nextRoute: string;
  wpEndpoint: string | null;
  slug: string;
  notes: string;
  redirectTo: string | null;
  index: boolean;
  priority: "high" | "normal" | "low";
};

export type UrlMappingFile = {
  site: string;
  generatedAt: string;
  total: number;
  entries: UrlMappingEntry[];
};

export type YoastHeadJson = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: Record<string, string>;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_image?: Array<{ url: string; width?: number; height?: number }>;
  schema?: Record<string, unknown>;
};

export type ContentDocument = {
  id: number;
  slug: string;
  path: string;
  contentType: ContentType;
  title: string;
  h1?: string;
  content: string;
  excerpt?: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
    robots: string;
    ogImage?: string;
  };
  schema?: Record<string, unknown>;
  modifiedAt: string;
  publishedAt: string;
};

export type WpEntity = {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  yoast_head_json?: YoastHeadJson;
  yoast_head?: string;
};
