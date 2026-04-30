import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.04 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="islamic-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="40,8 56,16 64,32 64,48 56,64 40,72 24,64 16,48 16,32 24,16"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <polygon
                points="40,18 48,28 58,28 52,38 54,48 40,44 26,48 28,38 22,28 32,28"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 py-16 max-w-2xl mx-auto">
        <p
          dir="rtl"
          lang="ar"
          className={`font-arabic text-gold ${
            isAr
              ? 'text-5xl sm:text-6xl md:text-7xl mb-4'
              : 'text-3xl sm:text-4xl md:text-5xl mb-4'
          } leading-relaxed`}
        >
          {tArabic('name')}
        </p>

        {isAr ? (
          <p className="font-display text-lg sm:text-xl md:text-2xl text-ink-light font-medium tracking-wide mb-8 mx-auto">
            {tEnglish('name')}
          </p>
        ) : (
          <>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ink tracking-tight mb-3">
              {t('name')}
            </h1>
            <p className="font-display text-lg sm:text-xl md:text-2xl text-ink-light font-medium tracking-wide mb-8 mx-auto">
              {t('subtitle')}
            </p>
          </>
        )}

        <p
          className={`font-body text-base sm:text-lg text-ink-light leading-relaxed max-w-lg mx-auto mb-12 ${
            isAr ? 'font-arabic' : ''
          }`}
        >
          {t('tagline')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-display text-base sm:text-lg font-semibold tracking-wide text-parchment rounded-sm transition-all duration-200 hover:brightness-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-parchment"
            style={{ backgroundColor: 'var(--color-gold-dark)' }}
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
            className="inline-flex items-center gap-1 px-6 py-3 font-display text-sm sm:text-base font-medium tracking-wide text-ink-light hover:text-gold-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 rounded-sm"
          >
            {tHome('ctaSecondary')}
          </Link>
        </div>
      </div>
    </main>
  );
}
