import { cn } from '@/lib/utils';

interface DividerProps {
  // The ringed marker is reserved for one break per page; every other break is a rule.
  ornament?: boolean;
  className?: string;
}

export function Divider({ ornament = false, className }: DividerProps) {
  if (!ornament) {
    return <hr className={cn('my-10 h-px border-0 bg-line', className)} />;
  }

  return (
    <div
      className={cn('my-10 flex items-center gap-3', className)}
      aria-hidden="true"
    >
      <span className="route-dashes-x flex-1" />
      <span className="block size-3 rounded-full border-2 border-terracotta" />
      <span className="route-dashes-x flex-1" />
    </div>
  );
}
