# Порівняння: Astro (lenty-site) ↔ Next.js (цей репозиторій)

Джерело: `Lenty-Mortgage/lenty-site`, гілка `main`, коміт `9514de6ff85068744849afe0f6783c1df4a795d3` (v2.13, 13.10.2026), папка `site/`.
Обидві версії зібрано з однаковими змінними (`PUBLIC_SITE_URL` за замовчуванням, `PUBLIC_BASE=/`, `PUBLIC_NOINDEX` не задано).
Додатково перевірено продакшн-набір: `PUBLIC_SITE_URL=https://lenty.com PUBLIC_BASE=/lenty-site/v2 PUBLIC_NOINDEX=false PUBLIC_LEAD_ENDPOINT=…` — результат той самий (жодних відмінностей).

Повторити: зібрати `site/` з lenty-site (`PUBLIC_BASE=/ npm run build`), потім тут `npm run build && npm run compare -- <шлях до site/dist> out`.

## Підсумок

| | Astro | Next.js |
|---|---|---|
| HTML-сторінок | 33 | 33 (ті самі адреси) |
| Сумарний HTML (33 сторінки) | 742.6 KB · gzip 208.8 KB | 795.9 KB · gzip 212.1 KB (+7 % / +1.6 %) |
| CSS | 1 файл, 35.9 KB | 1 файл, 35.3 KB |
| JS-файли в збірці | 3 файли, 18.9 KB | 3 файли, 19.0 KB |
| JS на типовій сторінці | site.js 4.7 KB + 2.6 KB inline | site.js 4.7 KB + 2.4 KB inline |
| JS на калькуляторі | 12.9 KB + 2.6 KB inline | 13.0 KB + 2.4 KB inline |
| JS на /check, /lp/check | 10.8 KB + 2.6 KB inline | 10.8 KB + 2.4 KB inline |
| React / рантайм фреймворку в браузері | немає | немає (прибирається `scripts/postbuild.mjs`) |
| `<title>`, description, robots, canonical, OG | — | однакові на всіх 33 сторінках |
| JSON-LD (schema.org) | — | однаковий на всіх 33 сторінках |
| DOM усередині `<body>` (теги, атрибути, текст) | — | однаковий на всіх 33 сторінках |
| sitemap-index.xml / sitemap-0.xml, robots.txt | — | однакові (крім `lastmod` = час збірки) |

Для довідки: без кроку `postbuild` (стандартний експорт Next.js, `KEEP_NEXT_RUNTIME=1`) кожна сторінка вантажить ще ≈ 550 KB JS (≈ 170 KB gzip) рантайму React/Next, а HTML головної зростає з 42.6 KB до 133 KB через вбудований RSC-payload. Тому рантайм прибрано: сайт не має жодного React-компонента в браузері.

## Поведінка в браузері

Однаковий сценарій Playwright прогнано на обох збірках, результати збігаються байт-у-байт:

