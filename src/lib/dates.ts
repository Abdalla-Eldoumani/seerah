// Locale-aware formatting for Hijri and Gregorian dates.
// On Arabic, Hijri month names render in Arabic and digits are Eastern.
// English keeps the source strings from the JSON. The JSON itself is never mutated.

import type { Locale } from '@/i18n/routing';
import type { EraMetadata, SeerahEvent } from '@/types/seerah';
import { localizeMonth, isUnregisteredMonth } from '@/config/names';

const EASTERN_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toEasternDigits(input: string): string {
  return input.replace(/\d/g, (d) => EASTERN_DIGITS[Number(d)]);
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
  // The era marker is not always trailing: values like "44 BH onwards" exist,
  // so anchoring the match to the end leaves it in place.
  const isBeforeHijra = /BH/i.test(yearString);
  const continues = /\bonwards\b/i.test(yearString);
  const numeric = yearString
    .replace(/\b(?:BH|AH)\b/gi, '')
    .replace(/\bonwards\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (locale === 'ar') {
    const suffix = isBeforeHijra ? 'ق.هـ' : 'هـ';
    return `${toEasternDigits(numeric)} ${suffix}${continues ? ' فما بعدها' : ''}`;
  }
  const suffix = isBeforeHijra ? 'av. H.' : 'H.';
  return `${numeric} ${suffix}${continues ? ' et après' : ''}`;
}

// Convert a CE year string (e.g., "613-615 CE") to its locale display.
// CE dates keep Western digits on both locales; only the suffix changes.
function localizeGregorianYear(yearString: string, locale: Locale): string {
  if (!yearString) return '';
  if (locale === 'en') return yearString;
  const continues = /\bonwards\b/i.test(yearString);
  const numeric = yearString
    .replace(/\bCE\b/gi, '')
    .replace(/\bonwards\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (locale === 'ar') {
    return `${numeric} م${continues ? ' فما بعدها' : ''}`;
  }
  return `${numeric} ap. J.-C.${continues ? ' et après' : ''}`;
}

// Format an event's date line: month, Hijri year (Gregorian year).
export function formatEventDate(event: SeerahEvent, locale: Locale): string {
  const month = localizeHijriMonth(event.month, locale);
  const hijri = localizeHijriYear(event.year, locale);
  const gregorian = localizeGregorianYear(event.yearCE, locale);

  const lead = month ? `${month}, ${hijri}` : hijri;
  if (!gregorian) return lead;
  return `${lead} (${gregorian})`;
}

// Format an era timespan: Hijri timespan paired with Gregorian timespan.
export function formatEraTimespan(era: EraMetadata, locale: Locale) {
  if (locale !== 'ar') {
    return {
      primary: era.timespan,
      secondary: era.timespanHijri,
    };
  }
  return {
    primary: localizeHijriRange(era.timespanHijri),
    secondary: localizeGregorianRange(era.timespan),
  };
}

function localizeHijriRange(range: string): string {
  // Examples: "52 BH – 12 BH", "1 AH – 11 AH"
  const isBeforeHijra = /BH/i.test(range) && !/AH/i.test(range);
  const cleaned = range
    .replace(/(?:BH|AH)/gi, '')
    .replace(/onwards/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `${toEasternDigits(cleaned)} ${isBeforeHijra ? 'ق.هـ' : 'هـ'}`;
}

function localizeGregorianRange(range: string): string {
  const cleaned = range
    .replace(/CE/gi, '')
    .replace(/onwards/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `${cleaned} م`;
}
