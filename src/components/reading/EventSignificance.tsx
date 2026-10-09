import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface EventSignificanceProps {
  significance: string;
  // Language of the text passed in, which decides dir, lang and typeface.
  lang?: 'en' | 'ar' | 'fr';
}

export default function EventSignificance({
  significance,
  lang = 'en',
}: EventSignificanceProps) {
  const t = useTranslations('event');
  const isArabic = lang === 'ar';

  return (
    <section className="my-10 md:my-14 max-w-prose mx-auto">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-4">
        {t('significanceHeading')}
      </h2>
      <p
        lang={lang}
        dir={isArabic ? 'rtl' : 'ltr'}
        className={cn(
          'text-ink-light',
          isArabic
            ? 'font-arabic text-lg leading-loose md:text-xl'
            : 'font-body text-base leading-relaxed md:text-lg'
        )}
      >
        {significance}
      </p>
    </section>
  );
}
