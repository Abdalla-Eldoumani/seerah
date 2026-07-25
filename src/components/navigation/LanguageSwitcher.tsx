'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, localeNames, type Locale } from '@/i18n/routing';

// A dropdown rather than a toggle. The previous two-way button hardcoded
// `en <-> ar`, so once French was added it was unreachable: on /fr the only
// option offered was English. Iterating `routing.locales` means a new locale
// appears here on its own.
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
        className="w-4 h-4 text-ink-light/60 pointer-events-none flex-shrink-0"
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
        className="appearance-none bg-transparent ps-1 pe-4 py-1 text-sm tracking-wide text-ink-light hover:text-gold-dark transition-colors disabled:opacity-50 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-midnight"
      >
        {routing.locales.map((option) => (
          <option key={option} value={option} lang={option}>
            {localeNames[option]}
          </option>
        ))}
      </select>
      <svg
        className="absolute end-0 w-3 h-3 text-ink-light/50 pointer-events-none"
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
