import { useLocale, useTranslations } from 'next-intl';
import { localizedField } from '@/lib/localized';
import { CategoryGlyph } from '@/components/icons/CategoryGlyph';
import RouteLine from '@/components/navigation/RouteLine';
import { formatEventDateParts, toEasternDigits } from '@/lib/dates';
import type { Locale } from '@/i18n/routing';
import type { SeerahEvent } from '@/types/seerah';

interface EventHeroProps {
  event: SeerahEvent;
  // Where the event falls among all of them, counted from 1.
  position: { current: number; total: number };
}

export default function EventHero({ event, position }: EventHeroProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const isAr = locale === 'ar';
  const place = localizedField(event, 'location', locale);
  const date = formatEventDateParts(event, locale);
  const digits = (n: number) => (isAr ? toEasternDigits(String(n)) : String(n));

  return (
    <header className="pt-8 md:pt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end lg:gap-14">
        <div className="space-y-3">
          {/* On Arabic the Arabic title is the only h1, so every page has one. */}
          {isAr ? (
            <h1
              dir="rtl"
              lang="ar"
              className="font-arabic text-5xl leading-relaxed text-ink md:text-6xl"
            >
              {event.titleArabic}
            </h1>
          ) : (
            <>
              <p
                dir="rtl"
                lang="ar"
                className="w-fit font-arabic text-3xl leading-relaxed text-ink-light md:text-4xl"
              >
                {event.titleArabic}
              </p>
              <h1 className="font-display text-4xl font-bold leading-tight text-balance text-ink md:text-6xl">
                {localizedField(event, 'title', locale).text}
              </h1>
            </>
          )}
        </div>

        <div className="space-y-1">
          {event.location && (
            <p
              className="place-label"
              dir={place.lang === 'ar' ? 'rtl' : 'ltr'}
              lang={place.lang}
            >
              {place.text}
            </p>
          )}
          <p className="font-display text-xl font-bold text-ink">{date.hijriYear}</p>
          {date.month && <p className="text-base text-ink-light">{date.month}</p>}
          {date.gregorian && <p className="text-base text-ink-soft">{date.gregorian}</p>}
          <p className="flex items-center gap-2 pt-2 text-[0.9375rem] text-ink-soft">
            <CategoryGlyph category={event.category} className="size-4 shrink-0" />
            {t(`categories.${event.category}`)}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <RouteLine
          marks={[{ at: (position.current - 1) / (position.total - 1), color: 'var(--era)' }]}
        />
        <p className="mt-2 text-end text-[0.9375rem] text-ink-soft">
          {t('event.position', {
            current: digits(position.current),
            total: digits(position.total),
          })}
        </p>
      </div>
    </header>
  );
}
