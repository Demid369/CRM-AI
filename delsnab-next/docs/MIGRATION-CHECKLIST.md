# WordPress: включить REST API для CPT work

CPT `work` (кейсы) **не экспонирован** в REST API. Добавьте в `functions.php` темы **до миграции**:

```php
add_action('init', function () {
    register_post_type('work', [
        'show_in_rest' => true,
        'rest_base'    => 'work',
        // ... остальные args как в текущей регистрации
    ]);
}, 20);
```

Либо используйте scrape без REST:

```bash
npm run scrape:work
CMS_MODE=file
```

## Экспорт Redirection plugin

WP Admin → Tools → Redirection → Export → JSON → `data/redirects.json`

## Crawl diff перед cutover

```bash
# Screaming Frog или:
npm run migrate:wp
npm run build
# Сравнить title/canonical staging vs prod
```
