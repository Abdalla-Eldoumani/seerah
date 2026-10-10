import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface EventNavLink {
  id: string;
  title: string;
  eraId: string;
}

interface EventNavProps {
  prev: EventNavLink | null;
  next: EventNavLink | null;
}

const arrowClass = 'size-5 shrink-0 text-terracotta rtl:scale-x-[-1]';
const linkClass = cn(
  'group flex min-h-11 items-center gap-3 rounded-sm p-4 transition-colors',
  'hover:bg-surface'
);

export default function EventNav({ prev, next }: EventNavProps) {
  const t = useTranslations('event');

  return (
    <nav
      aria-label={t('navPrev') + ' / ' + t('navNext')}
      className="mt-12 grid gap-2 border-t border-line pt-6 sm:grid-cols-2 sm:gap-4"
    >
      <div className="min-w-0">
        {prev && (
          <Link href={`/era/${prev.eraId}/${prev.id}`} className={linkClass}>
            <svg
              className={arrowClass}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="min-w-0">
              <span className="place-label block">{t('navPrev')}</span>
              <span className="block font-display text-lg font-bold text-ink">{prev.title}</span>
            </span>
          </Link>
        )}
      </div>

      <div className="min-w-0">
        {next && (
          <Link
            href={`/era/${next.eraId}/${next.id}`}
            className={cn(linkClass, 'justify-end text-end')}
          >
            <span className="min-w-0">
              <span className="place-label block">{t('navNext')}</span>
              <span className="block font-display text-lg font-bold text-ink">{next.title}</span>
            </span>
            <svg
              className={arrowClass}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
}
