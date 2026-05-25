# delsnab.ru → Next.js migration scaffold

Стартовый репозиторий для миграции **delsnab.ru** с WordPress на **Next.js (App Router)** с сохранением SEO.

## Быстрый старт

```bash
cd delsnab-next
cp .env.example .env.local
npm install
npm run generate:routes   # обновить data/url-mapping.json
npm run dev               # headless WordPress (CMS_MODE=wordpress)
```

## Режимы работы

| Режим | ENV | Описание |
|-------|-----|----------|
| Headless WP | `CMS_MODE=wordpress` | Контент и Yoast meta из REST API |
| Статический | `CMS_MODE=file` | После `npm run migrate:wp` |

## Миграция контента

```bash
npm run migrate:wp
# → data/content/*.json (title, description, canonical, schema, HTML)
```

Затем в `.env.local`:

```
CMS_MODE=file
```

## SEO-гарантии в коде

- `trailingSlash: true` — как на WordPress
- `generateMetadata()` из Yoast / exported JSON
- `JsonLd` — schema.org из Yoast
- `sitemap.ts` + `robots.ts` — зеркало текущих правил
- `middleware.ts` — trailing slash + `data/redirects.json`
- Metrika, GA, Calltouch — `Analytics.tsx`
- Verification meta — `layout.tsx`

## Структура роутов

```
app/
├── page.tsx                      → /
├── [slug]/page.tsx               → pages, posts, work (корневые URL)
├── product/[slug]/page.tsx       → /product/* (38 товаров)
├── product-category/[slug]/      → /product-category/misc/
├── sitemap.ts
└── robots.ts
```

Полная таблица: [docs/URL-MAPPING.md](./docs/URL-MAPPING.md)

## Деплой (cutover)

1. Crawl prod → baseline CSV
2. Staging на `staging.delsnab.ru`
3. Crawl diff staging vs prod (title, canonical, H1)
4. nginx cutover на Next.js
5. WP read-only 4–8 недель
6. Мониторинг Яндекс.Вебмастер

## Скрипты

| Команда | Назначение |
|---------|------------|
| `npm run generate:routes` | Генерация url-mapping.json |
| `npm run migrate:wp` | Экспорт контента из WP REST |
| `npm run build` | Production build (SSG) |

## Приоритетные URL (money pages)

- `/` — главная
- `/metallokonstrukcii/`
- `/lestnitsa-pojar/`
- `/product/pozharnaya-lestnicza-p1-1/`
- `/staircases/`
- `/ispytanie-pozharnyh-lestnic/`

Редизайн UI делайте **поверх** `ContentPage` — не меняйте URL и SEO-поля.
