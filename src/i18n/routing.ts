import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // URL is the source of truth for locale. No cookie- or header-based redirects.
  localeDetection: false,
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
