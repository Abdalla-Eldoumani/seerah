import { useLocale, useTranslations } from 'next-intl';
import { localizedField } from '@/lib/localized';
import { CategoryGlyph } from '@/components/icons/CategoryGlyph';
import { formatEventDateParts } from '@/lib/dates';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { SeerahEvent, EraId } from '@/types/seerah';

interface TimelineNodeProps {
  event: SeerahEvent;
  eraId: EraId;
}

export default function TimelineNode({ event, eraId }: TimelineNodeProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const isAr = locale === 'ar';
  const place = localizedField(event, 'location', locale);
  const date = formatEventDateParts(event, locale);

  // A two-way ternary here once showed the English summary on every French
  // node; the script check could not catch it because both are Latin.
  const summary = localizedField(event, 'summary', locale);
  const summaryIsArabic = summary.lang === 'ar';

  return (
    <li className="ledger-row pb-8 md:pb-10">
      {/* Above the entry on a phone, in its own column from md up. */}
      <p className="col-start-2 row-start-1 mb-1 md:col-start-1 md:mb-0 md:pt-3 md:text-end">
        <span className="block font-display text-lg font-bold leading-snug text-ink">
          {date.hijriYear}
        </span>
        {date.month && (
          <span className="block text-[0.9375rem] leading-snug text-ink-light">{date.month}</span>
        )}
        {date.gregorian && (
          <span className="block text-[0.9375rem] leading-snug text-ink-soft">{date.gregorian}</span>
        )}
      </p>

      <span
        className="col-start-1 row-start-1 mt-1.5 size-3 justify-self-center rounded-full border-2 bg-ground md:col-start-2 md:mt-4"
        style={{ borderColor: 'var(--era-accent)' }}
        aria-hidden="true"
      />

      <Link
        href={`/era/${eraId}/${event.id}`}
        className="group col-start-2 row-start-2 -mx-3 block rounded-sm p-3 transition-colors hover:bg-surface md:col-start-3 md:row-start-1 md:mx-0"
      >
        {event.location && (
          <p
            className="place-label"
            dir={place.lang === 'ar' ? 'rtl' : 'ltr'}
            lang={place.lang}
          >
            {place.text}
          </p>
        )}

        {/* On Arabic the Arabic title is the entry heading. Gating the only
            h3 behind `!isAr` left the Arabic timeline with no entry headings,
            so nothing could be navigated by heading. */}
        {isAr ? (
          <h3
            dir="rtl"
            lang="ar"
            className="mt-1 font-arabic text-2xl leading-relaxed text-ink underline-offset-4 group-hover:text-terracotta group-hover:underline md:text-3xl"
          >
            {event.titleArabic}
          </h3>
        ) : (
          <>
            <h3 className="mt-1 font-display text-[1.375rem] font-bold leading-snug text-ink underline-offset-4 group-hover:text-terracotta group-hover:underline md:text-2xl">
              {localizedField(event, 'title', locale).text}
            </h3>
            <p dir="rtl" lang="ar" className="w-fit font-arabic text-xl leading-relaxed text-ink-soft">
              {event.titleArabic}
            </p>
          </>
        )}

        <p
          lang={summary.lang}
          dir={summaryIsArabic ? 'rtl' : 'ltr'}
          className={
            summaryIsArabic
              ? 'mt-2 line-clamp-3 max-w-[68ch] font-arabic text-lg leading-loose text-ink-light'
              : 'mt-2 line-clamp-3 max-w-[68ch] font-body text-base leading-relaxed text-ink-light'
          }
        >
          {summary.text}
        </p>

        <p className="mt-3 flex items-center gap-2 text-[0.9375rem] text-ink-soft">
          <CategoryGlyph category={event.category} className="size-4 shrink-0" />
          {t(`categories.${event.category}`)}
        </p>
      </Link>
    </li>
  );
}
