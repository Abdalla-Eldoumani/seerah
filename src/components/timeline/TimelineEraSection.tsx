import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
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
  const locale = useLocale();
  const t = useTranslations('era.names');
  const isAr = locale === 'ar';

  return (
    <section className="relative pb-8">
      <div className={cn('sticky top-0 z-20', 'py-4 px-6 md:px-8 -mx-4 md:-mx-8', 'mb-8')}>
        <div
          className="rounded-lg px-6 py-4 text-center shadow-md"
          style={{ backgroundColor: era.themeColor }}
        >
          <h2 className="font-display text-2xl md:text-3xl text-parchment">
            {t(era.id)}
          </h2>
          {!isAr && (
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-lg text-parchment/80 mt-1"
            >
              {era.titleArabic}
            </p>
          )}
          <p className="font-body text-sm text-parchment/60 mt-2">
            {era.timespan} &middot; {era.timespanHijri}
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
