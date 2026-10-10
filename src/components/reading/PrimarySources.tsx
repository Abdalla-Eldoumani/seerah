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
    <section>
      <h2 className="mb-3 border-b border-line pb-2 font-display text-xl font-bold text-ink">
        {t('primarySourcesHeading')}
      </h2>
      <ul className="space-y-1.5 text-base text-ink-light">
        {sources.map((source) => (
          <li key={source}>{localizeSource(source, locale)}</li>
        ))}
      </ul>
    </section>
  );
}
