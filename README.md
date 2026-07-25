# Noor al-Seerah

An interactive reader for the life of Prophet Muhammad ﷺ, in English, Arabic, and French. Forty-nine events drawn from authenticated Islamic sources, presented across three eras. Every event carries its summary and significance in all three languages, with the English as the source of record. Content lives in JSON and is never modified by the application; the code is UI around verified data.

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

See `docs/I18N.md` for how the three locales fit together, including one known date formatting issue on the era header.

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
