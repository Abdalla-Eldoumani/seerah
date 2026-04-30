import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6" aria-hidden="true">
          <svg
            className="mx-auto"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="40,4 52,14 58,28 58,52 52,66 40,76 28,66 22,52 22,28 28,14"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1"
              opacity="0.5"
            />
            <text
              x="40"
              y="44"
              textAnchor="middle"
              fontSize="20"
              fontWeight="600"
              fill="var(--color-gold-dark)"
            >
              404
            </text>
          </svg>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
          {t('title')}
        </h1>

        <p className="font-body text-ink-light leading-relaxed mb-8">
          {t('body')}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-display font-semibold text-parchment rounded-sm transition-colors hover:brightness-110"
            style={{ backgroundColor: 'var(--color-gold-dark)' }}
          >
            {t('ctaHome')}
          </Link>
          <Link
            href="/timeline"
            className="inline-flex items-center px-6 py-2.5 text-sm font-display font-medium text-ink-light hover:text-gold-dark transition-colors"
          >
            {t('ctaTimeline')}
          </Link>
        </div>
      </div>
    </main>
  );
}
