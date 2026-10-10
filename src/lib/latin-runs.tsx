import type { ReactNode } from 'react';

// A run of Latin-script words inside Arabic prose, such as a web address or the
// title of an English book. The lookbehind leaves hadith numbers like 1398a alone,
// where the trailing letter belongs to the number.
const LATIN_RUN = /((?<!\w)[A-Za-z][\w.'’-]*(?: [A-Za-z][\w.'’-]*)*)/;

// Marks each run as English and left to right, so screen readers switch voice for
// it and the bidi algorithm keeps its words in reading order.
export function markLatinRuns(text: string): ReactNode[] {
  return text.split(LATIN_RUN).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} lang="en" dir="ltr">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
