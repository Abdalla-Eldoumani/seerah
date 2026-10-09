import { cn } from '@/lib/utils';

interface DividerProps {
  // The diamond is reserved for one break per page; every other break is a rule.
  ornament?: boolean;
  className?: string;
}

export function Divider({ ornament = false, className }: DividerProps) {
  if (!ornament) {
    return <hr className={cn('my-10 h-px border-0 bg-gold/30', className)} />;
  }

  return (
    <div
      className={cn('my-10 flex items-center gap-4', className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-gold-dark/60" />
      <span className="relative block size-3 rotate-45 border border-gold-dark">
        <span className="absolute inset-[3px] bg-gold-dark" />
      </span>
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-gold-dark/60" />
    </div>
  );
}
