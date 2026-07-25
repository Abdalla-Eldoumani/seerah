import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Anything with a dot in it is a file, not a page: sitemap.xml, robots.txt,
  // opengraph images. Without that exclusion the middleware rewrote them into
  // the [locale] segment and both /sitemap.xml and /robots.txt returned 404.
  matcher: ['/((?!_next|api|patterns|images|fonts|.*\\..*).*)'],
};
