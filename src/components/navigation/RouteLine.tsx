import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

// One stop on the route, as a fraction of its length.
interface RouteMark {
  at: number;
  color?: string;
}

interface RouteLineProps {
  marks?: RouteMark[];
  className?: string;
}

// The line between Makkah and Madinah, where the story runs from one to the
// other. It is a drawing, so only the two names are exposed to assistive
// technology; any caption for a mark sits beside it as text.
export default function RouteLine({ marks = [], className }: RouteLineProps) {
  const t = useTranslations('route');

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="place-label">{t('from')}</span>
      <span className="relative flex h-3 flex-1 items-center" aria-hidden="true">
        <span className="route-dashes-x block w-full" />
        {marks.map((mark) => (
          <span
            key={mark.at}
            className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 bg-ground"
            style={{
              insetInlineStart: `calc(${mark.at * 100}% - 0.375rem)`,
              borderColor: mark.color ?? 'var(--color-terracotta)',
            }}
          />
        ))}
      </span>
      <span className="place-label">{t('to')}</span>
    </div>
  );
}
