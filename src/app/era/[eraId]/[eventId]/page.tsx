import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllEvents,
  getEventById,
  getEraMetadata,
  getAdjacentEvents,
  getEraIdForEvent,
  getAllEras,
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

export function generateStaticParams() {
  const eras = getAllEras();
  const params: { eraId: string; eventId: string }[] = [];

  for (const era of eras) {
    const events = getEventsByEra(era.id);
    for (const event of events) {
      params.push({ eraId: era.id, eventId: event.id });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eraId: string; eventId: string }>;
}): Promise<Metadata> {
  const { eventId } = await params;
  const event = getEventById(eventId);
  if (!event) return {};
  return generateEventMetadata(event);
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ eraId: string; eventId: string }>;
}) {
  const { eraId, eventId } = await params;
  const event = getEventById(eventId);

  if (!event) {
    notFound();
  }

  const era = getEraMetadata(eraId as EraId);
  const { prev, next, prevEra, nextEra } = getAdjacentEvents(eventId);

  const prevNav = prev
    ? {
        id: prev.id,
        title: prev.title,
        eraId: prevEra?.id ?? eraId,
      }
    : null;

  const nextNav = next
    ? {
        id: next.id,
        title: next.title,
        eraId: nextEra?.id ?? eraId,
      }
    : null;

  return (
    <main className="min-h-screen bg-parchment pb-24">
      <Container className="pt-8 md:pt-12">
        {/* Breadcrumb navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: era.title, href: `/era/${era.id}` },
            { label: event.title },
          ]}
        />

        {/* Event hero section */}
        <EventHero event={event} />

        <Divider />

        {/* Summary */}
        <EventSummary summary={event.summary} />

        <Divider />

        {/* Significance */}
        <EventSignificance significance={event.significance} />

        {/* Quran references */}
        {event.quranReferences.length > 0 && (
          <section className="my-8 md:my-12 max-w-prose mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-6">
              Quran References
            </h2>
            <div className="space-y-6">
              {event.quranReferences.map((ref, index) => (
                <QuranVerse key={index} reference={ref} />
              ))}
            </div>
          </section>
        )}

        {/* Hadith references */}
        {event.hadithReferences.length > 0 && (
          <section className="my-8 md:my-12 max-w-prose mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-6">
              Hadith References
            </h2>
            <div className="space-y-6">
              {event.hadithReferences.map((ref, index) => (
                <HadithBlock key={index} reference={ref} />
              ))}
            </div>
          </section>
        )}

        {/* Key figures */}
        <KeyFigures figures={event.keyFigures} />

        {/* Primary sources */}
        <PrimarySources sources={event.primarySources} />

        <Divider />

        {/* Previous / Next navigation */}
        <EventNav prev={prevNav} next={nextNav} />
      </Container>
    </main>
  );
}
