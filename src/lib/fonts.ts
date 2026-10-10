import { Alegreya, Amiri, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';

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

// Latin display headings and dates. 500 serves the lighter labels, 700 the headings.
export const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-alegreya',
  display: 'swap',
});

// Latin body text and labels. 500 and 600 serve the place labels and nav.
export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
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
