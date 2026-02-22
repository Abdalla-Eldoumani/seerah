import { cn } from '@/lib/utils';
import { getCategoryLabel, getCategoryColor } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/types/seerah';
import type { SeerahEvent } from '@/types/seerah';

interface EventHeroProps {
  event: SeerahEvent;
}

export default function EventHero({ event }: EventHeroProps) {
  const categoryLabel = getCategoryLabel(event.category);
  const categoryColor = getCategoryColor(event.category);
  const categoryIcon = CATEGORY_ICONS[event.category];

  return (
    <header className="text-center py-12 md:py-16 lg:py-20 space-y-6">
      {/* Arabic title */}
      <p
        dir="rtl"
        lang="ar"
        className="font-arabic text-3xl md:text-4xl lg:text-5xl text-gold-dark leading-relaxed"
      >
        {event.titleArabic}
      </p>

      {/* English title */}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight text-balance">
        {event.title}
      </h1>

      {/* Date line */}
      <p className="text-lg md:text-xl text-ink-light/70 font-body mx-auto">
        {event.month}, {event.year} ({event.yearCE})
      </p>

      {/* Location with Arabic */}
      <p className="text-base md:text-lg text-ink-light/60 font-body mx-auto">
        {event.location}
        {event.locationArabic && (
          <>
            {' — '}
            <span dir="rtl" lang="ar" className="font-arabic">
              {event.locationArabic}
            </span>
          </>
        )}
      </p>

      {/* Category badge */}
      <div className="flex justify-center">
        <span
          className={cn(
            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide',
            'text-parchment'
          )}
          style={{ backgroundColor: categoryColor }}
        >
          <span aria-hidden="true">{categoryIcon}</span>
          {categoryLabel}
        </span>
      </div>
    </header>
  );
}
