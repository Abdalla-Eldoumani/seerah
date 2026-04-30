import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { getCategoryGlyph, type GlyphId } from '@/config/categories';
import type { EventCategory } from '@/types/seerah';

interface CategoryGlyphProps extends Omit<ComponentProps<'svg'>, 'children'> {
  category: EventCategory;
}

const GLYPHS: Record<GlyphId, ReactNode> = {
  beginning: (
    <>
      <path
        d="M12 21V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 11C9 11 6.5 8.5 6.5 5.5C9.5 5.5 12 8 12 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 11C15 11 17.5 8.5 17.5 5.5C14.5 5.5 12 8 12 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  spiritual: (
    <path
      d="M16.5 4.5C13 4.5 9.5 8 9.5 12C9.5 16 13 19.5 16.5 19.5C13.5 18.5 11.5 15.5 11.5 12C11.5 8.5 13.5 5.5 16.5 4.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  society: (
    <>
      <circle
        cx="9"
        cy="12"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="15"
        cy="12"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </>
  ),
  loss: (
    <>
      <path
        d="M12 3.5C12 6.5 14.5 8 14.5 11.5C14.5 14 13.25 16 12 16C10.75 16 9.5 14 9.5 11.5C9.5 8 12 6.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 18.5h6M10 20.5h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  conflict: (
    <>
      <path
        d="M5 5L11 11M19 5L13 11M5 19L11 13M19 19L13 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="12"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </>
  ),
  movement: (
    <>
      <path
        d="M3.5 12h12M14 8.5L17.5 12L14 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="20"
        cy="12"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </>
  ),
  establishment: (
    <>
      <path
        d="M7 6h10M7 18h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 6v12M15 6v12M12 6v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  conquest: (
    <>
      <path
        d="M5 20V12C5 8.5 8 5.5 12 5.5C16 5.5 19 8.5 19 12V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M5 20h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 20v-6M15 20v-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  pilgrimage: (
    <>
      <rect
        x="6"
        y="8.5"
        width="12"
        height="11"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M6 12.5h12"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <path
        d="M9 8.5V6M15 8.5V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  manuscript: (
    <>
      <path
        d="M6.5 4h9c1.1 0 2 0.9 2 2v12c0 1.1-0.9 2-2 2h-7c-1.1 0-2-0.9-2-2V4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 8h6M9 12h6M9 16h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
};

export function CategoryGlyph({ category, className, ...rest }: CategoryGlyphProps) {
  const glyphId = getCategoryGlyph(category);
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('w-5 h-5', className)}
      role="presentation"
      aria-hidden="true"
      fill="none"
      {...rest}
    >
      {GLYPHS[glyphId]}
    </svg>
  );
}
