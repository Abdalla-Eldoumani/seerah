import type { ReactNode } from 'react';

// Rich-text tag for a web address inside translated prose. A domain name stays in
// Latin script on every page, so on an Arabic page it is marked as its own
// left-to-right run in English: screen readers switch voice for it and the
// locale scanner reads the attribute as a deliberate exception.
export const rich = {
  domain: (chunks: ReactNode) => (
    <span lang="en" dir="ltr">
      {chunks}
    </span>
  ),
};
