// Localized forms of the people and groups named in the event data.
//
// These are proper nouns, so rendering them in the reader's script is a
// presentation concern. Where the data qualifies a name with a descriptor
// ("who was martyred", "the guide"), the descriptor is translated too, since it
// is the project's own annotation rather than a name.
//
// A name with no entry falls back to the English form and is reported by
// `npm run verify:names`, so the gap is visible rather than silent.

import type { LocalizedName } from './names';

export const FIGURE_NAMES: Record<string, LocalizedName> = {
  // Family of the Prophet
  'Abdul Muttalib ibn Hashim': { ar: 'عبد المطلب بن هاشم', fr: 'Abd al-Mouttalib ibn Hâchim' },
  'Abdullah ibn Abdul Muttalib': { ar: 'عبد الله بن عبد المطلب', fr: 'Abdallah ibn Abd al-Mouttalib' },
  'Aminah bint Wahb': { ar: 'آمنة بنت وهب', fr: 'Âmina bint Wahb' },
  'Abu Talib ibn Abdul Muttalib': { ar: 'أبو طالب بن عبد المطلب', fr: 'Abou Tâlib ibn Abd al-Mouttalib' },
  'Khadijah bint Khuwaylid': { ar: 'خديجة بنت خويلد', fr: 'Khadîja bint Khouwaylid' },
  'Al-Abbas ibn Abdul Muttalib': { ar: 'العباس بن عبد المطلب', fr: 'Al-Abbâs ibn Abd al-Mouttalib' },
  'Hamza ibn Abdul Muttalib': { ar: 'حمزة بن عبد المطلب', fr: 'Hamza ibn Abd al-Mouttalib' },
  'Hamza ibn Abdul Muttalib (martyred)': {
    ar: 'حمزة بن عبد المطلب (استُشهد)',
    fr: 'Hamza ibn Abd al-Mouttalib (tombé en martyr)',
  },
  'Ruqayyah bint Muhammad': { ar: 'رقية بنت محمد', fr: 'Rouqayya bint Mouhammad' },
  'Fatimah bint al-Khattab': { ar: 'فاطمة بنت الخطاب', fr: 'Fâtima bint al-Khattâb' },
  'Umm Ayman (Barakah)': { ar: 'أم أيمن (بركة)', fr: 'Oumm Ayman (Baraka)' },
  'Halimah bint Abi Dhu\'ayb al-Sa\'diyyah': {
    ar: 'حليمة بنت أبي ذؤيب السعدية',
    fr: "Halîma bint Abî Dhou'ayb as-Sa'diyya",
  },
  "Al-Harith ibn Abdul Uzza (Halimah's husband)": {
    ar: 'الحارث بن عبد العزى (زوج حليمة)',
    fr: "Al-Hârith ibn Abd al-Ouzzâ (l'époux de Halîma)",
  },

  // The rightly guided caliphs and senior companions
  'Abu Bakr as-Siddiq': { ar: 'أبو بكر الصديق', fr: 'Abou Bakr as-Siddîq' },
  'Umar ibn al-Khattab': { ar: 'عمر بن الخطاب', fr: 'Omar ibn al-Khattâb' },
  'Uthman ibn Affan': { ar: 'عثمان بن عفان', fr: 'Othmân ibn Affân' },
  'Uthman ibn Affan (major funder)': {
    ar: 'عثمان بن عفان (من كبار المنفقين)',
    fr: 'Othmân ibn Affân (principal contributeur)',
  },
  'Uthman ibn Affan (sent as envoy to Makkah)': {
    ar: 'عثمان بن عفان (أُرسل سفيرًا إلى مكة)',
    fr: 'Othmân ibn Affân (envoyé comme émissaire à La Mecque)',
  },
  'Ali ibn Abi Talib': { ar: 'علي بن أبي طالب', fr: 'Alî ibn Abî Tâlib' },
  'Ali ibn Abi Talib (who washed the body)': {
    ar: 'علي بن أبي طالب (الذي تولى غسله)',
    fr: 'Alî ibn Abî Tâlib (qui procéda au lavage du corps)',
  },
  'Aisha bint Abi Bakr': { ar: 'عائشة بنت أبي بكر', fr: 'Aïcha bint Abî Bakr' },
  'Abdullah ibn Abi Bakr': { ar: 'عبد الله بن أبي بكر', fr: 'Abdallah ibn Abî Bakr' },
  'Asma bint Abi Bakr': { ar: 'أسماء بنت أبي بكر', fr: 'Asmâ bint Abî Bakr' },
  'Abdur-Rahman ibn Awf': { ar: 'عبد الرحمن بن عوف', fr: 'Abd ar-Rahmân ibn Awf' },
  'Az-Zubayr ibn al-Awwam': { ar: 'الزبير بن العوام', fr: 'Az-Zoubayr ibn al-Awwâm' },
  'Talhah ibn Ubaydillah': { ar: 'طلحة بن عبيد الله', fr: 'Talha ibn Oubaydillâh' },
  "Sa'd ibn Abi Waqqas": { ar: 'سعد بن أبي وقاص', fr: "Sa'd ibn Abî Waqqâs" },
  'Bilal ibn Rabah': { ar: 'بلال بن رباح', fr: 'Bilâl ibn Rabâh' },
  'Zayd ibn Harithah': { ar: 'زيد بن حارثة', fr: 'Zayd ibn Hâritha' },
  "Ja'far ibn Abi Talib": { ar: 'جعفر بن أبي طالب', fr: "Ja'far ibn Abî Tâlib" },
  "Mus'ab ibn Umayr": { ar: 'مصعب بن عمير', fr: "Mous'ab ibn Oumayr" },
  "Mus'ab ibn Umayr (martyred)": {
    ar: 'مصعب بن عمير (استُشهد)',
    fr: "Mous'ab ibn Oumayr (tombé en martyr)",
  },
  'Ammar ibn Yasir': { ar: 'عمار بن ياسر', fr: 'Ammâr ibn Yâsir' },
  'Yasir ibn Amir': { ar: 'ياسر بن عامر', fr: 'Yâsir ibn Âmir' },
  'Sumayyah bint Khayyat': { ar: 'سمية بنت خياط', fr: 'Soumayya bint Khayyât' },
  'Salman al-Farisi': { ar: 'سلمان الفارسي', fr: 'Salmân al-Fârisî' },
  'Amr ibn al-As': { ar: 'عمرو بن العاص', fr: 'Amr ibn al-Âs' },
  "Ka'b ibn Malik": { ar: 'كعب بن مالك', fr: "Ka'b ibn Mâlik" },
  "Nusaybah bint Ka'b": { ar: 'نسيبة بنت كعب', fr: "Nousayba bint Ka'b" },
  'Asma bint Amr': { ar: 'أسماء بنت عمرو', fr: 'Asmâ bint Amr' },
  "As'ad ibn Zurarah": { ar: 'أسعد بن زرارة', fr: "As'ad ibn Zourâra" },
  "Sa'd ibn ar-Rabi'": { ar: 'سعد بن الربيع', fr: "Sa'd ibn ar-Rabî'" },
  'Abdullah ibn Zayd': { ar: 'عبد الله بن زيد', fr: 'Abdallah ibn Zayd' },
  'Al-Arqam ibn Abi al-Arqam': { ar: 'الأرقم بن أبي الأرقم', fr: 'Al-Arqam ibn Abî al-Arqam' },
  'Suraqah ibn Malik': { ar: 'سراقة بن مالك', fr: 'Sourâqa ibn Mâlik' },
  'Abu Sufyan ibn al-Harith': { ar: 'أبو سفيان بن الحارث', fr: 'Abou Soufyân ibn al-Hârith' },
  'Khalid ibn al-Walid (now Muslim)': {
    ar: 'خالد بن الوليد (بعد إسلامه)',
    fr: 'Khâlid ibn al-Walîd (devenu musulman)',
  },
  'Khalid ibn al-Walid (Quraysh cavalry)': {
    ar: 'خالد بن الوليد (على خيل قريش)',
    fr: 'Khâlid ibn al-Walîd (à la tête de la cavalerie de Qouraych)',
  },
  "Nu'aym ibn Mas'ud (who secretly embraced Islam and divided the coalition)": {
    ar: 'نعيم بن مسعود (أسلم سرًّا وفرّق بين الأحزاب)',
    fr: "Nou'aym ibn Mas'oûd (converti en secret, il divisa la coalition)",
  },
  'Abdullah ibn Urayqit (the guide)': {
    ar: 'عبد الله بن أُريقط (الدليل)',
    fr: 'Abdallah ibn Ourayqit (le guide)',
  },

  // Opponents and other figures
  'Abu Jahl': { ar: 'أبو جهل', fr: 'Abou Jahl' },
  'Abu Jahl (killed)': { ar: 'أبو جهل (قُتل)', fr: 'Abou Jahl (tué)' },
  'Abu Lahab': { ar: 'أبو لهب', fr: 'Abou Lahab' },
  'Abu Sufyan (accepted Islam)': {
    ar: 'أبو سفيان (أسلم)',
    fr: 'Abou Soufyân (devenu musulman)',
  },
  'Hind bint Utbah': { ar: 'هند بنت عتبة', fr: 'Hind bint Outba' },
  'Hind bint Utbah (accepted Islam)': {
    ar: 'هند بنت عتبة (أسلمت)',
    fr: 'Hind bint Outba (devenue musulmane)',
  },
  "Utbah ibn Rabi'ah (killed)": { ar: 'عتبة بن ربيعة (قُتل)', fr: "Outba ibn Rabî'a (tué)" },
  'Umayyah ibn Khalaf': { ar: 'أمية بن خلف', fr: 'Oumayya ibn Khalaf' },
  'Umayyah ibn Khalaf (killed)': { ar: 'أمية بن خلف (قُتل)', fr: 'Oumayya ibn Khalaf (tué)' },
  "Abdullah ibn Jud'an": { ar: 'عبد الله بن جدعان', fr: "Abdallah ibn Jou'dân" },
  'Suhayl ibn Amr (Quraysh negotiator)': {
    ar: 'سهيل بن عمرو (مفاوض قريش)',
    fr: 'Souhayl ibn Amr (négociateur de Qouraych)',
  },
  'Abraha al-Ashram': { ar: 'أبرهة الأشرم', fr: 'Abraha al-Achram' },
  'Bahira (the monk)': { ar: 'بحيرا (الراهب)', fr: 'Bahîrâ (le moine)' },
  'Waraqah ibn Nawfal': { ar: 'ورقة بن نوفل', fr: 'Waraqa ibn Nawfal' },
  'Marhab (Jewish warrior killed by Ali)': {
    ar: 'مرحب (مقاتل يهودي قتله علي)',
    fr: 'Marhab (guerrier juif tué par Alî)',
  },
  "An-Najashi (Negus)": { ar: 'النجاشي', fr: 'An-Najâchî (le Négus)' },
  'An-Najashi (Abyssinia)': { ar: 'النجاشي (ملك الحبشة)', fr: "An-Najâchî (roi d'Abyssinie)" },
  'Al-Muqawqis (Egypt)': { ar: 'المقوقس (عظيم مصر)', fr: "Al-Mouqawqis (gouverneur d'Égypte)" },
  'Heraclius (Roman Emperor)': { ar: 'هرقل (عظيم الروم)', fr: 'Héraclius (empereur des Romains)' },
  'Khosrau II (Persian Emperor)': { ar: 'كسرى الثاني (ملك الفرس)', fr: 'Khosro II (roi des Perses)' },

  // Angels and prophets
  'Jibril (Angel Gabriel)': { ar: 'جبريل عليه السلام', fr: 'Jibrîl (l\'ange Gabriel)' },
  'The Angel of the Mountains': { ar: 'ملك الجبال', fr: 'L\'ange des montagnes' },
  'Previous Prophets (Ibrahim, Musa, Isa, and others)': {
    ar: 'الأنبياء السابقون (إبراهيم وموسى وعيسى وغيرهم)',
    fr: "Les prophètes précédents (Ibrâhîm, Moûsâ, 'Îsâ et d'autres)",
  },

  // Groups
  'The Ansar': { ar: 'الأنصار', fr: 'Les Ansâr' },
  'The Muhajirun': { ar: 'المهاجرون', fr: 'Les Mouhâjiroûn' },
  'The Muhajirun and Ansar': { ar: 'المهاجرون والأنصار', fr: 'Les Mouhâjiroûn et les Ansâr' },
  'The chiefs of Quraysh': { ar: 'سادة قريش', fr: 'Les chefs de Qouraych' },
  'The tribes of Quraysh': { ar: 'قبائل قريش', fr: 'Les tribus de Qouraych' },
  'The chiefs of Thaqif': { ar: 'سادة ثقيف', fr: 'Les chefs de Thaqîf' },
  'The clans of Banu Hashim and Banu Muttalib': {
    ar: 'بنو هاشم وبنو المطلب',
    fr: 'Les clans de Banoû Hâchim et Banoû al-Mouttalib',
  },
  'Banu Amr ibn Awf': { ar: 'بنو عمرو بن عوف', fr: 'Banoû Amr ibn Awf' },
  'The Jewish tribes of Madinah (Banu Qaynuqa, Banu Nadir, Banu Qurayza)': {
    ar: 'قبائل يهود المدينة (بنو قينقاع وبنو النضير وبنو قريظة)',
    fr: 'Les tribus juives de Médine (Banoû Qaynouqâ, Banoû an-Nadîr, Banoû Qourayza)',
  },
  'Twelve men from Madinah': { ar: 'اثنا عشر رجلًا من أهل المدينة', fr: 'Douze hommes de Médine' },
  '73 men and 2 women from Madinah': {
    ar: 'ثلاثة وسبعون رجلًا وامرأتان من أهل المدينة',
    fr: 'Soixante-treize hommes et deux femmes de Médine',
  },
  'Approximately 100,000+ Muslims': {
    ar: 'نحو مائة ألف مسلم أو يزيدون',
    fr: 'Environ cent mille musulmans ou plus',
  },
  "Sahl and Suhayl (the orphan boys)": {
    ar: 'سهل وسهيل (الغلامان اليتيمان)',
    fr: 'Sahl et Souhayl (les deux orphelins)',
  },
};


