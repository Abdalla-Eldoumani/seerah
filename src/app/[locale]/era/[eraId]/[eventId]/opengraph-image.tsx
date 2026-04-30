import { ImageResponse } from 'next/og';
import { getEventById, getEraMetadata } from '@/lib/data';
import { formatEventDate } from '@/lib/dates';
import { getAllEras, getEventsByEra } from '@/lib/data';
import { routing, type Locale } from '@/i18n/routing';
import type { EraId } from '@/types/seerah';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export const alt = 'Noor al-Seerah event';

export function generateImageMetadata() {
  return [{ id: 'og', alt }];
}

export function generateStaticParams() {
  const eras = getAllEras();
  const params: { locale: string; eraId: string; eventId: string }[] = [];
  for (const locale of routing.locales) {
    for (const era of eras) {
      for (const event of getEventsByEra(era.id)) {
        params.push({ locale, eraId: era.id, eventId: event.id });
      }
    }
  }
  return params;
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; eraId: string; eventId: string }>;
}) {
  const { locale, eraId, eventId } = await params;
  const event = getEventById(eventId);
  if (!event) {
    return new ImageResponse(
      <div style={{ display: 'flex' }}>Not found</div>,
      size
    );
  }
  const era = getEraMetadata(eraId as EraId);
  const isAr = locale === 'ar';
  const title = isAr ? event.titleArabic : event.title;
  const eraTitle = isAr ? era.titleArabic : era.title;
  const dateLine = formatEventDate(event, locale as Locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#f5efe0',
          color: '#14110a',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#7a5b13',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ width: 60, height: 1, background: '#7a5b13' }} />
          <span>{eraTitle}</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.1,
              fontWeight: 600,
              maxWidth: 1000,
              direction: isAr ? 'rtl' : 'ltr',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#5e5641',
            }}
          >
            {dateLine}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#7a5b13',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
          }}
        >
          <span>Noor al-Seerah</span>
          <div style={{ width: 80, height: 1, background: '#7a5b13' }} />
        </div>
      </div>
    ),
    size
  );
}
