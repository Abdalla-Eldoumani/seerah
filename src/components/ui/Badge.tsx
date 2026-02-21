import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'category' | 'date' | 'source';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-parchment-dark text-ink-light border border-gold/30',
  category:
    'text-parchment border border-transparent font-medium',
  date:
    'bg-transparent text-gold-dark border border-gold/40 font-display',
  source:
    'bg-parchment-dark text-ink-light border border-ink/10 italic',
};

export function Badge({
  children,
  variant = 'default',
  className,
  style,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-0.5 text-xs tracking-wide',
        variantStyles[variant],
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}
