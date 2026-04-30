import type { MetadataRoute } from 'next';
import { getAllEras, getEventsByEra } from '@/lib/data';
import { routing } from '@/i18n/routing';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noor-al-seerah.vercel.app';

function localePath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return path === '/' ? '/' : path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

function alternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${SITE_URL}${localePath(locale, path)}`,
    ])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const eras = getAllEras();
  const staticPaths = ['/', '/timeline', '/about'];
  const eraPaths = eras.map((era) => `/era/${era.id}`);
  const eventPaths = eras.flatMap((era) =>
    getEventsByEra(era.id).map((event) => `/era/${era.id}/${event.id}`)
  );

  const allPaths = [...staticPaths, ...eraPaths, ...eventPaths];
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified,
      alternates: { languages: alternates(path) },
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : path === '/timeline' ? 0.8 : 0.7,
    }))
  );
}
