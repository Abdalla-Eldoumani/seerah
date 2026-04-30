import { useTranslations } from 'next-intl';

interface EventSignificanceProps {
  significance: string;
}

export default function EventSignificance({ significance }: EventSignificanceProps) {
  const t = useTranslations('event');

  return (
    <section className="my-10 md:my-14 max-w-prose mx-auto">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-4">
        {t('significanceHeading')}
      </h2>
      <p className="font-body text-base md:text-lg leading-relaxed text-ink-light">
        {significance}
      </p>
    </section>
  );
}
