import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EventNavLink {
  id: string;
  title: string;
  eraId: string;
}

interface EventNavProps {
  prev: EventNavLink | null;
  next: EventNavLink | null;
}

export default function EventNav({ prev, next }: EventNavProps) {
  return (
    <nav
      aria-label="Event navigation"
      className={cn(
        'flex items-stretch gap-4 mt-12 pt-8',
        'border-t border-parchment-dark'
      )}
    >
      {/* Previous event */}
      <div className="flex-1 min-w-0">
        {prev ? (
          <Link
            href={`/era/${prev.eraId}/${prev.id}`}
            className={cn(
              'group flex items-center gap-3 p-4 rounded-lg',
              'hover:bg-parchment-dark/50 transition-colors duration-200'
            )}
          >
            <span
              className="text-xl text-gold group-hover:text-gold-dark transition-colors shrink-0"
              aria-hidden="true"
            >
              &larr;
            </span>
            <div className="min-w-0">
              <span className="block text-xs font-body text-ink-light/60 uppercase tracking-wider">
                Previous
              </span>
              <span className="block text-sm md:text-base font-display text-ink truncate group-hover:text-gold-dark transition-colors">
                {prev.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Next event */}
      <div className="flex-1 min-w-0">
        {next ? (
          <Link
            href={`/era/${next.eraId}/${next.id}`}
            className={cn(
              'group flex items-center justify-end gap-3 p-4 rounded-lg text-right',
              'hover:bg-parchment-dark/50 transition-colors duration-200'
            )}
          >
            <div className="min-w-0">
              <span className="block text-xs font-body text-ink-light/60 uppercase tracking-wider">
                Next
              </span>
              <span className="block text-sm md:text-base font-display text-ink truncate group-hover:text-gold-dark transition-colors">
                {next.title}
              </span>
            </div>
            <span
              className="text-xl text-gold group-hover:text-gold-dark transition-colors shrink-0"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
