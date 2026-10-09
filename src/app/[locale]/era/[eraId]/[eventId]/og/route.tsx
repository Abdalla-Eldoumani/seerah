import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { getAllEras, getEraMetadata, getEventById, getEventsByEra } from '@/lib/data';
import { formatEventDate } from '@/lib/dates';
import { localizedField } from '@/lib/localized';
import { routing, type Locale } from '@/i18n/routing';
import type { EraId } from '@/types/seerah';

// Rendered once per event and locale at build time, so no font is read at request time.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllEras().flatMap((era) =>
      getEventsByEra(era.id).map((event) => ({
        locale,
        eraId: era.id,
        eventId: event.id,
      }))
    )
  );
}

const FONT_DIR = path.join(process.cwd(), 'assets', 'fonts');

// The renderer cannot apply Amiri's Arabic substitution rules, so Arabic cards
// use Plex Sans Arabic and Latin cards use Amiri.
async function loadFont(locale: Locale) {
  const file = locale === 'ar' ? 'IBMPlexSansArabic-Bold.ttf' : 'Amiri-Bold.ttf';
  return {
    name: locale === 'ar' ? 'Plex Arabic' : 'Amiri',
    data: await readFile(path.join(FONT_DIR, file)),
    weight: 700 as const,
    style: 'normal' as const,
  };
}

// The renderer lays text out left to right and does not mirror brackets, so an
// Arabic line is handed over already in visual order: runs (a word, a number, a
// bracket, a comma) reversed, brackets swapped. Letters inside a run still join.
const BRACKETS: Record<string, string> = { '(': ')', ')': '(' };
const RUNS = /[\u0600-\u06FF\u0750-\u077F\uFDFA]+|[0-9\u0660-\u0669]+|[^\s]/g;

function visualOrder(line: string): string {
  const parts = line.split(' ').flatMap((word, i, all) => [
    ...(word.match(RUNS) ?? []).map((run) => BRACKETS[run] ?? run),
    ...(i < all.length - 1 ? [' '] : []),
  ]);
  return parts.reverse().join('');
}

function Text({ children, rtl }: { children: string; rtl: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      {rtl ? visualOrder(children) : children}
    </div>
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; eraId: string; eventId: string }> }
) {
  const { locale: rawLocale, eraId, eventId } = await params;
  const locale = rawLocale as Locale;
  const event = getEventById(eventId);
  const era = getEraMetadata(eraId as EraId);
  if (!event || !era) return new Response('Not found', { status: 404 });

  const rtl = locale === 'ar';
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const tEra = await getTranslations({ locale, namespace: 'era.names' });
  const title = localizedField(event, 'title', locale).text;
  const eraTitle = tEra(era.id);
  const date = formatEventDate(event, locale);

  const ink = '#14110a';
  const goldDark = '#7a5b13';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 32,
          background: '#f5efe0',
          fontFamily: rtl ? 'Plex Arabic' : 'Amiri',
        }}
      >
        <div style={{ display: 'flex', flex: 1, padding: 6, border: `2px solid ${goldDark}` }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '44px 64px',
              border: '1px solid #b88a2a',
            }}
          >
            <div
              style={{
                display: 'flex',
                color: goldDark,
                fontSize: 28,
                letterSpacing: rtl ? 0 : 4,
                textTransform: rtl ? 'none' : 'uppercase',
              }}
            >
              <Text rtl={rtl}>{eraTitle}</Text>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  color: ink,
                  fontSize: title.length > (rtl ? 24 : 40) ? 58 : 72,
                  lineHeight: rtl ? 1.5 : 1.12,
                }}
              >
                <Text rtl={rtl}>{title}</Text>
              </div>
              <div style={{ display: 'flex', color: '#5e5641', fontSize: 30 }}>
                <Text rtl={rtl}>{date}</Text>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: goldDark, fontSize: 30 }}>
              <div style={{ width: 56, height: 2, background: goldDark }} />
              <Text rtl={rtl}>{tSite('name')}</Text>
              <div style={{ width: 56, height: 2, background: goldDark }} />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [await loadFont(locale)],
    }
  );
}
