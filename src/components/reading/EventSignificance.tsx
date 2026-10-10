import { useTranslations } from 'next-intl';
import { markLatinRuns } from '@/lib/latin-runs';
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
    <section className="mb-10 max-w-[42rem] md:mb-12">
      <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
        {t('significanceHeading')}
      </h2>
      <p
        lang={lang}
        dir={isArabic ? 'rtl' : 'ltr'}
        className={cn(
          'text-ink-light',
          isArabic
            ? 'font-arabic text-xl leading-loose md:text-2xl'
            : 'font-body text-[1.0625rem] leading-relaxed md:text-lg'
        )}
      >
        {isArabic ? markLatinRuns(significance) : significance}
      </p>
    </section>
  );
}
