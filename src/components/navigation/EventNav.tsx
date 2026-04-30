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

export default function EventNav({ prev, next }: EventNavProps) {
  const t = useTranslations('event');

  return (
    <nav
      aria-label={t('navPrev') + ' / ' + t('navNext')}
      className={cn(
        'flex items-stretch gap-4 mt-12 pt-8',
        'border-t border-parchment-dark'
      )}
    >
      <div className="flex-1 min-w-0">
        {prev ? (
          <Link
            href={`/era/${prev.eraId}/${prev.id}`}
            className={cn(
              'group flex items-center gap-3 p-4 rounded-lg',
              'hover:bg-parchment-dark/50 transition-colors duration-200'
            )}
          >
            <svg
              className="w-5 h-5 text-gold group-hover:text-gold-dark transition-colors shrink-0 rtl:scale-x-[-1]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <div className="min-w-0">
              <span className="block text-xs font-body text-ink-light/60 uppercase tracking-wider">
                {t('navPrev')}
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
                {t('navNext')}
              </span>
              <span className="block text-sm md:text-base font-display text-ink truncate group-hover:text-gold-dark transition-colors">
                {next.title}
              </span>
            </div>
            <svg
              className="w-5 h-5 text-gold group-hover:text-gold-dark transition-colors shrink-0 rtl:scale-x-[-1]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
