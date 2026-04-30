import { useLocale, useTranslations } from 'next-intl';
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
  const isEven = index % 2 === 0;
  const categoryLabel = t(`categories.${event.category}`);
  const categoryColor = getCategoryColor(event.category);
  const dateLine = formatEventDate(event, locale);

  const summarySource =
    isAr && event.summaryArabic ? event.summaryArabic : event.summary;
  const summaryLang = isAr && event.summaryArabic ? 'ar' : 'en';
  const summaryDir = summaryLang === 'ar' ? 'rtl' : 'ltr';
  const truncatedSummary =
    summarySource.length > 100
      ? summarySource.slice(0, 100).replace(/\s+\S*$/, '') + '...'
      : summarySource;

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
          'start-[18px] top-2',
          'md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2 md:top-4'
        )}
      >
        <div
          className="h-4 w-4 rounded-full border-2 border-gold bg-parchment shadow-sm"
          aria-hidden="true"
        />
      </div>

      <Link
        href={`/era/${eraId}/${event.id}`}
        className={cn(
          'block group',
          'w-full md:w-[calc(50%-2rem)]',
          'rounded-lg border border-parchment-dark bg-parchment/80 p-5',
          'shadow-sm hover:shadow-md transition-shadow duration-200',
          'hover:border-gold/50'
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

        {!isAr && (
          <h3 className="font-display text-lg md:text-xl text-ink leading-snug group-hover:text-gold-dark transition-colors">
            {event.title}
          </h3>
        )}

        <p
          dir="rtl"
          lang="ar"
          className={cn(
            'font-arabic',
            isAr
              ? 'text-xl md:text-2xl text-ink'
              : 'text-base text-ink-light/70 mt-1'
          )}
        >
          {event.titleArabic}
        </p>

        <p className="text-sm font-body text-ink-light/80 mt-2">
          {dateLine}
        </p>

        <p
          lang={summaryLang}
          dir={summaryDir}
          className={`text-sm text-ink-light leading-relaxed mt-3 ${
            summaryLang === 'ar' ? '' : 'font-body'
          }`}
        >
          {truncatedSummary}
        </p>

        {event.location && (
          <p className="text-xs font-body text-ink-light/60 mt-3">
            {event.location}
          </p>
        )}
      </Link>
    </div>
  );
}
