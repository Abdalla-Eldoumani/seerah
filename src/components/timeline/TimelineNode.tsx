import { useLocale, useTranslations } from 'next-intl';
import { localizedField } from '@/lib/localized';
import { cn } from '@/lib/utils';
import { getCategoryColor } from '@/config/categories';
import { CategoryGlyph } from '@/components/icons/CategoryGlyph';
import { formatEventDate } from '@/lib/dates';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { SeerahEvent, EraId } from '@/types/seerah';

interface TimelineNodeProps {
  event: SeerahEvent;
  eraId: EraId;
  index: number;
}

export default function TimelineNode({ event, eraId, index }: TimelineNodeProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const isAr = locale === 'ar';
  const place = localizedField(event, 'location', locale);
  const isEven = index % 2 === 0;
  const categoryLabel = t(`categories.${event.category}`);
  const categoryColor = getCategoryColor(event.category);
  const dateLine = formatEventDate(event, locale);

  // A two-way ternary here once showed the English summary on every French
  // node; the script check could not catch it because both are Latin.
  const summary = localizedField(event, 'summary', locale);
  const summaryIsArabic = summary.lang === 'ar';

  return (
    <div
      className={cn(
        'timeline-node relative mb-10 sm:mb-12 md:mb-14',
        'ps-12 md:ps-0',
        'md:flex',
        isEven ? 'md:justify-start' : 'md:justify-end'
      )}
    >
      <div
        className={cn(
          'absolute z-10',
          'start-0 top-2',
          'md:start-1/2 md:-ms-2 md:top-4'
        )}
      >
        <div
          className="h-4 w-4 rounded-full border-2 border-gold-dark bg-parchment"
          aria-hidden="true"
        />
      </div>

      <Link
        href={`/era/${eraId}/${event.id}`}
        className={cn(
          'block group',
          'w-full md:w-[calc(50%-2rem)]',
          'rounded-sm border border-parchment-dark bg-parchment p-5',
          'transition-colors hover:border-gold-dark'
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <CategoryGlyph
            category={event.category}
            className="w-4 h-4"
            style={{ color: categoryColor }}
          />
          <span
            className="text-xs font-body uppercase tracking-wider"
            style={{ color: categoryColor }}
          >
            {categoryLabel}
          </span>
        </div>

        {/* On Arabic the Arabic title is the card heading. Gating the only
            h3 behind `!isAr` left the Arabic timeline with no card headings,
            so nothing could be navigated by heading. */}
        {isAr ? (
          <h3
            dir="rtl"
            lang="ar"
            className="font-arabic text-xl md:text-2xl text-ink group-hover:text-gold-dark transition-colors"
          >
            {event.titleArabic}
          </h3>
        ) : (
          <>
            <h3 className="font-display text-lg md:text-xl text-ink leading-snug group-hover:text-gold-dark transition-colors">
              {localizedField(event, 'title', locale).text}
            </h3>
            <p dir="rtl" lang="ar" className={cn('font-arabic', 'text-base text-ink-soft mt-1')}>
              {event.titleArabic}
            </p>
          </>
        )}

        <p className="text-sm font-body text-ink-soft mt-2">
          {dateLine}
        </p>

        <p
          lang={summary.lang}
          dir={summaryIsArabic ? 'rtl' : 'ltr'}
          className={cn(
            'mt-3 line-clamp-3 text-ink-light',
            summaryIsArabic ? 'font-arabic text-base leading-loose' : 'font-body text-sm leading-relaxed'
          )}
        >
          {summary.text}
        </p>

        {event.location && (
          <p
            className="text-xs font-body text-ink-soft mt-3"
            dir={place.lang === 'ar' ? 'rtl' : 'ltr'}
            lang={place.lang}
          >
            {place.text}
          </p>
        )}
      </Link>
    </div>
  );
}
