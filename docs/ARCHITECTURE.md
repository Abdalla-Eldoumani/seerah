# Architecture

A Next.js App Router site that reads seerah content from JSON files and renders it in three languages. Most of the decisions are about boundaries: what the code may do with the content, and what it may not.

## Data layer

Three JSON files in `data/events/`, one per era. Each has an `era` block (id, title and description in three languages, Hijri and Gregorian timespans, `themeColor` and `accentColor`) and an `events` array; forty-nine events in total (14, 18, and 17).

An event carries a title, location, summary, and significance in three languages; a Hijri year and a Gregorian year with an optional month; a category; its Qur'an references; its hadith references; its primary sources; and its key figures.

- A Qur'an reference holds the Uthmani text with the Saheeh International and Hamidullah translations, all fetched from published editions (`translationProvenance: "fetched"`).
- A hadith reference holds the Arabic matn and the English text as sunnah.com publishes them (`translationProvenance: "sunnah"`), or, for the two narrations no sunnah.com collection carries, the project's own English and French renderings (`translationProvenance: "project"`), plus the grading shown on the page and an optional `excerpt` flag where only part of a narration is shown.

The application never generates, paraphrases, summarises, retranslates, or rewrites these files. A suspected error is raised for human review and fixed in the data, never in a component. The rule holds in every locale: each reads its own suffixed field through `localizedField`.

`src/lib/data.ts` exposes synchronous helpers (`getAllEvents`, `getEventById`, `getEventsByEra`, `getEraMetadata`, `getAllEras`, `getEraForEvent`, `getEventPosition`, `getAdjacentEvents`). The JSON is imported at module level, so every content page renders at build time.

## Build-time checks

`npm run build` runs two scripts first and stops on a failure:

- `scripts/verify-citations.mjs` requires every cited hadith to have an entry in `data/citation-review.json`, and every entry to still be cited. It proves nothing is unaccounted for; the entries themselves record what was read at the collection.
- `scripts/verify-names.mjs` requires every proper noun in the data to have an Arabic and a French form in the registries under `src/config`. Without it, a missing name renders silently in Latin script inside Arabic prose.

`scripts/verify-locales.mjs` runs against a live production build and reports text whose script disagrees with the page. See [I18N.md](I18N.md).

## Routes

Under `src/app/`:

- `/` the home page
- `/timeline` the full chronological view
- `/era/[eraId]` an era overview
- `/era/[eraId]/[eventId]` an event
- `/era/[eraId]/[eventId]/og` the event's share card, a PNG
- `/about` the project notes
- `/sitemap.xml`, `/robots.txt`, and the icon, outside the `[locale]` segment

Each page exists in three languages: unprefixed English, `/ar`, and `/fr`. The file system has one `[locale]` segment, and `next-intl` with `localePrefix: 'as-needed'` serves the default locale without a prefix. Event, era, and share-card routes set `dynamicParams = false`, so an id that is not in the data, or an event under the wrong era, answers 404.

The current build prerenders 317 routes: every page in every locale, the 147 share cards, the icon, the sitemap, and robots.

`[locale]/[...rest]` catches every other path and calls `notFound()`, so an unknown URL gets a real 404 status and the localised not-found page. It is the one dynamic route. A root `not-found.tsx` covers paths that never reach the locale segment.

## Middleware

`src/proxy.ts` wraps `next-intl`'s middleware. Its matcher skips `_next`, `_vercel`, and any path containing a dot, which keeps `/sitemap.xml`, `/robots.txt`, the icon, and the share cards from being rewritten into the locale segment.

The routing config turns off locale detection, the locale cookie, and the middleware's alternate-language `Link` header. The URL decides the locale, nothing is written to the visitor, and each page declares its own canonical and alternate links through `src/lib/seo.ts` and `src/lib/metadata.ts`.

## Security headers

`next.config.mjs` is the only place headers are set: a content security policy with `connect-src 'self'`, `frame-ancestors 'none'`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and HSTS. Fonts are self-hosted through `next/font`, so the policy needs no third-party origin.

## Share cards

