import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-4 my-8', className)}
      role="separator"
      aria-hidden="true"
    >
      {/* Left line */}
      <div
        className="flex-1 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-gold), var(--color-gold))',
        }}
      />

      {/* Center diamond ornament */}
      <div className="relative flex items-center justify-center">
        {/* Outer diamond */}
        <div
          className="w-3 h-3 rotate-45 border border-gold"
          style={{ borderColor: 'var(--color-gold)' }}
        />
        {/* Inner dot */}
        <div
          className="absolute w-1.5 h-1.5 rotate-45"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />
      </div>

      {/* Right line */}
      <div
        className="flex-1 h-px"
        style={{
          background:
            'linear-gradient(to left, transparent, var(--color-gold), var(--color-gold))',
        }}
      />
    </div>
  );
}
