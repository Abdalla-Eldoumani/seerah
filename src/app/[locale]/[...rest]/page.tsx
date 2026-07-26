import type { Metadata } from 'next';
import LocaleNotFound from '../not-found';

// Unmatched URLs under a locale land here so the reader gets a page in their own
// language with the site chrome around it, rather than the English fallback at
// src/app/not-found.tsx. It renders the view directly instead of calling
// `notFound()`: that resolves to the root boundary, which sits above the locale
// provider, and localizing there turns every prerendered route into a
// server-rendered one. A helpful page on a mistyped URL is not worth making
// every real page slower, so this route is `noindex` instead.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function CatchAllNotFound() {
  return <LocaleNotFound />;
}
