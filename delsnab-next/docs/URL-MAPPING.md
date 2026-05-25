# URL Mapping: delsnab.ru → Next.js

| Path | Type | Next route | Priority | Index | Notes |
|------|------|------------|----------|-------|-------|
| `/` | page | `app/page.tsx` | high | yes | Главная (front page) |
| `checkout/` | woocommerce-utility | `redirect` | low | no | → /contacts/ |
| `shop/` | woocommerce-utility | `redirect` | low | no | → /contacts/ |
| `my-account/` | woocommerce-utility | `redirect` | low | no | → /contacts/ |
| `cart/` | woocommerce-utility | `redirect` | low | no | → /contacts/ |
| `antresolnye-etazhi/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `ispytanie-pozharnyh-lestnic/` | page | `app/[slug]/page.tsx` | high | yes | WP Page |
| `izdeliya-iz-nerzhavejki/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `karta-sajta/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `lestnicy/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `lestnitsa-pojar/` | page | `app/[slug]/page.tsx` | high | yes | WP Page |
| `metalloizdeliya/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `metallokonstrukcii/` | page | `app/[slug]/page.tsx` | high | yes | WP Page |
| `nashi-raboty/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `ograzhdeniya/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `perila/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `proektnye-raboty/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `vakansii-kompanii-delsnab/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `zaklad/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `contacts/` | page | `app/[slug]/page.tsx` | high | yes | WP Page |
| `staircases/` | page | `app/[slug]/page.tsx` | high | yes | WP Page |
| `angary/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `o-kompanii/` | page | `app/[slug]/page.tsx` | normal | yes | WP Page |
| `product/lestniczy-na-tetivah/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/lestniczy-na-kosourah/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/karkasy-lestnicz/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/lestniczy-vintovye/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/naruzhnye-lestniczy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/tehnicheskie-lestniczy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/lestniczy-kanalizaczionnye/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/promyshlennye-lestniczy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/zabezhnye-lestniczy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/ploshhadki-obsluzhivaniya/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/mansardnye-lestniczy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/profilnye-lestniczy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/ograzhdenie-iz-nerzhaveyushhej-stali/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/ograzhdenie-iz-nerzhaveyushhej-stali-s-3-rigelyami/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/pozharnaya-lestnicza-p1-1/` | product | `app/product/[slug]/page.tsx` | high | yes | WooCommerce product |
| `product/lestnicza-p2-evakuaczionnaya-tip-3/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/ograzhdenie-iz-nerzhaveyushhej-stali-s-2-rigelyami/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/armaturnye-karkasy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/fasonka-i-plastiny/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/opory-truboprovodov/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/metallicheskie-ramy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/kovanye-izdeliya/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/estakady/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/vorota-metallicheskie/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/reshetki/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/metallicheskie-navesy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/kozyrki/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/besedki-metallicheskie/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/mebel-iz-metalla/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/arhitekturnye-elementy/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/reklamnye-konstrukczii/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/mangaly/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/mezonin/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/metallicheskie-perekrytiya/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/odnoskatnye-prjamostennye-angary/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/dvuskatnye-prjamostennye-angary/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/arochnye-angary/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `product/vertikalnaya-pozharnaya-lestnicza-p1-2/` | product | `app/product/[slug]/page.tsx` | normal | yes | WooCommerce product |
| `akcziya-pozharnye-ispytaniya-besplatno/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `osobennosti-postroeniya-antresolnogo-etazha/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `osobennosti-proizvodstva-lestnicz-v-moskve/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `osobennosti-proizvodstva-lestnicz-iz-nerzhavejki/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `pozharnye-ispytaniya-pochemu/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `optimizirujte-vash-biznes-s-idealnymi-lestniczami-estetika-bezopasnost-i-uspeh/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `vash-partnyor-v-mire-metalla-zavod-metalloizdelij-s-proektnym-otdelom/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `izgotovlenie-reklamnyh-konstrukczij-v-moskve/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `vybor-lestniczy-dlya-vashego-doma/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `zabottes-o-svoem-avtomobile-i-biznese-s-nashimi-metallicheskimi-navesami/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `unikalnyh-metallicheskih-kozyrkov/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `perila-iz-nerzhaveyushhej-stali-v-moskve-idealnoe-sochetanie-stilya-i-bezopasnosti/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `sozdajte-idealnoe-mesto-dlya-otdyha-s-pomoshhyu-metallicheskih-besedok/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `sozdajte-svoj-ugolok-schastya-besedki-iz-metalla-na-zakaz-v-moskve/` | post | `app/[slug]/page.tsx` | normal | yes | Blog post |
| `work/` | work-archive | `app/[slug]/page.tsx` | normal | yes | Архив кейсов |
| `naruzhnye-lestnicy-fo/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `pozharnye-lestnicy-fo/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `pozharnye-lestnicy-p1-2-nashi-raboti/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `prom-lestnicy/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `vn-lestnicy/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `angary-raboty/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `arochnye-angary/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `dvuskatnye-pryamostennye-angary/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `odnoskatnye-pryamostennye-angary/` | work | `app/[slug]/page.tsx` | normal | yes | Кейс (CPT work) |
| `product-category/misc/` | product_category | `app/product-category/[slug]/page.tsx` | low | no | WC category — в robots Disallow /shop/*/* |