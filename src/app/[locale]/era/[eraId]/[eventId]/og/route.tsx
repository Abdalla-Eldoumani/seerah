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
// use Plex Sans Arabic. Latin cards use Alegreya, the site's display face, with
// Amiri behind it for the salaat-ala-nabi symbol, which Alegreya lacks. The
// renderer reads TTF, OTF and WOFF but not WOFF2 or variable fonts.
async function loadFonts(locale: Locale) {
  const read = (file: string) => readFile(path.join(FONT_DIR, file));
  const bold = { weight: 700 as const, style: 'normal' as const };
  if (locale === 'ar') {
    return [{ name: 'Plex Arabic', data: await read('IBMPlexSansArabic-Bold.ttf'), ...bold }];
  }
  return [
    { name: 'Alegreya', data: await read('Alegreya-Bold.woff'), ...bold },
    { name: 'Amiri', data: await read('Amiri-Bold.ttf'), ...bold },
  ];
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

// The renderer measures Arabic letters in their unjoined forms, so a line is a
// little wider than it paints. Left-aligned Latin is exact; Arabic is centred so
// the error splits across both sides instead of leaving a ragged right edge.
function Text({ children, rtl }: { children: string; rtl: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: rtl ? 'center' : 'flex-start' }}>
      {rtl ? visualOrder(children) : children}
    </div>
  );
}

const SAND = '#f2ead7';
const INK = '#1c1913';
const INK_SOFT = '#5b5343';
const TERRACOTTA = '#8f3b25';
const ON_ERA = '#f8f1e0';
const ROUTE = '#8a7a58';

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

  const place = localizedField(event, 'location', locale).text;
  const align = rtl ? 'center' : 'flex-start';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: SAND,
          fontFamily: rtl ? 'Plex Arabic' : 'Alegreya, Amiri',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: align,
            padding: '30px 72px',
            background: era.themeColor,
            color: ON_ERA,
            fontSize: 32,
            letterSpacing: rtl ? 0 : 3,
            textTransform: rtl ? 'none' : 'uppercase',
          }}
        >
          <Text rtl={rtl}>{eraTitle}</Text>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: align,
            gap: 20,
            padding: '0 72px',
          }}
        >
          {place && (
            <div
              style={{
                display: 'flex',
                color: TERRACOTTA,
                fontSize: 28,
                letterSpacing: rtl ? 0 : 4,
                textTransform: rtl ? 'none' : 'uppercase',
              }}
            >
              <Text rtl={rtl}>{place}</Text>
            </div>
          )}
          <div
            style={{
              display: 'flex',
              color: INK,
              fontSize: title.length > (rtl ? 24 : 36) ? 64 : 80,
              lineHeight: rtl ? 1.5 : 1.1,
            }}
          >
            <Text rtl={rtl}>{title}</Text>
          </div>
          <div style={{ display: 'flex', color: INK_SOFT, fontSize: 34 }}>
            <Text rtl={rtl}>{date}</Text>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: rtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: 24,
            padding: '0 72px 44px',
            color: TERRACOTTA,
            fontSize: 32,
          }}
        >
          <Text rtl={rtl}>{tSite('name')}</Text>
          <div style={{ flex: 1, height: 0, borderTop: `3px dashed ${ROUTE}` }} />
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              border: `4px solid ${era.accentColor}`,
              background: SAND,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: await loadFonts(locale),
    }
  );
}
