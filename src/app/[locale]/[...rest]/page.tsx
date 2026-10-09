import { notFound } from 'next/navigation';

// Unmatched URLs under a locale resolve here so the 404 renders inside the
// locale layout, in the reader's language, with a real 404 status.
export default function CatchAllNotFound() {
  notFound();
}
