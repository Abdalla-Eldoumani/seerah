import type { Metadata } from 'next';
import Link from 'next/link';
import { getEraMetadata, getEventsByEra, getAllEras } from '@/lib/data';
import { generateEraMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Badge } from '@/components/ui/Badge';
import EraNav from '@/components/navigation/EraNav';
import { getCategoryLabel, getCategoryColor } from '@/lib/utils';
import type { EraId } from '@/types/seerah';

export function generateStaticParams() {
  return [
    { eraId: 'pre-prophethood' },
    { eraId: 'meccan' },
    { eraId: 'medinan' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eraId: string }>;
}): Promise<Metadata> {
  const { eraId } = await params;
  const era = getEraMetadata(eraId as EraId);
  return generateEraMetadata(era);
}

export default async function EraPage({
  params,
}: {
  params: Promise<{ eraId: string }>;
}) {
  const { eraId } = await params;
  const era = getEraMetadata(eraId as EraId);
  const events = getEventsByEra(eraId as EraId);

  return (
    <main className="min-h-screen bg-parchment pb-24">
      {/* Era header */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${era.themeColor}10, transparent)`,
        }}
      >
        <Container className="text-center space-y-6">
          {/* Arabic title */}
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-3xl md:text-4xl lg:text-5xl leading-relaxed"
            style={{ color: era.themeColor }}
          >
            {era.titleArabic}
          </p>

          {/* English title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight">
            {era.title}
          </h1>

          {/* Timespan */}
          <p className="font-body text-lg md:text-xl text-ink-light/70">
            {era.timespan}
            <span className="mx-2 text-gold" aria-hidden="true">
              &middot;
            </span>
            <span dir="rtl" lang="ar" className="font-arabic">
              {era.timespanHijri}
            </span>
          </p>

          {/* Description */}
          <p className="font-body text-base md:text-lg text-ink-light leading-relaxed max-w-2xl mx-auto">
            {era.description}
          </p>

          <Divider className="mt-8" />

          {/* Era navigation */}
          <div className="pt-4">
            <EraNav currentEra={eraId as EraId} />
          </div>
        </Container>
      </section>

      {/* Events grid */}
      <Container className="mt-8 md:mt-12">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-8 text-center">
          {events.length} Events in This Era
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => {
            const categoryLabel = getCategoryLabel(event.category);
            const categoryColor = getCategoryColor(event.category);
            const truncatedSummary =
              event.summary.length > 80
                ? event.summary.slice(0, 80) + '...'
                : event.summary;

            return (
              <Link
                key={event.id}
                href={`/era/${era.id}/${event.id}`}
                className="group block rounded-lg border border-parchment-dark hover:border-gold/50 bg-parchment hover:bg-parchment-dark/30 p-6 transition-all duration-200 hover:shadow-md"
              >
                {/* Arabic title */}
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-lg text-gold-dark/80 leading-relaxed mb-1"
                >
                  {event.titleArabic}
                </p>

                {/* English title */}
                <h3 className="font-display text-xl font-semibold text-ink group-hover:text-gold-dark transition-colors duration-200 mb-2">
                  {event.title}
                </h3>

                {/* Date and category */}
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <Badge variant="date">{event.yearCE}</Badge>
                  <Badge
                    variant="category"
                    style={{ backgroundColor: categoryColor }}
                  >
                    {categoryLabel}
                  </Badge>
                </div>

                {/* Truncated summary */}
                <p className="font-body text-sm text-ink-light/70 leading-relaxed">
                  {truncatedSummary}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
