import { useLocale, useTranslations } from 'next-intl';
import { localizeSource } from '@/config/names';

interface PrimarySourcesProps {
  sources: string[];
}

export default function PrimarySources({ sources }: PrimarySourcesProps) {
  const t = useTranslations('event');
  const locale = useLocale();

  if (sources.length === 0) return null;

  return (
    <section className="my-8 md:my-12 max-w-prose mx-auto">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-4">
        {t('primarySourcesHeading')}
      </h2>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <span
            key={source}
            className="inline-block rounded-sm border border-ink-soft/20 bg-parchment-dark px-3 py-1 text-xs font-medium text-ink-soft"
          >
            {localizeSource(source, locale)}
          </span>
        ))}
      </div>
    </section>
  );
}