- калькулятори: префіл із `?status=…&price=…`, результати cash-to-close / monthly / affordability, DBR, обмеження строку за віком, sticky-панель, посилання «Discuss my case» з `?status=`, `body.has-calc`;
- форма /check: 7 кроків, валідація, підсумок, `?s=`/UTM/gclid, редирект на /thanks/, ім'я й канал на /thanks/;
- події `dataLayer`: `calc_result` (throttle 1 с), `salesforce_form_start`, `form_step_1…7`, `form_submit` (лише на /thanks/, раз за сесію), `cookie_consent`, `whatsapp_click`, `partner_form_submit`;
- cookie-банер (на мобільних — після прокрутки), «Accept» вмикає GA4 і Clarity (перевірено з тестовими ID: ті самі виклики `gtag`, пересилання подій із `site_variant`, черга Clarity);
- тема Auto/Light/Dark і варіанти Original/Test/Test 1 (із запам'ятовуванням, `?v=test`), каруселі Test 1 (точки, стрілки), фільтр кейсів, вкладки документів, форма партнерів, мобільне меню, 404 зі статусом 404;
- помилок JS у консолі немає.

Скріншоти (8 сторінок × світла/темна тема × desktop/mobile): макет ідентичний; різниця — лише кілька десятків пікселів згладжування окремих гліфів.

## Відмінності

1. **JSON-LD розташовано на початку `<body>`, а не в `<head>`.** Вміст той самий; Google та інші парсери schema.org читають обидва варіанти. (React не переносить `<script type="application/ld+json">` у `<head>`.)
2. **Додаткові мета-теги Twitter.** Next.js автоматично додає `twitter:title`, `twitter:description`, `twitter:image` (+alt/розміри) з Open Graph. В Astro був лише `twitter:card`. Значення збігаються з OG.
3. **Шрифти.** Ті самі файли @fontsource (Prata 400, Inter 400/500/600/700, latin), той самий preload (Prata 400, Inter 400/600). Але `@font-face` записано inline-стилем у `<head>` (≈ 1 KB на сторінку), а файли лежать у `/_assets/fonts/` без хешу в імені (в Astro — `/_astro/*.<hash>.woff2` всередині CSS-бандла).
4. **Клас `has-calc` на `<body>`** калькуляторів ставиться маленьким inline-скриптом на початку `<body>` (до першого рендеру), а не атрибутом: `<body>` у Next.js належить кореневому layout.
5. **CSS збирає lightningcss (Next.js)**, а не Vite: додано `-webkit-backdrop-filter` (Safari) і службові змінні `--lightningcss-light/dark`; правила й вигляд ті самі. CSS лежить у `/_next/static/chunks/*.css` замість `/_astro/*.css`.
6. **Шляхи скриптів:** `/_assets/site.<hash>.js`, `calculator.<hash>.js`, `check-form.<hash>.js` замість `/_astro/…`. Малі скрипти сторінок (/thanks, /cases, /how-it-works, /partners) так само вбудовані inline, як в Astro.
7. **HTML на ≈ 1.5 KB більший на сторінку** (≈ +0.1 KB gzip): inline `@font-face`, додаткові теги Twitter, службові коментарі React `<!-- -->` між текстовими вузлами.
8. **Рантайм Next.js видаляється після збірки** (`scripts/postbuild.mjs`): `<script src="/_next/…">`, RSC-payload, `*.txt`, дублікати `/404/` і `/_not-found/`. Якщо колись знадобиться `'use client'`-компонент, збірка зупиниться з поясненням; тоді `KEEP_NEXT_RUNTIME=1` залишає стандартний вихід Next.js.
9. **`PUBLIC_BASE` за замовчуванням = `/`** (в Astro — `/lenty-site/v2`). Для підпапки задайте змінну явно.
10. **Сторінки поза списком із завдання** — `/glossary/` і `/insights/complex-cases-2026/` — є в main lenty-site, тому теж перенесені (разом із їхньою розміткою schema.org).
11. **Dev-режим** (`npm run dev`) — це звичайний Next.js dev-сервер із рантаймом React; без нього лише продакшн-збірка (`npm run build`).

## Зміни після перенесення (свідомі відмінності від Astro)

Таблиці вище описують стан на момент перенесення (коміт `d31353a`). Після нього в Next.js-версію внесено виправлення доступності (WCAG AA), яких немає в lenty-site. Тому `scripts/compare.mjs` тепер показує відмінності DOM у заголовках — це очікувано.

- **Контраст.** `--muted` у світлій темі: #6A7069 → #646A63 (було 4.24–4.29:1 на #EFECE3 / #E4EDE6, стало ≥ 4.64:1). Кнопки WhatsApp і «моя» бульбашка чату в темній темі: білий текст на #3DBA7A (2.46:1) → темний #071A13 (7.3:1), нова змінна `--on-wa`. Час у «моїй» бульбашці без прозорості (було 3.47:1 / 1.89:1).
- **Порядок заголовків.** Заголовки колонок футера `h4` → `h2`; заголовок hero-картки на головній і ім'я радника на /thanks/ `h3` → `h2 class="h3"` (вигляд h3 не змінився); на /advisors/ додано прихований `h2` для списку радників (на нього вже посилався `aria-labelledby`).
- **Результат:** axe-core — 0 порушень контрасту й порядку заголовків на всіх сторінках у світлій і темній темах, desktop і mobile; Lighthouse Accessibility 94–95 → 100. Висота сторінок і поведінка не змінились.

- **Лише варіант Test.** A/B-перемикач Original / Test / Test 1 прибрано (плаваюча кнопка на десктопі та «Variant» у мобільному меню), параметр `?v=` більше нічого не робить. Головна завжди має вигляд колишнього Test: заголовок «Make the impossible work.» тепер справжній текст `<h1>` (раніше його малював CSS, а в HTML лежав прихований заголовок Original), без картки-прикладу «≈ AED 542k» і рядка довіри під кнопками. Каруселі Test 1 (крапки, стрілки, дублікати карток радників) видалено разом із CSS/JS. Параметр `site_variant` більше не надсилається в GA4 і Clarity. Інші сторінки не змінились.

## Таблиця по сторінках (згенеровано `scripts/compare.mjs`)

`=` — збігається, `(n)` — кількість блоків JSON-LD. JS: зовнішні файли + inline-скрипти (без JSON-LD).
| URL | HTML Astro | HTML Next | gzip Astro | gzip Next | JS Astro (files + inline) | JS Next (files + inline) | head/SEO | JSON-LD | body DOM |
|---|---:|---:|---:|---:|---:|---:|:-:|:-:|:-:|
| / | 40.7 KB | 42.6 KB | 9.0 KB | 9.1 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /404 | 15.0 KB | 16.5 KB | 4.5 KB | 4.6 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (1) | = |
| /about/ | 17.4 KB | 19.0 KB | 5.1 KB | 5.2 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /advisors/ | 20.4 KB | 22.0 KB | 5.3 KB | 5.4 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /calculators/ | 22.0 KB | 23.7 KB | 6.6 KB | 6.8 KB | 12.9 + 2.6 KB (2 files) | 13.0 + 2.4 KB (2 files) | = | = (2) | = |
| /calculators/affordability/ | 21.1 KB | 22.8 KB | 6.3 KB | 6.4 KB | 12.9 + 2.6 KB (2 files) | 13.0 + 2.4 KB (2 files) | = | = (2) | = |
| /calculators/cash-to-close/ | 22.2 KB | 23.9 KB | 6.7 KB | 6.8 KB | 12.9 + 2.6 KB (2 files) | 13.0 + 2.4 KB (2 files) | = | = (2) | = |
| /calculators/monthly-payment/ | 20.6 KB | 22.2 KB | 6.1 KB | 6.2 KB | 12.9 + 2.6 KB (2 files) | 13.0 + 2.4 KB (2 files) | = | = (2) | = |
| /cases/ | 18.2 KB | 19.7 KB | 5.6 KB | 5.6 KB | 4.7 + 3.0 KB (1 file) | 4.7 + 2.8 KB (1 file) | = | = (2) | = |
| /cases/bonus-counted-through-account-history/ | 19.2 KB | 20.7 KB | 5.5 KB | 5.6 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /cases/non-resident-business-owner-approved/ | 19.3 KB | 20.9 KB | 5.6 KB | 5.7 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /cases/off-plan-handover-before-deadline/ | 19.4 KB | 21.0 KB | 5.5 KB | 5.6 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /cases/term-extended-with-co-borrower/ | 18.9 KB | 20.4 KB | 5.5 KB | 5.6 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /check/ | 29.7 KB | 31.8 KB | 7.9 KB | 8.0 KB | 10.8 + 2.6 KB (2 files) | 10.8 + 2.4 KB (2 files) | = | = (2) | = |
| /contact/ | 16.7 KB | 18.3 KB | 4.9 KB | 5.0 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /cookies/ | 15.3 KB | 16.7 KB | 4.8 KB | 4.9 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /disclaimer/ | 15.1 KB | 16.5 KB | 4.7 KB | 4.8 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /faq/ | 37.8 KB | 39.4 KB | 9.2 KB | 9.2 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /glossary/ | 36.6 KB | 38.2 KB | 8.6 KB | 8.6 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /how-it-works/ | 21.2 KB | 22.9 KB | 6.7 KB | 6.8 KB | 4.7 + 2.9 KB (1 file) | 4.7 + 2.7 KB (1 file) | = | = (2) | = |
| /insights/complex-cases-2026/ | 22.4 KB | 24.0 KB | 6.4 KB | 6.5 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (3) | = |
| /lp/check/ | 23.0 KB | 25.1 KB | 6.8 KB | 7.0 KB | 10.8 + 2.6 KB (2 files) | 10.8 + 2.4 KB (2 files) | = | = (1) | = |
| /partners/ | 26.1 KB | 27.8 KB | 7.7 KB | 7.8 KB | 4.7 + 3.7 KB (1 file) | 4.7 + 3.5 KB (1 file) | = | = (3) | = |
| /privacy/ | 15.8 KB | 17.3 KB | 5.0 KB | 5.1 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /situations/business-owner/ | 26.2 KB | 27.9 KB | 7.2 KB | 7.3 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /situations/declined/ | 25.3 KB | 26.9 KB | 7.1 KB | 7.2 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /situations/non-resident/ | 24.2 KB | 25.8 KB | 6.8 KB | 6.9 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /situations/non-standard-income/ | 25.0 KB | 26.7 KB | 6.8 KB | 6.9 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /situations/off-plan-handover/ | 25.6 KB | 27.2 KB | 6.9 KB | 7.0 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /situations/over-55/ | 25.1 KB | 26.7 KB | 6.9 KB | 7.0 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /situations/portfolio/ | 25.5 KB | 27.1 KB | 7.0 KB | 7.1 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (4) | = |
| /terms/ | 15.5 KB | 17.0 KB | 4.9 KB | 5.0 KB | 4.7 + 2.6 KB (1 file) | 4.7 + 2.4 KB (1 file) | = | = (2) | = |
| /thanks/ | 15.9 KB | 17.4 KB | 5.2 KB | 5.3 KB | 4.7 + 3.1 KB (1 file) | 4.7 + 3.0 KB (1 file) | = | = (1) | = |
| **Total** | **742.6 KB** | **795.9 KB** | **208.8 KB** | **212.1 KB** | | | | | |
