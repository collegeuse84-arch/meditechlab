# AGENTS.md — Meditech Laboratory site

## Architecture
Static multi-page site + PWA. No framework, no database. Netlify runs `node scripts/build.mjs` and publishes `dist/`.

- `scripts/build.mjs` — copies `public/` into `dist/`, then renders each `src/pages/*.html` inside the shared layout (head, header nav, footer, mobile tab bar, install banner, scripts). Also writes `sitemap.xml` and `robots.txt`.
- `scripts/site.mjs` — single source of business details (`SITE`) and the inline SVG icon set (`ICONS`).
- `src/pages/*.html` — page bodies. First line is a JSON meta comment: `title`, `desc`, `nav` (active nav id), `path`, optional `scripts` (files in `public/js/`) and `noindex`. Placeholders: `{{icon:name}}` and `{{siteKey}}`.
- `public/js/tests-data.js` — test catalogue (`window.CATEGORIES`). Test fields: `n` name, `s` sample, `d` description, `p` preparation, `f` fasting flag. Referral category has `referral:true`.
- `public/js/app.js` — shared shell: `MTCart` (localStorage key `mt-cart`), `MTHours.ist()` (IST open/closed), install prompt, SW registration.
- `public/js/tests.js`, `book.js`, `contact.js`, `thanks.js` — page scripts.
- `public/sw.js` — network-first for pages with `/offline` fallback; stale-while-revalidate for assets. Bump `VERSION` when changing cached files.

## Forms
Netlify Forms, statically present in built HTML: `booking` (submitted via fetch to `/`, then redirect to `/thank-you`), `contact` and `doctor-enquiry` (plain POST, `action="/thank-you"`). All use honeypot `bot-field`. Field names must stay in sync with the HTML.

## Conventions
- Medical content is conservative, general guidance; never add prices, accreditations, staff names, turnaround times or claims the lab has not confirmed.
- Every page carries the "interpret with a doctor / emergency → hospital or 108" message where relevant.
- Mobile first: bottom tab bar under 860px, 48px touch targets, dark mode via `prefers-color-scheme`.
- Do not commit `dist/`.