// Narrators named in the hadith citations.
export const NARRATOR_NAMES: Record<string, LocalizedName> = {
  'Abdullah ibn Abbas': { ar: 'عبد الله بن عباس', fr: 'Abdallah ibn Abbâs' },
  "Abdullah ibn Mas'ud": { ar: 'عبد الله بن مسعود', fr: "Abdallah ibn Mas'oûd" },
  'Abu Hurairah': { ar: 'أبو هريرة', fr: 'Abou Hourayra' },
  "Abu Musa al-Ash'ari": { ar: 'أبو موسى الأشعري', fr: "Abou Moûsâ al-Ach'arî" },
  'Abu Qatadah al-Ansari': { ar: 'أبو قتادة الأنصاري', fr: 'Abou Qatâda al-Ansârî' },
  'Aisha': { ar: 'عائشة', fr: 'Aïcha' },
  "Al-Bara' ibn Azib": { ar: 'البراء بن عازب', fr: 'Al-Barâ ibn Âzib' },
  'Anas ibn Malik': { ar: 'أنس بن مالك', fr: 'Anas ibn Mâlik' },
  'Ibn Abbas': { ar: 'ابن عباس', fr: 'Ibn Abbâs' },
  'Ibn Umar': { ar: 'ابن عمر', fr: 'Ibn Omar' },
  'Jabir ibn Abdullah': { ar: 'جابر بن عبد الله', fr: 'Jâbir ibn Abdallah' },
  "Sahl ibn Sa'd": { ar: 'سهل بن سعد', fr: "Sahl ibn Sa'd" },
  'Ubadah ibn as-Samit': { ar: 'عبادة بن الصامت', fr: 'Oubâda ibn as-Sâmit' },
  'Usaid ibn Hudair': { ar: 'أسيد بن حضير', fr: 'Ousayd ibn Houdayr' },
  'Usaid ibn Zuhair': { ar: 'أسيد بن ظهير', fr: 'Ousayd ibn Zouhayr' },
  'Multiple narrators': { ar: 'رواة متعددون', fr: 'Plusieurs rapporteurs' },
  'Reported traditions': { ar: 'آثار مروية', fr: 'Traditions rapportées' },
};

export const localizeFigure = (value: string, locale: string): string => {
  if (locale === 'en') return value;
  const entry = FIGURE_NAMES[value] ?? NARRATOR_NAMES[value];
  if (!entry) return value;
  return locale === 'ar' ? entry.ar : entry.fr;
};

export const isUnregisteredFigure = (value: string) =>
  !(value in FIGURE_NAMES) && !(value in NARRATOR_NAMES);
