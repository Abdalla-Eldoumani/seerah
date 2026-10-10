import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const t = useTranslations('breadcrumb');

  return (
    <nav aria-label={t('label')}>
      <ol className="flex items-center gap-1.5 flex-wrap font-body text-[0.9375rem] text-ink-soft">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <svg
                  className="h-3.5 w-3.5 text-route rtl:scale-x-[-1]"
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
              )}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex min-h-11 items-center transition-colors hover:text-terracotta',
                    'underline-offset-2 hover:underline'
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && 'text-ink-light')}
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
