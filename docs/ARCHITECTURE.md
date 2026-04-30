# Architecture

The project is a Next.js App Router site that reads pre-verified seerah content from JSON files and renders it bilingually. Most of the interesting decisions are about boundaries: what the code is allowed to do, and what it is not.

## Data layer

Three JSON files live in `data/events/`, one per era. Each file contains an `era` block (id, title in English, title in Arabic, timespan, theme colour) and an `events` array of forty-nine events total. An event has an English title and an Arabic title, a Hijri year and a Gregorian year, an optional month, a category, a summary, a significance paragraph, an array of Quran references with both Arabic verse text and an existing English translation, an array of hadith references with source and narrator and existing English translation, a list of primary sources, a list of key figures, and a location in both scripts.

These files are the project's source of truth. The application never generates, paraphrases, summarises, retranslates, or rewrites their contents. If a typo or scholarly error is spotted, it is flagged for human review. The rule applies in both locales: the Arabic site reads `titleArabic`, `locationArabic`, and the Arabic verse text directly from the same files.

`src/lib/data.ts` exposes synchronous helpers (`getAllEvents`, `getEventById`, `getEventsByEra`, `getEraMetadata`, `getAllEras`, `getAdjacentEvents`, `getTimelineNodes`). All three JSON files are imported at module level so every page is statically renderable.

## Routes

The App Router tree lives under `src/app/`. The visible routes are:

- `/` and `/ar` for the home page
- `/timeline` and `/ar/timeline` for the full chronological view
- `/era/[eraId]` and `/ar/era/[eraId]` for an era overview
- `/era/[eraId]/[eventId]` and `/ar/era/[eraId]/[eventId]` for the event detail
- `/about` and `/ar/about` for the project notes

Internally the file system uses a single `[locale]` segment. With `next-intl`'s `localePrefix: 'as-needed'` setting, the default locale (English) is served unprefixed, and Arabic is served at `/ar`. Every page declares `generateStaticParams` so the entire site is pre-rendered at build time. The current build produces 112 static HTML pages.

## Internationalisation

Translations live in two files at the repository root: `messages/en.json` and `messages/ar.json`. Both are hand-authored and contain the full set of UI strings used by the application. Religious content is not in those files; it stays in the JSON event data.

`next-intl` handles routing, message loading, and the runtime `useTranslations` and `getTranslations` APIs. The configuration entry points are `src/i18n/routing.ts`, `src/i18n/request.ts`, and `src/i18n/navigation.ts`. The middleware at `src/proxy.ts` rewrites incoming requests so the URL stays clean and the static HTML behind it gets served. See [I18N.md](I18N.md) for more on adding strings and the locale switcher.

## Design system

Tokens live as CSS custom properties inside a Tailwind v4 `@theme` block in `src/styles/globals.css`. The palette is built around a parchment surface, a warm gold accent, and a deep midnight ink anchor. Type sizes use `clamp()` so they scale with the viewport. Era pages each carry their own accent (forest, midnight blue, navy) so the timeline reads visibly different from era to era.

The exact tokens with rationale and contrast tests are documented in `.agent/DESIGN_SYSTEM.md` for the agents that work on this codebase. Public guidelines for adding components: stick to the tokens, prefer logical CSS properties (`start`, `end`, `me`, `ms`) so RTL flips for free, and keep emoji and em dashes out.

## Iconography

Categories share a small SVG glyph set (`src/components/icons/CategoryGlyph.tsx`) keyed by ten thematic clusters: beginning, spiritual, society, loss, conflict, movement, establishment, conquest, pilgrimage, manuscript. The mapping from event category to glyph lives in `src/config/categories.ts` next to the colour map. The home page carries a single eight-point star ornament drawn from two overlapping squares, the classical khatim sulayman.

## Adding a new component

1. Place reading-display components under `src/components/reading/`, layout chrome under `src/components/layout/`, navigation under `src/components/navigation/`, timeline pieces under `src/components/timeline/`, decorative SVGs under `src/components/icons/`.
2. Use Tailwind utilities backed by tokens. Avoid inline `style` props except for category colours that vary per event.
3. If the component shows UI text, pull strings via `useTranslations()` and add the keys to both `messages/*.json` files in the same commit. If the strings are religious content, they belong in `data/events/`, not in `messages/`.
4. Mirror chevrons and arrows on RTL with `rtl:scale-x-[-1]`.
5. Wrap any Arabic content span in `dir="rtl" lang="ar"` and apply the `font-arabic` family for Quranic and classical Arabic, or rely on the body default for Arabic UI text.

## Build, lint, typecheck

`npm run build` is the source of truth and must finish without warnings. `npm run lint` runs ESLint flat config with `@next/eslint-plugin-next`'s core-web-vitals preset. `npm run typecheck` runs `tsc --noEmit`.
