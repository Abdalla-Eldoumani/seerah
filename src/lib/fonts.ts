import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Source_Serif_4 } from 'next/font/google';

// Amiri: Quranic verses, classical Arabic in JSON, the ﷺ symbol context.
export const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400'],
  variable: '--font-amiri',
  display: 'swap',
});

// Cormorant Garamond: English display headings.
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Source Serif 4: English body text.
export const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-source-serif',
  display: 'swap',
});

// IBM Plex Sans Arabic: Arabic UI and navigation. Never applies to Quranic verses.
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-plex-arabic',
  display: 'swap',
});
