import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 flex-wrap text-sm font-body text-ink-light/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {/* Separator */}
              {index > 0 && (
                <span className="text-ink-light/30" aria-hidden="true">
                  &gt;
                </span>
              )}

              {/* Breadcrumb link or current page label */}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'hover:text-gold-dark transition-colors duration-150',
                    'underline-offset-2 hover:underline'
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && 'text-ink-light/80')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
