# lenty.com v2 — Next.js

Сайт Lenty на **Next.js 16 (App Router, TypeScript, статичний експорт)**. Перенесено з Astro-версії без змін у текстах, даних, дизайні, адресах, SEO й аналітиці.

## Звідки перенесено

| | |
|---|---|
| Репозиторій | [`Lenty-Mortgage/lenty-site`](https://github.com/Lenty-Mortgage/lenty-site), гілка `main`, папка `site/` (Astro 7) |
| Коміт | `9514de6ff85068744849afe0f6783c1df4a795d3` |
| Версія | **v2.13** — «CRO fixes on the homepage and the /check form (#19)», 13.10.2026 |

Нові зміни в lenty-site після цього коміту сюди автоматично не потрапляють — їх треба переносити окремо.

Порівняння двох версій (розміри, JS, адреси, SEO, відмінності): [docs/COMPARISON.md](docs/COMPARISON.md).

## Запуск

```bash
npm i
npm run dev        # http://localhost:3000/ (Next.js dev-сервер)
npm run build      # → out/ (готовий статичний сайт)
npm run preview    # роздає out/ на http://localhost:4321/
npm run typecheck
```

`npm run build` = `scripts/build-client.mjs` (браузерні скрипти й шрифти) → `next build` (HTML усіх сторінок) → `scripts/postbuild.mjs` (прибирає рантайм Next.js).

## Публікація (GitHub Pages)

Тестова версія: **https://lenty-mortgage.github.io/Lenty-site-Next.js/** (noindex).

`.github/workflows/deploy.yml` збирає сайт з `PUBLIC_BASE=/<назва репозиторію>` і публікує `out/` у гілку `gh-pages`:
- пуш у `main` → збірка й деплой;
- pull request → лише збірка (перевірка, що сайт збирається);
- Actions → «Deploy to GitHub Pages» → **Run workflow** → деплой вибраної гілки.

Одноразово в **Settings → Pages**: *Deploy from a branch*, гілка `gh-pages`, папка `/ (root)`.

## Змінні середовища (під час збірки)

Ті самі, що в Astro-версії.

| Змінна | За замовчуванням | Значення |
|---|---|---|
| `PUBLIC_SITE_URL` | `https://lenty-mortgage.github.io` | Абсолютна адреса сайту (canonical, OG, sitemap, JSON-LD) |
| `PUBLIC_BASE` | `/` | Базовий шлях, напр. `/lenty-site/next` для підпапки на GitHub Pages. *(В Astro за замовчуванням було `/lenty-site/v2`.)* |
| `PUBLIC_NOINDEX` | *(не задано = noindex)* | `false` — прибирає `noindex,nofollow` з публічних сторінок і відкриває robots.txt. `/check`, `/thanks`, `/lp/*`, `/404` лишаються noindex |
| `PUBLIC_LEAD_ENDPOINT` | *(не задано)* | URL, куди форми /check і /partners надсилають JSON (`POST`). Не задано → у консоль пишуться лише назви полів (без значень), ім'я + канал зберігаються в `sessionStorage`, редирект на `/thanks/` |
| `KEEP_NEXT_RUNTIME` | *(не задано)* | `1` — не прибирати рантайм Next.js (потрібно лише якщо з'являться `'use client'`-компоненти) |

Приклад продакшн-збірки: `PUBLIC_SITE_URL=https://lenty.com PUBLIC_BASE=/ PUBLIC_NOINDEX=false PUBLIC_LEAD_ENDPOINT=https://… npm run build`

## Як влаштовано

- **Усі сторінки — серверні компоненти React**, що рендеряться в HTML під час збірки. У браузер React не потрапляє: `scripts/postbuild.mjs` видаляє з `out/` скрипти й RSC-payload Next.js (без нього кожна сторінка тягнула б ≈ 0.5 MB JS, якому нічого гідратувати).
- **JavaScript лише там, де він потрібен** — це ті самі ванільні скрипти, що в Astro, зібрані esbuild:
  - `src/client/site.js` — усі сторінки: події аналітики, cookie-банер, меню «My situation», тема Auto/Light/Dark, перемикач Original/Test/Test 1, каруселі, висота хедера;
  - `src/client/calculator.js` — калькулятори (`/calculators/*`), логіка в `src/lib/calc.js`;
  - `src/client/check-form.js` — форма `/check/` і `/lp/check/`;
  - inline на своїх сторінках: `thanks.js`, `cases-filter.js`, `doc-tabs.js`, `partner-form.js`.
- У `<head>` (`src/app/layout.tsx`) — два inline-скрипти, як і в Astro: тема/варіант до першого рендеру та `dataLayer` + GA4/Clarity, що вмикаються тільки після «Accept».

## Де що лежить

- `src/config/site.ts` — усі змінні з copy-deck (компанія, банки, SLA, комісії, Google-відгуки, партнери, мови, GA4/Clarity id, параметри калькулятора). `null` = не підтверджено → чіп `to confirm`. Блок Google-відгуків з'являється лише при `google.reviews >= 10`. Задайте `analytics.ga4Id` / `analytics.clarityId`, щоб увімкнути GA4 / Microsoft Clarity.
- `src/content/` — situations (7), cases (4), advisors, faq (6 груп), steps (4), partnersFaq. Маркери `[[tbc:…]]` рендеряться як `<span class="tbc">`.
- `src/app/` — по папці на маршрут: `situations/[slug]` і `cases/[slug]` — шаблони (`generateStaticParams`); `not-found.tsx` → `404.html`; `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml` — статичні route handlers.
- `src/components/` — Base (оболонка сторінки + JSON-LD організації й breadcrumbs), Header, MobileBar, Footer, HeroC, FactsStrip, SituationCards, CompareTable, Steps, Advisors, Cases, FAQ, Fees, FinalCTA, AgentsLine, CookieBar, WhatsAppLink, Calculator, CheckForm, …
- `src/lib/` — `calc.js` (логіка калькулятора, без змін), `seo.ts` (title/description/robots/canonical/OG), `entity.ts` і `rich.ts` (schema.org: Organization, Person, WebPage reviewedBy, FAQPage), `url.ts` (базовий шлях і слеші), `routes.ts` (список сторінок для sitemap).
- `src/styles/global.css` — токени й стилі (без змін).
- `scripts/` — `build-client.mjs`, `postbuild.mjs`, `serve.mjs`, `compare.mjs`.

## Сторінки

`/`, `/situations/{non-resident, business-owner, declined, off-plan-handover, non-standard-income, over-55, portfolio}/`, `/cases/` + 4 кейси, `/calculators/` (canonical → cash-to-close), `/calculators/{cash-to-close, monthly-payment, affordability}/`, `/faq/`, `/glossary/`, `/insights/complex-cases-2026/`, `/check/`, `/thanks/`, `/lp/check/`, `/partners/`, `/about/`, `/advisors/`, `/how-it-works/`, `/contact/`, `/privacy/`, `/terms/`, `/cookies/`, `/disclaimer/`, `404.html`, а також `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml`.

Sitemap не містить `/lp/`, `/thanks/`, `/check/`, `/404` і `/calculators/` (як в Astro).

## Події аналітики (dataLayer)

`whatsapp_click`, `call_click`, `cookie_consent`, `calc_result` (throttle 1 с), `salesforce_form_start`, `form_step_N`, `salesforce_form_submit_success`, `form_submit` (лише на `/thanks/`, раз за сесію), `form_submit_error`, `partner_form_submit`, `partner_app_click` (`cta`: `register` / `login` / `register-form`).

З `ga4Id` кожен `dataLayer.push({ event, … })` пересилається в GA4 як подія з тими самими параметрами плюс `site_variant` (`original` / `test` / `test1`, також user property і тег Clarity). У GA4 зареєструйте потрібні параметри як custom dimensions і позначте `form_submit` та `partner_form_submit` як key events.

## Перевірити відповідність Astro-версії

```bash
# у lenty-site/site
PUBLIC_BASE=/ npm run build
# тут
npm run build
npm run compare -- ../lenty-site/site/dist out   # або з --md report.md
```

## TODO (з Astro-версії)

- Логотипи банків (`site.banks.logos`), фото радників, вартість для нерезидентів.
- Автовизначення коду країни за IP у формі /check (зараз +971).
- «Book a 15-min call», «Send me this estimate» на email, фіксований період у калькуляторі — хвиля 2.
