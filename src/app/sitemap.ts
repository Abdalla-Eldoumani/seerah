import type { MetadataRoute } from 'next';
import { getAllEras, getEventsByEra } from '@/lib/data';
import { routing } from '@/i18n/routing';
import { pageUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const eras = getAllEras();
  const staticPaths = ['/', '/timeline', '/about'];
  const eraPaths = eras.map((era) => `/era/${era.id}`);
  const eventPaths = eras.flatMap((era) =>
    getEventsByEra(era.id).map((event) => `/era/${era.id}/${event.id}`)
  );

  return routing.locales.flatMap((locale) =>
    [...staticPaths, ...eraPaths, ...eventPaths].map((path) => ({
      url: pageUrl(locale, path),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, pageUrl(l, path)])
        ),
      },
    }))
  );
}
