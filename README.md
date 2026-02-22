# Noor al-Seerah (نور السيرة)

An interactive web experience for learning the life of Prophet Muhammad ﷺ, built with Next.js.

## What this is

49 key events from the Prophet's life, organized across three eras:

- **Pre-Prophethood** (571–610 CE) — 14 events from the Year of the Elephant through the spiritual retreats at Cave Hira
- **Meccan Era** (610–622 CE) — 18 events covering the first revelation, early persecution, and the migration to Madinah
- **Medinan Era** (622–632 CE) — 17 events from the building of Masjid Quba through the Farewell Pilgrimage

All content is pre-verified from authenticated Islamic sources (Sahih al-Bukhari, Sahih Muslim, Ar-Raheeq Al-Makhtum, and others listed in `docs/SOURCES.md`). The code never generates, modifies, or rewrites any religious content — it reads from JSON data files and displays them as-is.

## Stack

- **Next.js 14** (App Router, static generation)
- **TypeScript**
- **Tailwind CSS** with a custom "Living Manuscript" design system (parchment, gold, ink tones)
- **Amiri** font for Arabic text, **Cormorant Garamond** for English headings, **Source Serif 4** for body text

## Project structure

```
data/events/          # Pre-verified JSON content (do not edit)
src/app/              # Next.js pages (home, timeline, era, event detail, about, 404)
src/components/       # React components (reading, timeline, navigation, layout, ui)
src/lib/              # Data loading, fonts, utilities, metadata helpers
src/hooks/            # Custom React hooks (scroll progress, media query, etc.)
src/styles/           # Global CSS with color palette and typography
src/types/            # TypeScript type definitions
docs/                 # Source documentation and methodology
```

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building for production

```bash
npm run build
npm run start
```

## Deploying

The project includes a `vercel.json` with caching and security headers. Push to a Git repo connected to Vercel and it deploys automatically.

## Content policy

The JSON files in `data/events/` are the single source of truth. Every event includes title (Arabic + English), dates (Hijri + CE), summary, significance, Quran references, Hadith references, key figures, and location. If you spot an error in the content, flag it for human review rather than editing directly.