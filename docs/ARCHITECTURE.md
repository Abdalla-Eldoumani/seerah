# Architecture

A Next.js App Router site that reads seerah content from JSON files and renders it in three languages. Most of the decisions are about boundaries: what the code may do with the content, and what it may not.

## Data layer

Three JSON files in `data/events/`, one per era. Each has an `era` block (id, title in three languages, timespan, theme colour) and an `events` array; forty-nine events in total (14, 18, and 17).

An event carries a title, location, summary, and significance in three languages; a Hijri year and a Gregorian year with an optional month; a category; its Qur'an references; its hadith references; its primary sources; and its key figures.

- A Qur'an reference holds the Uthmani text with the Saheeh International and Hamidullah translations, all fetched from published editions (`translationProvenance: "fetched"`).
- A hadith reference holds the Arabic matn, the English and French abridgements marked `translationProvenance: "project"`, and the grading the collection gives.

The application never generates, paraphrases, summarises, retranslates, or rewrites these files. A suspected error is raised for human review and fixed in the data, never in a component. The rule holds in every locale: each reads its own suffixed field through `localizedField`.

`src/lib/data.ts` exposes synchronous helpers (`getAllEvents`, `getEventById`, `getEventsByEra`, `getEraMetadata`, `getAllEras`, `getEraForEvent`, `getAdjacentEvents`). The JSON is imported at module level, so every content page renders at build time.

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

The share-card route renders with `next/og` at build time, once per event and locale. The renderer sets text left to right and does not mirror brackets, so Arabic lines are handed over in visual order: runs reversed, brackets swapped. It also cannot apply Amiri's Arabic substitution rules, so Arabic cards use IBM Plex Sans Arabic Bold and Latin cards use Amiri Bold, both read from `assets/fonts`. A few Arabic words are measured wider than they are drawn, which shows as uneven gaps between words.

## Design

Tokens are CSS custom properties in a Tailwind v4 `@theme` block in `src/styles/globals.css`.

| Role | Value |
|---|---|
| Parchment, surface | `#f5efe0`; deeper `#e8dcc8` |
| Ink, text | `#14110a`, `#3d3628`, `#5e5641` |
| Gold, rules and ornament only | `#b88a2a` (2.73:1 on parchment, fails as text) |
| Gold, text and filled buttons | `#7a5b13` (5.49:1) |
| Midnight, focus ring | `#0d1b2a` |

Type is Cormorant Garamond for display, Source Serif 4 for body, Amiri for Qur'anic and classical Arabic (`font-arabic`), and IBM Plex Sans Arabic for Arabic interface text. A small `Salawat` face covers U+FDFA, which the Latin faces lack.

Era banners on the timeline use each era's `themeColor` from its JSON block. The diamond ornament appears once per page; every other break is a rule. Categories share ten SVG glyphs (`src/components/icons/CategoryGlyph.tsx`), mapped in `src/config/categories.ts`.

Guidelines for new components: use the tokens, prefer logical CSS properties (`start`, `end`, `ms`, `me`) so RTL follows, keep touch targets at 44px or more, keep a visible focus ring, and stop motion under `prefers-reduced-motion`.

## Adding a component

1. Put reading components under `src/components/reading/`, layout under `layout/`, navigation under `navigation/`, timeline pieces under `timeline/`, shared primitives (badge, container, divider) under `ui/`, decorative SVG under `icons/`.
2. Use Tailwind utilities backed by tokens. Use inline `style` only for values that vary per event, such as a category colour.
3. UI text comes from `useTranslations()`, with the key added to all three `messages/*.json` files in the same commit. Religious content belongs in `data/events/`, never in `messages/`.
4. Mirror chevrons and arrows on RTL with `rtl:scale-x-[-1]`.
5. Wrap every Arabic run in `dir="rtl" lang="ar"`. Use `font-arabic` for Qur'anic and classical Arabic; Arabic interface text takes the page font.

## Build, lint, typecheck

`npm run build` is the source of truth and must finish without warnings. `npm run lint` runs ESLint with the Next.js core-web-vitals preset. `npm run typecheck` runs `tsc --noEmit`.
