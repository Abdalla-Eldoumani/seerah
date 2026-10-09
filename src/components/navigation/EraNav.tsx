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
    <nav aria-label={t('navLabel')} className="flex justify-center">
      <ul className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap justify-center">
        {ERA_IDS.map((id) => {
          const isActive = currentEra === id;
          return (
            <li key={id}>
              <Link
                href={`/era/${id}`}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-sm px-4 text-sm font-display transition-colors md:text-base',
                  isActive
                    ? 'bg-gold text-ink'
                    : 'text-ink-light hover:bg-parchment-dark hover:text-ink'
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
