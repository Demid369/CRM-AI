import type { MetadataRoute } from "next";
import { getIndexedPaths, absoluteUrl } from "@/lib/url-mapping";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "*.js", "*.css", "*.png", "*.gif", "*.jpg", "*.svg"],
        disallow: [
          "/cgi-bin",
          "/*?s=",
          "/*&s=",
          "/search/",
          "/shop/*/*",
          "/*/page/*/",
          "/author/",
          "/users/",
          "/*/trackback",
          "/*/feed",
          "/*/rss",
          "/*/embed",
          "/xmlrpc.php",
          "/*utm=",
          "/*openstat=",
          "/tag/",
          "/readme.html",
          "/*?replytocom",
        ],
      },
    ],
    sitemap: absoluteUrl("sitemap.xml"),
  };
}
