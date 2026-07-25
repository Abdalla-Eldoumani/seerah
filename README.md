# Noor al-Seerah

An interactive reader for the life of Prophet Muhammad ﷺ, in English, Arabic, and French. Forty-nine events drawn from authenticated Islamic sources, presented across three eras. Every event carries its title, location, summary, and significance in all three languages, with the English as the source of record. Content lives in JSON and is never modified by the application; the code is UI around verified data.

Quran text is a published edition in each language (Uthmani, Saheeh International, Hamidullah) fetched by `npm run fetch:scripture`, never translated here. Hadith shows the Arabic matn read from the collection, with English and French renderings marked as the project's own. Each hadith carries the grading its collection gives, including the one narration graded weak.

## Screenshots

Add screenshots at `docs/screenshots/home-en.png` and `docs/screenshots/home-ar.png` to display them here.

## Stack

- Next.js 16 (App Router, async params, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4 with CSS-first tokens
- next-intl for routing and translations

## Quick start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. English is at `/`, Arabic at `/ar`, French at `/fr`.

To check that no language leaks into another, build and scan:

```bash
npm run build && npx next start -p 3000
LOCALES=ar,fr node scripts/verify-locales.mjs http://localhost:3000 / /timeline /about
```

Every hadith citation must have an entry in `data/citation-review.json` saying what was
read at the collection under that number. `npm run verify:citations` enforces it and runs
before every build.

See `docs/I18N.md` for how the three locales fit together and `docs/SOURCES.md` for what
checking every citation found.

## Build

```bash
npm run build
npm run start
```

## More

- [Sources and methodology](docs/SOURCES.md)
- [Architecture overview](docs/ARCHITECTURE.md)
- [Internationalisation notes](docs/I18N.md)

## License

MIT.
