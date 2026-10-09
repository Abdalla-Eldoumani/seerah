import { useLocale, useTranslations } from 'next-intl';
import { formatEraTimespan } from '@/lib/dates';
import type { Locale } from '@/i18n/routing';
import type { EraMetadata, SeerahEvent } from '@/types/seerah';
import TimelineNode from './TimelineNode';

interface TimelineEraSectionProps {
  era: EraMetadata;
  events: SeerahEvent[];
  startIndex: number;
}

export default function TimelineEraSection({
  era,
  events,
  startIndex,
}: TimelineEraSectionProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('era.names');
  const isAr = locale === 'ar';
  const timespan = formatEraTimespan(era, locale);

  return (
    <section className="relative pb-8">
      {/* top-16 clears the sticky site header; a solid ground keeps the cards
          scrolling underneath from showing through the gap. */}
      <div className="sticky top-16 z-20 -mx-4 mb-8 bg-parchment px-4 py-3 md:-mx-8 md:px-8">
        <div
          className="rounded-sm border border-gold/50 px-6 py-3 text-center"
          style={{ backgroundColor: era.themeColor }}
        >
          <h2 className="font-display text-2xl text-parchment md:text-3xl">
            {t(era.id)}
          </h2>
          {!isAr && (
            <p dir="rtl" lang="ar" className="font-arabic text-lg text-parchment/85">
              {era.titleArabic}
            </p>
          )}
          <p className="font-body text-sm text-parchment/85 mt-1">
            {timespan.primary} &middot; {timespan.secondary}
          </p>
        </div>
      </div>

      <div>
        {events.map((event, i) => (
          <TimelineNode
            key={event.id}
            event={event}
            eraId={era.id}
            index={startIndex + i}
          />
        ))}
      </div>
    </section>
  );
}
