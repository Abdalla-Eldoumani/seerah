# Noor al-Seerah

An interactive reader for the life of Prophet Muhammad ﷺ, in English, Arabic, and French. Forty-nine events across three eras, each with its location, summary, and significance in all three languages and a list of the primary sources it draws on. English is the source of record. Content lives in JSON and the application only renders it.

| Era | Events |
|---|---|
| Before the Light (pre-prophethood) | 14 |
| The Light in the Darkness (Meccan) | 18 |
| The Dawn of a Civilisation (Medinan) | 17 |

![The home page in English](docs/screenshots/home-en.png)

![An event page in Arabic, with its Qur'an passage](docs/screenshots/event-ar.png)

## What is on a page

- **Qur'an passages** (36 across the events) are published editions fetched by `npm run fetch:scripture`: Uthmani for Arabic, Saheeh International for English, Hamidullah for French. Nothing is translated here, and the three columns always describe the same ayah range.
- **Hadith** (33 references, 31 distinct citations) show the Arabic matn read from the collection. The English and French are the project's own abridgements and each page says so. Every hadith shows the grading its collection gives: 28 sahih, 3 hasan, 1 hasan-sahih, 1 da'if.
- **Citation record.** `data/citation-review.json` records, for each of the 31 citations, what was read at the collection under that number. The build fails if a citation has no entry.
- **Proper nouns** (people, groups, works, months, surahs) resolve through registries in `src/config`, so Arabic pages do not fall back to Latin script mid-sentence. The build fails on a name with no Arabic or French form.
- **Nothing is requested from another origin at runtime.** Fonts are self-hosted and the content security policy sets `connect-src 'self'`.
- **Share cards** are rendered at build time for every event in every language (147 images), with Arabic set in visual order.

## Stack

- Next.js 16.4 (App Router, Turbopack)
- React 19.3
- TypeScript 5.9
- Tailwind CSS 4.3 with CSS-first tokens
- next-intl 4.14 for routing and messages

## Run it

Node 20.9 or newer.

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. English is at `/`, Arabic at `/ar`, French at `/fr`.

| Command | What it does |
|---|---|
| `npm run build` | Runs both verify scripts, then builds. Must finish without warnings. |
| `npm run start` | Serves the production build. |
| `npm run lint` | ESLint with the Next.js core-web-vitals preset. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run verify:citations` | Every cited hadith has a review entry and every entry is still cited. |
| `npm run verify:names` | Every proper noun has an Arabic and a French form. |
| `npm run fetch:scripture` | Refetches Qur'an text from the published editions. `--check` compares without writing. |

To check that no language leaks into another, scan a production build:

```bash
npm run build && npx next start -p 3000
LOCALES=ar,fr node scripts/verify-locales.mjs http://localhost:3000 / /timeline /about
```

## Configuration

`NEXT_PUBLIC_SITE_URL` sets the origin used in canonical links, alternate-language links, the sitemap, and share cards. It defaults to `https://noor-al-seerah.vercel.app`; set it to the deployed origin when that differs.

## Deploying

The site is fully static apart from one catch-all route that answers unknown paths with a localised 404. It deploys to Vercel without extra configuration: security headers are set in `next.config.mjs`, which is the only place they live.

## More

- [Sources and methodology](docs/SOURCES.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Internationalisation](docs/I18N.md)

## License

MIT.
