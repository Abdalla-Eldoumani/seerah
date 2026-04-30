import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getAllEras,
  getEventById,
  getEraMetadata,
  getAdjacentEvents,
  getEventsByEra,
} from '@/lib/data';
import { generateEventMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
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
import { routing, type Locale } from '@/i18n/routing';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noor-al-seerah.vercel.app';

function pageUrl(locale: string, path: string): string {
  return locale === routing.defaultLocale
    ? `${SITE_URL}${path}`
    : `${SITE_URL}/${locale}${path}`;
}

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
  const { locale, eventId } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const event = getEventById(eventId);
  if (!event) return {};
  return generateEventMetadata(event, locale as Locale);
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
  const { prev, next, prevEra, nextEra } = getAdjacentEvents(eventId);
  const isAr = locale === 'ar';

  const tBreadcrumb = await getTranslations({ locale, namespace: 'breadcrumb' });
  const tEvent = await getTranslations({ locale, namespace: 'event' });
  const tEra = await getTranslations({ locale, namespace: 'era.names' });

  const prevNav = prev
    ? {
        id: prev.id,
        title: isAr ? prev.titleArabic : prev.title,
        eraId: prevEra?.id ?? eraId,
      }
    : null;

  const nextNav = next
    ? {
        id: next.id,
        title: isAr ? next.titleArabic : next.title,
        eraId: nextEra?.id ?? eraId,
      }
    : null;

  const eventTitle = isAr ? event.titleArabic : event.title;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: eventTitle,
    description: event.summary.slice(0, 200),
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
    author: { '@type': 'Organization', name: 'Noor al-Seerah Project' },
    publisher: { '@type': 'Organization', name: 'Noor al-Seerah Project' },
    mainEntityOfPage: pageUrl(locale, `/era/${era.id}/${event.id}`),
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

  return (
    <main className="min-h-screen bg-parchment pb-24">
      <script type="application/ld+json">{articleJson}</script>
      <script type="application/ld+json">{breadcrumbJson}</script>
      <Container className="pt-6 sm:pt-8 md:pt-12">
        <Breadcrumb
          items={[
            { label: tBreadcrumb('home'), href: '/' },
            { label: tEra(eraId), href: `/era/${era.id}` },
            { label: eventTitle },
          ]}
        />

        <EventHero event={event} />

        {/* Long-form English fields (summary, significance, hadith translation) are hidden on /ar
            until human-authored Arabic versions exist in the JSON. The Arabic site keeps the
            event title, date, location, Quran verse text, key figures, and primary sources. */}
        {!isAr && (
          <>
            <Divider />
            <EventSummary summary={event.summary} />
            <Divider />
            <EventSignificance significance={event.significance} />
          </>
        )}

        {event.quranReferences.length > 0 && (
          <section className="my-8 md:my-12 max-w-prose mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-6">
              {tEvent('quranHeading')}
            </h2>
            <div className="space-y-6">
              {event.quranReferences.map((ref, index) => (
                <QuranVerse key={index} reference={ref} />
              ))}
            </div>
          </section>
        )}

        {!isAr && event.hadithReferences.length > 0 && (
          <section className="my-8 md:my-12 max-w-prose mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-6">
              {tEvent('hadithHeading')}
            </h2>
            <div className="space-y-6">
              {event.hadithReferences.map((ref, index) => (
                <HadithBlock key={index} reference={ref} />
              ))}
            </div>
          </section>
        )}

        <KeyFigures figures={event.keyFigures} />

        <PrimarySources sources={event.primarySources} />

        <Divider />

        <EventNav prev={prevNav} next={nextNav} />
      </Container>
    </main>
  );
}
