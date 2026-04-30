import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { EraId } from '@/types/seerah';

interface EraNavProps {
  currentEra?: EraId;
}

const ERA_IDS: EraId[] = ['pre-prophethood', 'meccan', 'medinan'];

export default function EraNav({ currentEra }: EraNavProps) {
  const t = useTranslations('era.names');

  return (
    <nav aria-label="Era navigation" className="flex justify-center">
      <ul className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap justify-center">
        {ERA_IDS.map((id) => {
          const isActive = currentEra === id;
          return (
            <li key={id}>
              <Link
                href={`/era/${id}`}
                className={cn(
                  'inline-block px-4 py-2.5 rounded-md text-sm sm:text-sm md:text-base font-display transition-colors duration-200',
                  isActive
                    ? 'bg-gold text-ink shadow-sm'
                    : 'text-ink-light hover:bg-parchment-dark hover:text-ink'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {t(id)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
