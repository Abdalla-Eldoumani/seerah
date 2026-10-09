import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // URL is the source of truth for locale: no cookie- or header-based redirects,
  // and no cookie written, so the statically cached pages stay cacheable.
  localeDetection: false,
  localeCookie: false,
  // Pages declare their own alternates; the header would list languages for
  // URLs that do not exist.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
  fr: 'ltr',
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
};