The share-card route renders with `next/og` at build time, once per event and locale. The renderer sets text left to right and does not mirror brackets, so Arabic lines are handed over in visual order: runs reversed, brackets swapped. It also cannot apply Amiri's Arabic substitution rules, so Arabic cards use IBM Plex Sans Arabic Bold. Latin cards use Alegreya Bold, with Amiri Bold behind it for U+FDFA, which Alegreya lacks. The fonts are read from `assets/fonts`, and the renderer accepts TTF, OTF and WOFF but not WOFF2 or variable fonts. A card is an era-coloured strip carrying the era name, then the place, title and date, then a dashed route line. The renderer measures Arabic letters unjoined, so an Arabic line is a little wider than it paints; Arabic cards centre their text so the error splits across both sides, and a few words show uneven gaps.

## Design

The site is a chronicle of places: a warm sand ground with dark ink, terracotta for places and actions, and date-palm green for the Madinan period. Tokens are CSS custom properties in a Tailwind v4 `@theme` block in `src/styles/globals.css`, and the dark scheme overrides them under `prefers-color-scheme: dark`.

| Role | Light | Dark |
|---|---|---|
| Ground, surface | `#f2ead7`, `#e8dec5` | `#16140e`, `#211e15` |
| Rules, route line | `#cbbd9b`, `#8a7a58` | `#3b3626`, `#7d7154` |
| Ink, softer text | `#1c1913`, `#39332a`, `#5b5343` | `#ede4cf`, `#d4cab2`, `#aea48c` |
| Terracotta, text and buttons | `#8f3b25` | `#e3896d` |
| Palm green, text | `#3f5a35` | `#9fc08c` |
| Text on an era strip | `#f8f1e0` | `#f8f1e0` |

Each era carries two colours in its JSON block. `themeColor` fills the solid strip that names the era; `accentColor` tints the band behind its events at 13 percent and colours the stops on the route. The strips keep their colours in both schemes, so the text on them is a fixed light value. The era colours are `#5e4d33` (Before Prophethood), `#8f3b25` (Makkan) and `#3f5a35` (Madinan).

Type is Alegreya for display headings, IBM Plex Sans for body text, Amiri for Qur'anic and reading Arabic (`font-arabic`), and IBM Plex Sans Arabic for Arabic interface text. A small `Salawat` face covers U+FDFA, which the Latin faces lack.

Place names are set like labels on a map: small, letter-spaced capitals in terracotta (`.place-label`). Arabic is never spaced or capitalised, since either breaks the joins between letters. The timeline is a ledger: dates in one column, a dashed route in the middle, the entry on the other side (`.ledger-row`, `.ledger-spine`). `RouteLine` draws the dashed route between Makkah and Madinah with a mark for where an event or an era falls along it. The ringed ornament appears once per page; every other break is a rule. Categories share ten SVG glyphs (`src/components/icons/CategoryGlyph.tsx`), mapped in `src/config/categories.ts`.

Guidelines for new components: use the tokens, prefer logical CSS properties (`start`, `end`, `ms`, `me`) so RTL follows, keep body text at 16px or more and nothing important under 13px, keep touch targets at 44px or more, keep a visible focus ring, and stop motion under `prefers-reduced-motion`.

## Adding a component

1. Put reading components under `src/components/reading/`, layout under `layout/`, navigation under `navigation/`, timeline pieces under `timeline/`, shared primitives (container, divider) under `ui/`, decorative SVG under `icons/`.
2. Use Tailwind utilities backed by tokens. Use inline `style` only for values that vary per event, such as an era colour.
3. UI text comes from `useTranslations()`, with the key added to all three `messages/*.json` files in the same commit. Religious content belongs in `data/events/`, never in `messages/`.
4. Mirror chevrons and arrows on RTL with `rtl:scale-x-[-1]`.
5. Wrap every Arabic run in `dir="rtl" lang="ar"`. Use `font-arabic` for Qur'anic and classical Arabic; Arabic interface text takes the page font.

## Build, lint, typecheck

`npm run build` is the source of truth and must finish without warnings. `npm run lint` runs ESLint with the Next.js core-web-vitals preset. `npm run typecheck` runs `tsc --noEmit`.
