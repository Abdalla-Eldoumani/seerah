import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { getCategoryColor } from '@/config/categories';
import { CategoryGlyph } from '@/components/icons/CategoryGlyph';
import { formatEventDate } from '@/lib/dates';
import type { Locale } from '@/i18n/routing';
import type { SeerahEvent } from '@/types/seerah';

interface EventHeroProps {
  event: SeerahEvent;
}

export default function EventHero({ event }: EventHeroProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const isAr = locale === 'ar';
  const categoryLabel = t(`categories.${event.category}`);
  const categoryColor = getCategoryColor(event.category);
  const dateLine = formatEventDate(event, locale);

  return (
    <header className="text-center py-12 md:py-16 lg:py-20 space-y-6">
      <p
        dir="rtl"
        lang="ar"
        className={cn(
          'font-arabic text-gold-dark leading-relaxed',
          isAr ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl lg:text-5xl'
        )}
      >
        {event.titleArabic}
      </p>

      {!isAr && (
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight text-balance">
          {event.title}
        </h1>
      )}

      <p className="text-lg md:text-xl text-ink-light/70 font-body mx-auto">
        {dateLine}
      </p>

      <p className="text-base md:text-lg text-ink-light/60 font-body mx-auto">
        {event.location}
        {event.locationArabic && (
          <>
            {' '}
            <span aria-hidden="true" className="text-ink-light/30">|</span>{' '}
            <span dir="rtl" lang="ar" className="font-arabic">
              {event.locationArabic}
            </span>
          </>
        )}
      </p>

      <div className="flex justify-center">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-parchment"
          style={{ backgroundColor: categoryColor }}
        >
          <CategoryGlyph category={event.category} className="w-4 h-4" />
          {categoryLabel}
        </span>
      </div>
    </header>
  );
}
