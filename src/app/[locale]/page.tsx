import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getAllEras, getAllEvents, getEventsByEra } from '@/lib/data';
import { formatEraTimespan, formatEventDateParts } from '@/lib/dates';
import { eraStyle } from '@/lib/era-style';
import { localizedField } from '@/lib/localized';
import { pageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import RouteLine from '@/components/navigation/RouteLine';

// How many events each era shows on the home page before the link to the rest.
const EVENTS_SHOWN = 4;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata({ locale, path: '/' });
}

const arrow = (
  <svg
    className="size-4 shrink-0 rtl:scale-x-[-1]"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale: Locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'site' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tEra = await getTranslations({ locale, namespace: 'era' });
  const tArabic = await getTranslations({ locale: 'ar', namespace: 'site' });
  const tEnglish = await getTranslations({ locale: 'en', namespace: 'site' });
  const isAr = locale === 'ar';

  const eras = getAllEras();
  const total = getAllEvents().length;
  // Each era's first stop on the route is where its first event falls in the
  // whole sequence.
  let before = 0;
  const marks = eras.map((era) => {
    const at = before / (total - 1);
    before += getEventsByEra(era.id).length;
    return { at, color: era.accentColor };
  });

  return (
    <>
      <Container className="pb-8 pt-10 md:pb-10 md:pt-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:items-end md:gap-14">
          <div>
            {/* On Arabic the Arabic wordmark is the h1; elsewhere the Latin one is. */}
            {isAr ? (
              <>
                <h1
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-5xl leading-relaxed text-ink md:text-6xl"
                >
                  {tArabic('name')}
                </h1>
                <p lang="en" dir="ltr" className="mt-1 w-fit font-display text-xl font-bold text-ink-light">
                  {tEnglish('name')}
                </p>
              </>
            ) : (
              <>
                <p dir="rtl" lang="ar" className="w-fit font-arabic text-3xl leading-relaxed text-ink-light md:text-4xl">
                  {tArabic('name')}
                </p>
                <h1 className="font-display text-5xl font-bold leading-none text-ink md:text-7xl">
                  {t('name')}
                </h1>
                <p className="mt-3 font-display text-xl font-bold text-ink-light md:text-2xl">
                  {t('subtitle')}
                </p>
              </>
            )}
          </div>

          <div>
            <p
              className={cn(
                'text-ink-light',
                isAr ? 'font-arabic text-xl leading-loose' : 'font-body text-lg leading-relaxed'
              )}
            >
              {t('tagline')}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href="/timeline"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-terracotta px-6 font-display text-base font-bold text-ground transition-colors hover:bg-ink"
              >
                {tHome('ctaPrimary')}
                {arrow}
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center font-display text-base font-bold text-ink-light underline decoration-line underline-offset-4 transition-colors hover:text-terracotta"
              >
                {tHome('ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>

        <RouteLine className="mt-10" marks={marks} />
      </Container>

      <Container>
        <div className="grid md:grid-cols-3">
          {eras.map((era) => {
            const events = getEventsByEra(era.id);
            const timespan = formatEraTimespan(era, locale);
            const description = localizedField(era, 'description', locale);
            return (
              <section
                key={era.id}
                className="era-band flex flex-col"
                style={eraStyle(era)}
                aria-labelledby={`home-${era.id}`}
              >
                <div className="era-strip px-5 py-4">
                  <h2
                    id={`home-${era.id}`}
                    className="flex flex-wrap items-baseline gap-x-3 font-display text-2xl font-bold"
                  >
                    {tEra(`names.${era.id}`)}
                    {!isAr && (
                      <span dir="rtl" lang="ar" className="font-arabic text-xl font-normal">
                        {era.titleArabic}
                      </span>
                    )}
                  </h2>
                  <p className="mt-0.5 text-[0.9375rem]">
                    {timespan.primary} &middot; {timespan.secondary}
                  </p>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-3 pt-5">
                  <p
                    lang={description.lang}
                    dir={description.lang === 'ar' ? 'rtl' : 'ltr'}
                    className={cn(
                      'line-clamp-4 text-ink-light',
                      description.lang === 'ar'
                        ? 'font-arabic text-lg leading-loose'
                        : 'font-body text-base leading-relaxed'
                    )}
                  >
                    {description.text}
                  </p>

                  <ul className="mt-4">
                    {events.slice(0, EVENTS_SHOWN).map((event) => {
                      const date = formatEventDateParts(event, locale);
                      const title = localizedField(event, 'title', locale);
                      return (
                        <li key={event.id} className="border-t border-line">
                          <Link
                            href={`/era/${era.id}/${event.id}`}
                            className="group block py-3"
                          >
                            <span className="block text-[0.9375rem] text-ink-soft">
                              {date.hijriYear}
                              {date.gregorian && <> &middot; {date.gregorian}</>}
                            </span>
                            <span
                              lang={title.lang}
                              className="block font-display text-lg font-bold leading-snug text-ink group-hover:text-terracotta"
                            >
                              {title.text}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href={`/era/${era.id}`}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 border-t border-line pt-1 font-display text-base font-bold text-terracotta underline-offset-4 hover:underline"
                  >
                    {tEra(events.length === 1 ? 'eventsCountSingular' : 'eventsCountPlural', {
                      count: events.length,
                    })}
                    {arrow}
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
