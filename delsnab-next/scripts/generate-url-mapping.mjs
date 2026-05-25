#!/usr/bin/env node
/**
 * Generates data/url-mapping.json from delsnab.ru sitemaps.
 * Run: node scripts/generate-url-mapping.mjs
 */

const BASE = "https://delsnab.ru";

const pages = [
  "/",
  "checkout/",
  "shop/",
  "my-account/",
  "cart/",
  "antresolnye-etazhi/",
  "ispytanie-pozharnyh-lestnic/",
  "izdeliya-iz-nerzhavejki/",
  "karta-sajta/",
  "lestnicy/",
  "lestnitsa-pojar/",
  "metalloizdeliya/",
  "metallokonstrukcii/",
  "nashi-raboty/",
  "ograzhdeniya/",
  "perila/",
  "proektnye-raboty/",
  "vakansii-kompanii-delsnab/",
  "zaklad/",
  "contacts/",
  "staircases/",
  "angary/",
  "o-kompanii/",
];

const products = [
  "lestniczy-na-tetivah",
  "lestniczy-na-kosourah",
  "karkasy-lestnicz",
  "lestniczy-vintovye",
  "naruzhnye-lestniczy",
  "tehnicheskie-lestniczy",
  "lestniczy-kanalizaczionnye",
  "promyshlennye-lestniczy",
  "zabezhnye-lestniczy",
  "ploshhadki-obsluzhivaniya",
  "mansardnye-lestniczy",
  "profilnye-lestniczy",
  "ograzhdenie-iz-nerzhaveyushhej-stali",
  "ograzhdenie-iz-nerzhaveyushhej-stali-s-3-rigelyami",
  "pozharnaya-lestnicza-p1-1",
  "lestnicza-p2-evakuaczionnaya-tip-3",
  "ograzhdenie-iz-nerzhaveyushhej-stali-s-2-rigelyami",
  "armaturnye-karkasy",
  "fasonka-i-plastiny",
  "opory-truboprovodov",
  "metallicheskie-ramy",
  "kovanye-izdeliya",
  "estakady",
  "vorota-metallicheskie",
  "reshetki",
  "metallicheskie-navesy",
  "kozyrki",
  "besedki-metallicheskie",
  "mebel-iz-metalla",
  "arhitekturnye-elementy",
  "reklamnye-konstrukczii",
  "mangaly",
  "mezonin",
  "metallicheskie-perekrytiya",
  "odnoskatnye-prjamostennye-angary",
  "dvuskatnye-prjamostennye-angary",
  "arochnye-angary",
  "vertikalnaya-pozharnaya-lestnicza-p1-2",
];

const posts = [
  "akcziya-pozharnye-ispytaniya-besplatno",
  "osobennosti-postroeniya-antresolnogo-etazha",
  "osobennosti-proizvodstva-lestnicz-v-moskve",
  "osobennosti-proizvodstva-lestnicz-iz-nerzhavejki",
  "pozharnye-ispytaniya-pochemu",
  "optimizirujte-vash-biznes-s-idealnymi-lestniczami-estetika-bezopasnost-i-uspeh",
  "vash-partnyor-v-mire-metalla-zavod-metalloizdelij-s-proektnym-otdelom",
  "izgotovlenie-reklamnyh-konstrukczij-v-moskve",
  "vybor-lestniczy-dlya-vashego-doma",
  "zabottes-o-svoem-avtomobile-i-biznese-s-nashimi-metallicheskimi-navesami",
  "unikalnyh-metallicheskih-kozyrkov",
  "perila-iz-nerzhaveyushhej-stali-v-moskve-idealnoe-sochetanie-stilya-i-bezopasnosti",
  "sozdajte-idealnoe-mesto-dlya-otdyha-s-pomoshhyu-metallicheskih-besedok",
  "sozdajte-svoj-ugolok-schastya-besedki-iz-metalla-na-zakaz-v-moskve",
];

const work = [
  "work",
  "naruzhnye-lestnicy-fo",
  "pozharnye-lestnicy-fo",
  "pozharnye-lestnicy-p1-2-nashi-raboti",
  "prom-lestnicy",
  "vn-lestnicy",
  "angary-raboty",
  "arochnye-angary",
  "dvuskatnye-pryamostennye-angary",
  "odnoskatnye-pryamostennye-angary",
];

const WC_UTILITY = new Set(["checkout/", "shop/", "my-account/", "cart/"]);
const HIGH_PRIORITY = new Set([
  "/",
  "metallokonstrukcii/",
  "lestnitsa-pojar/",
  "staircases/",
  "ispytanie-pozharnyh-lestnic/",
  "contacts/",
  "product/pozharnaya-lestnicza-p1-1/",
]);

/** @type {import('../src/types/content').UrlMappingEntry[]} */
const mapping = [];

function push(entry) {
  mapping.push({
    index: true,
    priority: "normal",
    redirectTo: null,
    ...entry,
  });
}

for (const p of pages) {
  const path = p === "/" ? "/" : p;
  if (WC_UTILITY.has(p)) {
    push({
      path,
      contentType: "woocommerce-utility",
      nextRoute: "redirect",
      wpEndpoint: null,
      slug: p.replace("/", ""),
      notes: "WooCommerce — 301 на /contacts/ или noindex",
      redirectTo: "/contacts/",
      index: false,
      priority: "low",
    });
    continue;
  }
  if (p === "/") {
    push({
      path: "/",
      contentType: "page",
      nextRoute: "app/page.tsx",
      wpEndpoint: "pages",
      slug: "home",
      notes: "Главная (front page)",
      priority: "high",
    });
    continue;
  }
  push({
    path,
    contentType: "page",
    nextRoute: "app/[slug]/page.tsx",
    wpEndpoint: "pages",
    slug: p.replace("/", ""),
    notes: `WP Page`,
    priority: HIGH_PRIORITY.has(p) ? "high" : "normal",
  });
}

for (const slug of products) {
  const path = `product/${slug}/`;
  push({
    path,
    contentType: "product",
    nextRoute: "app/product/[slug]/page.tsx",
    wpEndpoint: "product",
    slug,
    notes: "WooCommerce product",
    priority: slug === "pozharnaya-lestnicza-p1-1" ? "high" : "normal",
  });
}

for (const slug of posts) {
  push({
    path: `${slug}/`,
    contentType: "post",
    nextRoute: "app/[slug]/page.tsx",
    wpEndpoint: "posts",
    slug,
    notes: "Blog post",
  });
}

for (const slug of work) {
  if (slug === "work") {
    push({
      path: "work/",
      contentType: "work-archive",
      nextRoute: "app/[slug]/page.tsx",
      wpEndpoint: "work",
      slug: "work",
      notes: "Архив кейсов",
    });
    continue;
  }
  push({
    path: `${slug}/`,
    contentType: "work",
    nextRoute: "app/[slug]/page.tsx",
    wpEndpoint: "work",
    slug,
    notes: "Кейс (CPT work)",
  });
}

push({
  path: "product-category/misc/",
  contentType: "product_category",
  nextRoute: "app/product-category/[slug]/page.tsx",
  wpEndpoint: "product_cat",
  slug: "misc",
  notes: "WC category — в robots Disallow /shop/*/*",
  index: false,
  priority: "low",
});

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
writeFileSync(
  join(root, "data/url-mapping.json"),
  JSON.stringify(
    {
      site: BASE,
      generatedAt: new Date().toISOString(),
      total: mapping.length,
      entries: mapping,
    },
    null,
    2,
  ),
);

console.log(`Generated ${mapping.length} URL mappings → data/url-mapping.json`);
