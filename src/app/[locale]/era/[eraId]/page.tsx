import type { Metadata } from 'next';
import { localizedField } from '@/lib/localized';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getEraMetadata, getEventsByEra } from '@/lib/data';
import { generateEraMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import EraNav from '@/components/navigation/EraNav';
import TimelineEraSection from '@/components/timeline/TimelineEraSection';
import { eraStyle } from '@/lib/era-style';
import { formatEraTimespan } from '@/lib/dates';
import { ERA_IDS, type EraId } from '@/types/seerah';
import { routing } from '@/i18n/routing';

// Only the three era ids exist; any other segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ERA_IDS.map((eraId) => ({ locale, eraId }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; eraId: string }>;
}): Promise<Metadata> {
  const { locale, eraId } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const era = getEraMetadata(eraId as EraId);
  if (!era) return {};
  return generateEraMetadata(era, locale);
}

export default async function EraPage({
  params,
}: {
  params: Promise<{ locale: string; eraId: string }>;
}) {
  const { locale, eraId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const era = getEraMetadata(eraId as EraId);
  if (!era) notFound();
  const events = getEventsByEra(era.id);
  const tEra = await getTranslations({ locale, namespace: 'era' });
  const isAr = locale === 'ar';
  const timespan = formatEraTimespan(era, locale);
  const described = localizedField(era, 'description', locale);

  const countLabel =
    events.length === 1
      ? tEra('eventsCountSingular', { count: events.length })
      : tEra('eventsCountPlural', { count: events.length });

  return (
    <div>
      <section className="era-strip" style={eraStyle(era)}>
        <Container className="grid gap-8 py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-end md:gap-12 md:py-16">
          <div className="space-y-3">
            {/* On Arabic the Arabic era name is the h1; elsewhere the translated name is. */}
            {isAr ? (
              <h1
                dir="rtl"
                lang="ar"
                className="font-arabic text-5xl leading-relaxed md:text-6xl"
              >
                {era.titleArabic}
              </h1>
            ) : (
              <>
                <p
                  dir="rtl"
                  lang="ar"
                  className="w-fit font-arabic text-3xl leading-relaxed md:text-4xl"
                >
                  {era.titleArabic}
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  {tEra(`names.${eraId}`)}
                </h1>
              </>
            )}
            <p className="text-lg">
              {timespan.primary} &middot; {timespan.secondary}
            </p>
          </div>

          <div>
            <p
              lang={described.lang}
              dir={described.lang === 'ar' ? 'rtl' : 'ltr'}
              className={cn(
                'max-w-prose',
                described.lang === 'ar'
                  ? 'font-arabic text-xl leading-loose md:text-2xl'
                  : 'font-body text-lg leading-relaxed'
              )}
            >
              {described.text}
            </p>
            <p className="mt-4 text-[0.9375rem]">{countLabel}</p>
          </div>
        </Container>
      </section>

      <div className="border-b border-line">
        <Container>
          <EraNav currentEra={era.id} />
        </Container>
      </div>

      <TimelineEraSection era={era} events={events} showStrip={false} />
    </div>
  );
}
