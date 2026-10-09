import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Source_Serif_4 } from 'next/font/google';

// Every face is declared on every page so each font stack in the stylesheet
// always resolves. The Arabic UI face skips the preload: Latin pages never use
// it, and Arabic pages fetch it as soon as the first label renders.

// Qur'anic text and Arabic reading prose.
export const amiri = Amiri({
  subsets: ['arabic'],
  weight: '400',
  variable: '--font-amiri',
  display: 'swap',
});

// Latin display headings.
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-cormorant',
  display: 'swap',
});

// Latin body text. The 600 weight serves labels; without it the browser
// smears the regular face.
export const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-serif',
  display: 'swap',
});

// Arabic interface text: navigation, labels, headings.
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600'],
  variable: '--font-plex-arabic',
  display: 'swap',
  preload: false,
});
