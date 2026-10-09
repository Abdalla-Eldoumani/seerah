import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { HomeOrnament } from '@/components/icons/HomeOrnament';
import { pageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata({ locale, path: '/' });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'site' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tArabic = await getTranslations({ locale: 'ar', namespace: 'site' });
  const tEnglish = await getTranslations({ locale: 'en', namespace: 'site' });
  const isAr = locale === 'ar';

  return (
    <div className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center">
      <div className="relative z-10 text-center px-6 py-16 max-w-2xl mx-auto">
        <HomeOrnament className="mx-auto mb-8 w-20 h-20 text-gold-dark/70" />

        {/* On Arabic the Arabic wordmark is the h1; elsewhere the Latin one is. */}
        {isAr ? (
          <h1
            dir="rtl"
            lang="ar"
            className="font-arabic text-gold-dark text-5xl sm:text-6xl md:text-7xl mb-4 leading-relaxed"
          >
            {tArabic('name')}
          </h1>
        ) : (
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-gold-dark text-3xl sm:text-4xl md:text-5xl mb-4 leading-relaxed"
          >
            {tArabic('name')}
          </p>
        )}

        {isAr ? (
          <p
            lang="en"
            dir="ltr"
            className="font-display text-lg sm:text-xl md:text-2xl text-ink-light font-semibold tracking-wide mb-8 mx-auto"
          >
            {tEnglish('name')}
          </p>
        ) : (
          <>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-ink tracking-tight mb-3">
              {t('name')}
            </h1>
            <p className="font-display text-lg sm:text-xl md:text-2xl text-ink-light font-semibold tracking-wide mb-8 mx-auto">
              {t('subtitle')}
            </p>
          </>
        )}

        <p
          className={cn(
            'mx-auto mb-12 max-w-lg text-ink-light',
            isAr
              ? 'font-arabic text-xl leading-loose sm:text-2xl'
              : 'font-body text-base leading-relaxed sm:text-lg'
          )}
        >
          {t('tagline')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/timeline"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-gold-dark px-8 py-3.5 font-display text-base font-semibold tracking-wide text-parchment transition-colors hover:bg-ink sm:text-lg"
          >
            {tHome('ctaPrimary')}
            <svg
              className="w-4 h-4 rtl:scale-x-[-1]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>

          <Link
            href="/about"
            className="inline-flex min-h-11 items-center gap-1 rounded-sm px-6 py-3 font-display text-sm font-semibold tracking-wide text-ink-light transition-colors hover:text-gold-dark sm:text-base"
          >
            {tHome('ctaSecondary')}
          </Link>
        </div>
      </div>
    </div>
  );
}
