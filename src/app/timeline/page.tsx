import { getAllEras, getEventsByEra } from '@/lib/data';
import { Container } from '@/components/ui/Container';
import TimelineSpine from '@/components/timeline/TimelineSpine';
import TimelineEraSection from '@/components/timeline/TimelineEraSection';
import EraNav from '@/components/navigation/EraNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timeline',
  description:
    'Explore the complete timeline of the life of Prophet Muhammad \uFDFA across three eras.',
};

export default function TimelinePage() {
  const eras = getAllEras();

  // Build era data with cumulative startIndex so timeline nodes alternate correctly
  let runningIndex = 0;
  const eraSections = eras.map((era) => {
    const events = getEventsByEra(era.id);
    const startIndex = runningIndex;
    runningIndex += events.length;
    return { era, events, startIndex };
  });

  return (
    <main className="min-h-screen bg-parchment pb-24">
      {/* Page header */}
      <Container className="pt-16 pb-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink tracking-tight">
          The Timeline
        </h1>
        <p className="font-body text-base md:text-lg text-ink-light mt-4 max-w-xl mx-auto">
          49 events across three eras &mdash; from 571 CE to 632 CE
        </p>

        {/* Era quick-nav */}
        <div className="mt-8">
          <EraNav />
        </div>
      </Container>

      {/* Timeline spine with era sections */}
      <TimelineSpine>
        {eraSections.map(({ era, events, startIndex }) => (
          <TimelineEraSection
            key={era.id}
            era={era}
            events={events}
            startIndex={startIndex}
          />
        ))}
      </TimelineSpine>
    </main>
  );
}
