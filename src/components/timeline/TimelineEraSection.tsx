import { useLocale, useTranslations } from 'next-intl';
import { formatEraTimespan } from '@/lib/dates';
import { eraStyle } from '@/lib/era-style';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/i18n/routing';
import type { EraMetadata, SeerahEvent } from '@/types/seerah';
import TimelineNode from './TimelineNode';

interface TimelineEraSectionProps {
  era: EraMetadata;
  events: SeerahEvent[];
  // The strip with the era's name. The era page shows the name in its own
  // heading and leaves this off.
  showStrip?: boolean;
}

export default function TimelineEraSection({
  era,
  events,
  showStrip = true,
}: TimelineEraSectionProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('era.names');
  const tRoute = useTranslations('route');
  const isAr = locale === 'ar';
  const timespan = formatEraTimespan(era, locale);
  // The route starts in Makkah and reaches Madinah at the Hijrah, so the band
  // where each begins carries the name of the place.
  const routeStop =
    era.id === 'pre-prophethood' ? 'from' : era.id === 'medinan' ? 'to' : undefined;

  return (
    <section
      className="era-band"
      style={eraStyle(era)}
      aria-labelledby={showStrip ? `era-${era.id}` : undefined}
    >
      {/* top-16 clears the sticky site header. The strip is solid, so the
          entries scrolling underneath never show through. */}
      {showStrip && (
        <div className="era-strip sticky top-16 z-20">
          <Container className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
            <h2
              id={`era-${era.id}`}
              className="flex flex-wrap items-baseline gap-x-4 font-display text-2xl font-bold md:text-3xl"
            >
              {t(era.id)}
              {!isAr && (
                <span dir="rtl" lang="ar" className="font-arabic text-xl font-normal">
                  {era.titleArabic}
                </span>
              )}
            </h2>
            <p className="text-[0.9375rem]">
              {timespan.primary} &middot; {timespan.secondary}
            </p>
          </Container>
        </div>
      )}

      <Container>
        <div className="relative py-10">
          <span
            className="route-dashes-y ledger-spine absolute inset-y-0"
            aria-hidden="true"
          />

          {routeStop && (
            <div className="ledger-row relative items-center pb-6">
              <span
                className="col-start-1 size-4 justify-self-center rounded-full bg-terracotta md:col-start-2"
                aria-hidden="true"
              />
              <p className="place-label col-start-2 md:col-start-3">{tRoute(routeStop)}</p>
            </div>
          )}

          <ol className="relative">
            {events.map((event) => (
              <TimelineNode key={event.id} event={event} eraId={era.id} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
