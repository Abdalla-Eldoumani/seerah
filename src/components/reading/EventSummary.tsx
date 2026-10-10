import { cn } from '@/lib/utils';

interface EventSummaryProps {
  summary: string;
  // Language of the text passed in, which decides dir, lang and typeface.
  lang?: 'en' | 'ar' | 'fr';
}

export default function EventSummary({ summary, lang = 'en' }: EventSummaryProps) {
  const isArabic = lang === 'ar';

  return (
    <section className="mb-10 md:mb-12">
      <p
        lang={lang}
        dir={isArabic ? 'rtl' : 'ltr'}
        className={cn(
          'max-w-[42rem] text-ink-light',
          // The drop cap is Latin only: ::first-letter would split an Arabic word.
          isArabic
            ? 'font-arabic text-xl leading-loose md:text-2xl'
            : 'drop-cap font-body text-lg leading-relaxed md:text-xl'
        )}
      >
        {summary}
      </p>
    </section>
  );
}
