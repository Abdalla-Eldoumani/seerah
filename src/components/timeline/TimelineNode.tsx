import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getCategoryLabel, getCategoryColor } from '@/lib/utils';
import type { SeerahEvent, EraId } from '@/types/seerah';

interface TimelineNodeProps {
  event: SeerahEvent;
  eraId: EraId;
  index: number;
}

export default function TimelineNode({ event, eraId, index }: TimelineNodeProps) {
  const isEven = index % 2 === 0;
  const categoryLabel = getCategoryLabel(event.category);
  const categoryColor = getCategoryColor(event.category);

  // Truncate summary to ~100 characters at the nearest word boundary
  const truncatedSummary =
    event.summary.length > 100
      ? event.summary.slice(0, 100).replace(/\s+\S*$/, '') + '...'
      : event.summary;

  return (
    <div
      className={cn(
        'relative mb-10 md:mb-14',
        // On mobile: always left-aligned with padding for the spine dot
        'pl-12 md:pl-0',
        // On desktop: alternate sides
        'md:flex',
        isEven ? 'md:justify-start' : 'md:justify-end'
      )}
    >
      {/* The dot on the spine */}
      <div
        className={cn(
          'absolute z-10',
          // Mobile: aligned to left spine
          'left-[18px] top-2',
          // Desktop: centered on spine
          'md:left-1/2 md:-translate-x-1/2 md:top-4'
        )}
      >
        <div
          className="h-4 w-4 rounded-full border-2 border-gold bg-parchment shadow-sm"
          aria-hidden="true"
        />
      </div>

      {/* Content card */}
      <Link
        href={`/era/${eraId}/${event.id}`}
        className={cn(
          'block group',
          // Card sizing - takes up roughly half width on desktop
          'w-full md:w-[calc(50%-2rem)]',
          // Card styling
          'rounded-lg border border-parchment-dark bg-parchment/80 p-5',
          'shadow-sm hover:shadow-md transition-shadow duration-200',
          'hover:border-gold/50'
        )}
      >
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-body uppercase tracking-wider"
            style={{ color: categoryColor }}
          >
            {categoryLabel}
          </span>
        </div>

        {/* Event title */}
        <h3 className="font-display text-lg md:text-xl text-ink leading-snug group-hover:text-gold-dark transition-colors">
          {event.title}
        </h3>

        {/* Arabic title */}
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-base text-ink-light/70 mt-1"
        >
          {event.titleArabic}
        </p>

        {/* Date */}
        <p className="text-sm font-body text-ink-light/80 mt-2">
          {event.year} &middot; {event.yearCE}
        </p>

        {/* Truncated summary */}
        <p className="text-sm font-body text-ink-light leading-relaxed mt-3">
          {truncatedSummary}
        </p>

        {/* Location */}
        {event.location && (
          <p className="text-xs font-body text-ink-light/60 mt-3">
            {event.location}
          </p>
        )}
      </Link>
    </div>
  );
}
