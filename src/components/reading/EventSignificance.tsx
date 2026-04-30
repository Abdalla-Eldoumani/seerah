import { useTranslations } from 'next-intl';

interface EventSignificanceProps {
  significance: string;
  // Language of the significance text. The page picks Arabic when populated,
  // otherwise English; the component reads this to apply dir/lang/font.
  lang?: 'en' | 'ar';
}

export default function EventSignificance({
  significance,
  lang = 'en',
}: EventSignificanceProps) {
  const t = useTranslations('event');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const fontClass = lang === 'ar' ? '' : 'font-body';

  return (
    <section className="my-10 md:my-14 max-w-prose mx-auto">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-4">
        {t('significanceHeading')}
      </h2>
      <p
        lang={lang}
        dir={dir}
        className={`${fontClass} text-base md:text-lg leading-relaxed text-ink-light`}
      >
        {significance}
      </p>
    </section>
  );
}
