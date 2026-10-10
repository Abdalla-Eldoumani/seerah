import type { CSSProperties } from 'react';
import type { EraMetadata } from '@/types/seerah';

// The two colours an era band reads from its data: --era is the solid strip,
// --era-accent tints the band and colours the stops on the route. The classes
// that use them live in the stylesheet.
export function eraStyle(era: EraMetadata): CSSProperties {
  return { '--era': era.themeColor, '--era-accent': era.accentColor } as CSSProperties;
}
