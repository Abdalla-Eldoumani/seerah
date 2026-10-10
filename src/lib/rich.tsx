import type { ReactNode } from 'react';

// Rich-text tags for Latin-script names inside translated prose. On an Arabic
// page a web address or the name of a translation stays in Latin script, so each
// is marked as its own left-to-right run in the language it belongs to: screen
// readers switch voice for it, and the locale scanner reads the attribute as a
// deliberate exception.
export const rich = {
  en: (chunks: ReactNode) => (
    <span lang="en" dir="ltr">
      {chunks}
    </span>
  ),
  fr: (chunks: ReactNode) => (
    <span lang="fr" dir="ltr">
      {chunks}
    </span>
  ),
};
