import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { EraId } from '@/types/seerah';

interface EraNavProps {
  currentEra?: EraId;
}

const ERA_LINKS: { id: EraId; label: string; href: string }[] = [
  {
    id: 'pre-prophethood',
    label: 'Before the Light',
    href: '/era/pre-prophethood',
  },
  {
    id: 'meccan',
    label: 'The Light in the Darkness',
    href: '/era/meccan',
  },
  {
    id: 'medinan',
    label: 'The Dawn of a Civilization',
    href: '/era/medinan',
  },
];

export default function EraNav({ currentEra }: EraNavProps) {
  return (
    <nav aria-label="Era navigation" className="flex justify-center">
      <ul className="flex items-center gap-1 md:gap-2 flex-wrap justify-center">
        {ERA_LINKS.map((era) => {
          const isActive = currentEra === era.id;
          return (
            <li key={era.id}>
              <Link
                href={era.href}
                className={cn(
                  'inline-block px-4 py-2 rounded-md text-sm md:text-base font-display transition-colors duration-200',
                  isActive
                    ? 'bg-gold text-ink shadow-sm'
                    : 'text-ink-light hover:bg-parchment-dark hover:text-ink'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {era.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
