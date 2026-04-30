'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [isPending, startTransition] = useTransition();

  const targetLocale: Locale = locale === 'en' ? 'ar' : 'en';
  const targetLabel =
    targetLocale === 'ar' ? t('switchToArabic') : t('switchToEnglish');

  function onClick() {
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      lang={targetLocale}
      className={`text-sm tracking-wide text-ink-light hover:text-gold-dark transition-colors disabled:opacity-50 ${
        targetLocale === 'ar' ? 'font-arabic' : 'font-display'
      }`}
    >
      {targetLabel}
    </button>
  );
}
