import { useTranslations } from 'next-intl';

interface PrimarySourcesProps {
  sources: string[];
}

export default function PrimarySources({ sources }: PrimarySourcesProps) {
  const t = useTranslations('event');

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
            className="inline-block px-3 py-1 rounded text-xs font-medium bg-parchment-dark/70 text-ink-light/70 border border-ink-light/10"
          >
            {source}
          </span>
        ))}
      </div>
    </section>
  );
}
