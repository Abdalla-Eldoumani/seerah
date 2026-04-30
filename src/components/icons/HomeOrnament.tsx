import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Khatim sulayman: a classical eight-point star formed by two overlapping squares.
// Drawn as a single-colour line construction so the surrounding palette controls weight.
export function HomeOrnament({ className, ...rest }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="presentation"
      aria-hidden="true"
      className={cn('w-20 h-20', className)}
      fill="none"
      stroke="currentColor"
      {...rest}
    >
      {/* Outer guideline circle, hairline */}
      <circle cx="50" cy="50" r="46" strokeWidth="0.3" opacity="0.4" />
      {/* Eight-point star: two overlapping squares */}
      <rect
        x="14"
        y="14"
        width="72"
        height="72"
        strokeWidth="0.6"
      />
      <rect
        x="14"
        y="14"
        width="72"
        height="72"
        transform="rotate(45 50 50)"
        strokeWidth="0.6"
      />
      {/* Inner octagon */}
      <polygon
        points="50,28 65,34 71,50 65,66 50,72 35,66 29,50 35,34"
        strokeWidth="0.6"
      />
      {/* Eight radii from inner octagon vertices to centre */}
      <path
        d="M50 50 L50 28 M50 50 L65 34 M50 50 L71 50 M50 50 L65 66 M50 50 L50 72 M50 50 L35 66 M50 50 L29 50 M50 50 L35 34"
        strokeWidth="0.3"
        opacity="0.6"
      />
      {/* Centre point */}
      <circle cx="50" cy="50" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
