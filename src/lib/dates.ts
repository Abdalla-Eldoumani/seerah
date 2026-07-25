// Locale-aware formatting for Hijri and Gregorian dates.
// On Arabic, Hijri month names render in Arabic and digits are Eastern.
// English keeps the source strings from the JSON. The JSON itself is never mutated.

import type { Locale } from '@/i18n/routing';
import type { EraMetadata, SeerahEvent } from '@/types/seerah';
import {
  localizeMonth,
  isUnregisteredMonth,
  localizeYearPhrase,
  isYearPhrase,
} from '@/config/names';

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

// Hijri month names: English transliteration to Arabic. The JSON stores months in
// English (e.g., "Ramadan", "Rabi' al-Awwal"). Some entries include qualifiers
// ("Rajab or Sha'ban", "according to many scholars") that we leave intact.
const HIJRI_MONTHS_AR: Record<string, string> = {
  Muharram: 'محرّم',
  Safar: 'صفر',
  "Rabi' al-Awwal": 'ربيع الأول',
  "Rabi' al-Thani": 'ربيع الآخر',
  "Jumada al-Awwal": 'جمادى الأولى',
  "Jumada al-Thani": 'جمادى الآخرة',
  Rajab: 'رجب',
  "Sha'ban": 'شعبان',
  Ramadan: 'رمضان',
  Shawwal: 'شوّال',
  "Dhul Qa'dah": 'ذو القعدة',
  "Dhul Hijjah": 'ذو الحجة',
};

function localizeHijriMonth(monthString: string, locale: Locale): string {
  if (locale === 'en' || !monthString) return monthString;

  // Many stored months carry an English qualifier: "Ramadan (17th or 21st)",
  // "12 Rabi' al-Awwal (Monday)". Substituting word by word leaves the
  // connective behind, so the whole string is looked up first.
  if (!isUnregisteredMonth(monthString)) {
    const localized = localizeMonth(monthString, locale);
    return locale === 'ar' ? toEasternDigits(localized) : localized;
  }
  if (locale !== 'ar') return monthString;

  let out = monthString;
  for (const [en, ar] of Object.entries(HIJRI_MONTHS_AR)) {
    out = out.replaceAll(en, ar);
  }
  // Strip English ordinal suffixes (20th, 21st, 2nd, 3rd) on Arabic so the
  // result reads as a clean Arabic-script line; the digit itself remains
  // (and gets converted to Eastern Arabic numerals below).
  out = out.replace(/(\d+)(st|nd|rd|th)\b/g, '$1');
  return toEasternDigits(out);
}

// Convert a stored Hijri year string (e.g., "9-7 BH" or "1 AH") to its
// locale display. Arabic gets Eastern digits and ق.هـ / هـ suffixes.
function localizeHijriYear(yearString: string, locale: Locale): string {
  if (!yearString) return '';
  if (locale === 'en') return yearString;
  // Some years are stored as a phrase rather than a figure, so they
  // resolve whole instead of going through token stripping.
  if (isYearPhrase(yearString)) {
    const phrase = localizeYearPhrase(yearString, locale);
    return locale === 'ar' ? toEasternDigits(phrase) : phrase;
  }
  // The era marker is not always trailing: values like "44 BH onwards" exist,
  // so anchoring the match to the end leaves it in place.
  const isBeforeHijra = /BH/i.test(yearString);
  const continues = /\bonwards\b/i.test(yearString);
  const numeric = stripEraTokens(yearString);

  if (locale === 'ar') {
    const suffix = isBeforeHijra ? 'ق.هـ' : 'هـ';
    return `${toEasternDigits(numeric)} ${suffix}${continues ? ' فما بعدها' : ''}`;
  }
  const suffix = isBeforeHijra ? 'av. H.' : 'H.';
  return `${numeric} ${suffix}${continues ? ' et après' : ''}`;
}

// Convert a CE year string (e.g., "613-615 CE") to its locale display.
// CE dates keep Western digits on both locales; only the suffix changes.
export function formatGregorianYear(yearString: string, locale: Locale): string {
  if (!yearString) return '';
  if (locale === 'en') return yearString;
  const continues = /\bonwards\b/i.test(yearString);
  const numeric = stripEraTokens(yearString);

  if (locale === 'ar') {
    return `${numeric} م${continues ? ' فما بعدها' : ''}`;
  }
  return `${numeric} ap. J.-C.${continues ? ' et après' : ''}`;
}

// Format an event's date line: month, Hijri year (Gregorian year).
export function formatEventDate(event: SeerahEvent, locale: Locale): string {
  const month = localizeHijriMonth(event.month, locale);
  const hijri = localizeHijriYear(event.year, locale);
  const gregorian = formatGregorianYear(event.yearCE, locale);

  const lead = month ? `${month}, ${hijri}` : hijri;
  if (!gregorian) return lead;
  return `${lead} (${gregorian})`;
}

// Format an era timespan: Hijri timespan paired with Gregorian timespan.
export function formatEraTimespan(era: EraMetadata, locale: Locale) {
  return {
    primary: localizeHijriRange(era.timespanHijri, locale),
    secondary: localizeGregorianRange(era.timespan, locale),
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

function localizeGregorianRange(range: string, locale: Locale): string {
  if (locale === 'en') return range;
  // The marker belongs on the range, not on each endpoint: "610 - 622 CE".
  const continues = /onwards/i.test(range);
  const numeric = stripEraTokens(range);
  if (locale === 'ar') {
    return `${numeric} م${continues ? ' فما بعدها' : ''}`;
  }
  return `${numeric} ap. J.-C.${continues ? ' et après' : ''}`;
}
