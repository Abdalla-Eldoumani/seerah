import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { localizedField } from '@/lib/localized';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getAllEras,
  getEventById,
  getEventPosition,
  getEraMetadata,
  getAdjacentEvents,
  getEventsByEra,
} from '@/lib/data';
import { eventPath, generateEventMetadata } from '@/lib/metadata';
import { BCP47, pageUrl } from '@/lib/seo';
import { truncate } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { eraStyle } from '@/lib/era-style';
import EventHero from '@/components/reading/EventHero';
import EventSummary from '@/components/reading/EventSummary';
import EventSignificance from '@/components/reading/EventSignificance';
import QuranVerse from '@/components/reading/QuranVerse';
import HadithBlock from '@/components/reading/HadithBlock';
import KeyFigures from '@/components/reading/KeyFigures';
import PrimarySources from '@/components/reading/PrimarySources';
import EventNav from '@/components/navigation/EventNav';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import type { EraId } from '@/types/seerah';
import { routing } from '@/i18n/routing';

// Only the era and event pairs listed below exist; anything else is a 404,
// including a real event under the wrong era.
export const dynamicParams = false;

export function generateStaticParams() {
  const eras = getAllEras();
  const params: { locale: string; eraId: string; eventId: string }[] = [];

  for (const locale of routing.locales) {
    for (const era of eras) {
      const events = getEventsByEra(era.id);
      for (const event of events) {
        params.push({ locale, eraId: era.id, eventId: event.id });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; eraId: string; eventId: string }>;
}): Promise<Metadata> {
  const { locale, eraId, eventId } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const event = getEventById(eventId);
  if (!event) return {};
  return generateEventMetadata(event, eraId, locale);
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string; eraId: string; eventId: string }>;
}) {
  const { locale, eraId, eventId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const event = getEventById(eventId);
  if (!event) notFound();

  const era = getEraMetadata(eraId as EraId);
  if (!era) notFound();
  const position = getEventPosition(eventId);
  if (!position) notFound();
  const { prev, next, prevEra, nextEra } = getAdjacentEvents(eventId);
  const isAr = locale === 'ar';

  const tBreadcrumb = await getTranslations({ locale, namespace: 'breadcrumb' });
  const tEvent = await getTranslations({ locale, namespace: 'event' });
  const tEra = await getTranslations({ locale, namespace: 'era.names' });

  const prevNav = prev
    ? {
        id: prev.id,
        title: localizedField(prev, 'title', locale).text,
        eraId: prevEra?.id ?? eraId,
      }
    : null;

  const nextNav = next
    ? {
        id: next.id,
        title: localizedField(next, 'title', locale).text,
        eraId: nextEra?.id ?? eraId,
      }
    : null;

  const eventTitle = localizedField(event, 'title', locale).text;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: eventTitle,
    description: truncate(localizedField(event, 'summary', locale).text, 200),
    inLanguage: BCP47[locale],
    author: { '@type': 'Organization', name: 'Noor al-Seerah Project' },
    publisher: { '@type': 'Organization', name: 'Noor al-Seerah Project' },
    mainEntityOfPage: pageUrl(locale, eventPath(era.id, event.id)),
    isBasedOn: event.primarySources,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tBreadcrumb('home'), item: pageUrl(locale, '/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: tEra(eraId),
        item: pageUrl(locale, `/era/${era.id}`),
      },
      { '@type': 'ListItem', position: 3, name: eventTitle },
    ],
  };
  // Encode `<` defensively so the JSON cannot terminate the surrounding script element.
  const articleJson = JSON.stringify(articleSchema).replace(/</g, '\\u003c');
  const breadcrumbJson = JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c');

  const summaryText = localizedField(event, 'summary', locale);
  const significanceText = localizedField(event, 'significance', locale);
  return (
    <div className="pb-24" style={eraStyle(era)}>
      <script type="application/ld+json">{articleJson}</script>
      <script type="application/ld+json">{breadcrumbJson}</script>

      <div className="era-band border-t-[6px] border-t-(--era) border-b border-b-line pb-10 md:pb-12">
        <Container className="pt-4 md:pt-6">
          <Breadcrumb
            items={[
              { label: tBreadcrumb('home'), href: '/' },
              { label: tEra(eraId), href: `/era/${era.id}` },
              { label: eventTitle },
            ]}
          />

          <EventHero event={event} position={position} />
        </Container>
      </div>

      <Container className="pt-10 md:pt-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="min-w-0">
            {/* Resolve the narrative for the active locale. The helper reports
                which language it actually returned so the component can set dir and
                font correctly when it falls back to English. */}
            <EventSummary summary={summaryText.text} lang={summaryText.lang} />

            <EventSignificance
              significance={significanceText.text}
              lang={significanceText.lang}
            />

            {event.quranReferences.length > 0 && (
              <section className="my-10 max-w-[42rem] md:my-12">
                <h2 className="mb-2 font-display text-2xl font-bold text-ink md:text-3xl">
                  {tEvent('quranHeading')}
                </h2>
                <div>
                  {event.quranReferences.map((ref, index) => (
                    <QuranVerse key={index} reference={ref} />
                  ))}
                </div>
              </section>
            )}

            {event.hadithReferences.length > 0 && (
              <section className="my-10 max-w-[42rem] md:my-12">
                <h2 className="mb-2 font-display text-2xl font-bold text-ink md:text-3xl">
                  {tEvent('hadithHeading')}
                </h2>
                <div>
                  {event.hadithReferences.map((ref, index) => (
                    <HadithBlock key={index} reference={ref} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* The people and sources sit beside the account on wide screens and
              follow it on narrow ones. */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <KeyFigures figures={event.keyFigures} />
            <PrimarySources sources={event.primarySources} />
          </aside>
        </div>

        <EventNav prev={prevNav} next={nextNav} />
      </Container>
    </div>
  );
}
