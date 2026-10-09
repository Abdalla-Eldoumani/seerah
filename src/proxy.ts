import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // A dot means a file (sitemap.xml, robots.txt, icon.svg), not a page. Matching
  // them rewrote them into the [locale] segment and they returned 404.
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
