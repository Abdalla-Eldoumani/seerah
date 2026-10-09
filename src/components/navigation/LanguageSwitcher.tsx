'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, localeNames, type Locale } from '@/i18n/routing';

// A dropdown over `routing.locales`, so a new locale appears without a change here.
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [isPending, startTransition] = useTransition();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as Locale;
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label className="relative inline-flex items-center gap-1.5">
      <span className="sr-only">{t('language')}</span>
      <svg
        className="w-4 h-4 text-ink-soft pointer-events-none shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
      </svg>
      <select
        value={locale}
        onChange={onChange}
        disabled={isPending}
        aria-label={t('language')}
        className="min-h-11 cursor-pointer appearance-none bg-transparent ps-1 pe-4 text-sm text-ink-light transition-colors hover:text-gold-dark disabled:opacity-50"
      >
        {routing.locales.map((option) => (
          <option key={option} value={option} lang={option}>
            {localeNames[option]}
          </option>
        ))}
      </select>
      <svg
        className="absolute end-0 h-3 w-3 text-ink-soft pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
