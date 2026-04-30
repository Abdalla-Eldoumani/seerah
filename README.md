# Noor al-Seerah

An interactive bilingual reader for the life of Prophet Muhammad ﷺ. Forty-nine events drawn from authenticated Islamic sources, presented across three eras with English and Arabic UIs side by side. Content lives in JSON and is never modified by the application; the code is UI around verified data.

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

The app runs at `http://localhost:3000`. English is at `/`, Arabic at `/ar`.

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
