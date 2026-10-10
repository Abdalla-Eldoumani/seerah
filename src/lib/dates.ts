// Locale-aware formatting for Hijri and Gregorian dates.
// On Arabic, Hijri month names render in Arabic and digits are Eastern.
// English keeps the source strings from the JSON. The JSON itself is never mutated.

import type { Locale } from '@/i18n/routing';
import type { EraMetadata, SeerahEvent } from '@/types/seerah';
import { localizeMonth } from '@/config/names';

const EASTERN_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toEasternDigits(input: string): string {
  return input.replace(/\d/g, (d) => EASTERN_DIGITS[Number(d)]);
}

// Era markers are dropped by token, not by substitution. The stored values are
// irregular ("12 BH – 1 AH", "44 BH onwards", "610 CE – 622 CE"), and pattern
// replacement silently left markers in place here more than once.
const ERA_TOKENS = new Set(['bh', 'ah', 'ce', 'ad', 'onwards']);

function stripEraTokens(value: string): string {
  return value
    .split(/\s+/)
    .filter((token) => token && !ERA_TOKENS.has(token.toLowerCase()))
    .join(' ')
    .trim();
}

// A leading "c." marks a date the sources do not settle. It is peeled off first
// and put back as a word, so the digits and era marker format exactly as they
// do for a firm date.
const APPROX_PREFIX = /^c\.\s*/i;
const APPROX_WORD: Record<Locale, string> = { en: 'c.', ar: 'نحو', fr: 'vers' };

function splitApprox(value: string): { approx: boolean; rest: string } {
  const approx = APPROX_PREFIX.test(value);
  return { approx, rest: approx ? value.replace(APPROX_PREFIX, '') : value };
}

function withApprox(approx: boolean, text: string, locale: Locale): string {
  return approx ? `${APPROX_WORD[locale]} ${text}` : text;
}

// Every stored month, qualifiers included ("Ramadan (17th or 21st)", "12 Rabi'
// al-Awwal (Monday)"), has its own registry entry, because substituting word by
// word leaves the English connective behind. verify-names fails the build on a
// month that is missing.
function localizeHijriMonth(monthString: string, locale: Locale): string {
  if (locale === 'en' || !monthString) return monthString;
  const localized = localizeMonth(monthString, locale);
  return locale === 'ar' ? toEasternDigits(localized) : localized;
}

// Convert a stored Hijri year string (e.g., "9-7 BH" or "1 AH") to its
// locale display. Arabic gets Eastern digits and ق.هـ / هـ suffixes.
function localizeHijriYear(yearString: string, locale: Locale): string {
  if (!yearString) return '';
  if (locale === 'en') return yearString;
  // The era marker is not always trailing: values like "44 BH onwards" exist,
  // so anchoring the match to the end leaves it in place.
  const { approx, rest } = splitApprox(yearString);
  const isBeforeHijra = /BH/i.test(rest);
  const continues = /\bonwards\b/i.test(rest);
  const numeric = stripEraTokens(rest);

  if (locale === 'ar') {
    const suffix = isBeforeHijra ? 'ق.هـ' : 'هـ';
    const text = `${toEasternDigits(numeric)} ${suffix}${continues ? ' فما بعدها' : ''}`;
    return withApprox(approx, text, locale);
  }
  const suffix = isBeforeHijra ? 'av. H.' : 'H.';
  return withApprox(approx, `${numeric} ${suffix}${continues ? ' et après' : ''}`, locale);
}

// Convert a CE year string (e.g., "613-615 CE") to its locale display.
// CE dates keep Western digits on both locales; only the suffix changes.
export function formatGregorianYear(yearString: string, locale: Locale): string {
  if (!yearString) return '';
  if (locale === 'en') return yearString;
  const { approx, rest } = splitApprox(yearString);
  const continues = /\bonwards\b/i.test(rest);
  const numeric = stripEraTokens(rest);

  const text =
    locale === 'ar'
      ? `${numeric} م${continues ? ' فما بعدها' : ''}`
      : `${numeric} ap. J.-C.${continues ? ' et après' : ''}`;
  return withApprox(approx, text, locale);
}

// The two halves of an event's date: the Hijri month and year, and the Gregorian
// year. Pages that set them apart (the timeline's date column) use these;
// everything else uses the joined line below.
export function formatEventDateParts(event: SeerahEvent, locale: Locale) {
  const month = localizeHijriMonth(event.month, locale);
  const hijri = localizeHijriYear(event.year, locale);
  const comma = locale === 'ar' ? '،' : ',';
  return {
    hijri: month ? `${month}${comma} ${hijri}` : hijri,
    gregorian: formatGregorianYear(event.yearCE, locale),
  };
}

// Format an event's date line: month, Hijri year (Gregorian year).
export function formatEventDate(event: SeerahEvent, locale: Locale): string {
  const { hijri, gregorian } = formatEventDateParts(event, locale);
  return gregorian ? `${hijri} (${gregorian})` : hijri;
}

// Format an era timespan: Hijri timespan paired with Gregorian timespan.
export function formatEraTimespan(era: EraMetadata, locale: Locale) {
  return {
    primary: localizeHijriRange(era.timespanHijri, locale),
    // The Gregorian marker belongs on the range, not on each endpoint: "610 - 622 CE".
    secondary: formatGregorianYear(era.timespan, locale),
  };
}

// Each endpoint keeps its own era marker. Collapsing the range to one marker
// turned the Meccan era's "12 BH – 1 AH" into "12 – 1 AH" on Arabic, which
// says the era began twelve years after the Hijrah rather than twelve before.
function localizeHijriRange(range: string, locale: Locale): string {
  if (locale === 'en') return range;
  const [separator] = range.match(/\s*[–-]\s*/) ?? [' – '];
  const endpoints = range.split(/\s*[–-]\s*/).map((part) => localizeHijriYear(part, locale));
  return endpoints.join(separator.includes('–') ? ' – ' : separator);
}
