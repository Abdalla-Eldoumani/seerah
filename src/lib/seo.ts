import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noor-al-seerah.vercel.app';

// Open Graph wants the underscore form. Typing the map by Locale makes a fourth
// locale a compile error rather than a silent en_US.
export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  ar: 'ar_SA',
  fr: 'fr_FR',
};

// schema.org wants BCP 47. A French page declaring en-US tells a search engine
// the wrong thing about its own contents.
export const BCP47: Record<Locale, string> = {
  en: 'en-US',
  ar: 'ar-SA',
  fr: 'fr-FR',
};

// The default locale has no prefix (localePrefix: 'as-needed').
export function localePath(locale: Locale, path: string): string {
  if (locale === routing.defaultLocale) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function pageUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

// Each page names its own canonical URL and its siblings in the other locales.
// Setting this in the shared layout made every page claim the home page.
export function pageAlternates(locale: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: pageUrl(locale, path),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, pageUrl(l, path)])
      ),
      'x-default': pageUrl(routing.defaultLocale, path),
    },
  };
}
