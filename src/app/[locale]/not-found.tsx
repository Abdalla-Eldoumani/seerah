import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <Container className="py-16 md:py-24">
      <p className="place-label">404</p>
      <h1 className="mt-3 max-w-[20ch] font-display text-4xl font-bold text-ink md:text-6xl">
        {t('title')}
      </h1>
      <Divider ornament className="max-w-md" />
      <p className="max-w-[42rem] text-lg leading-relaxed text-ink-light">{t('body')}</p>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-sm bg-terracotta px-6 font-display text-base font-bold text-ground transition-colors hover:bg-ink"
        >
          {t('ctaHome')}
        </Link>
        <Link
          href="/timeline"
          className="inline-flex min-h-11 items-center font-display text-base font-bold text-ink-light underline decoration-line underline-offset-4 transition-colors hover:text-terracotta"
        >
          {t('ctaTimeline')}
        </Link>
      </div>
    </Container>
  );
}
