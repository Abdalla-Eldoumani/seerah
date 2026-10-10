import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ERA_IDS, type EraId } from '@/types/seerah';

interface EraNavProps {
  currentEra?: EraId;
}

export default function EraNav({ currentEra }: EraNavProps) {
  const t = useTranslations('era');

  return (
    <nav aria-label={t('navLabel')}>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {ERA_IDS.map((id) => {
          const isActive = currentEra === id;
          return (
            <li key={id}>
              <Link
                href={`/era/${id}`}
                className={cn(
                  'inline-flex min-h-11 items-center border-b-2 font-display text-lg font-bold transition-colors',
                  isActive
                    ? 'border-terracotta text-ink'
                    : 'border-transparent text-ink-light hover:text-terracotta'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {t(`names.${id}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
