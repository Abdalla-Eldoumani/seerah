import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <main className="py-16 sm:py-20">
      <Container>
        {/* Page title */}
        <header className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink mb-4">
            About Noor al-Seerah
          </h1>
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-gold text-xl sm:text-2xl"
          >
            عن نور السيرة
          </p>
        </header>

        <Divider />

        {/* Our Purpose */}
        <section className="mb-12" aria-labelledby="purpose-heading">
          <h2
            id="purpose-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4"
          >
            Our Purpose
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-light leading-relaxed">
            Noor al-Seerah (The Light of the Biography) is an interactive web
            experience for learning the life of Prophet Muhammad &#xFDFA;. We
            present 49 key events across three historical eras, using only
            pre-verified content from authenticated Islamic sources.
          </p>
        </section>

        <Divider />

        {/* Sources */}
        <section className="mb-12" aria-labelledby="sources-heading">
          <h2
            id="sources-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-6"
          >
            Sources
          </h2>

          {/* Hadith Collections */}
          <div className="mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-3">
              Hadith Collections
            </h3>
            <ul className="space-y-2 font-body text-ink-light">
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">Sahih al-Bukhari</strong> —
                  Imam Muhammad ibn Ismail al-Bukhari (d. 870 CE)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">Sahih Muslim</strong> — Imam
                  Muslim ibn al-Hajjaj (d. 875 CE)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">
                    Jami&apos; at-Tirmidhi
                  </strong>{' '}
                  — Imam Abu Isa at-Tirmidhi (d. 892 CE)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">Sunan Abu Dawud</strong> —
                  Imam Abu Dawud as-Sijistani (d. 889 CE)
                </span>
              </li>
            </ul>
          </div>

          {/* Seerah Works */}
          <div className="mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-3">
              Seerah Works
            </h3>
            <ul className="space-y-2 font-body text-ink-light">
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">
                    Ar-Raheeq Al-Makhtum (The Sealed Nectar)
                  </strong>{' '}
                  — Sheikh Safiur Rahman al-Mubarakpuri
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">Sirat Rasul Allah</strong> —
                  Ibn Ishaq (d. 767 CE), edited by Ibn Hisham (d. 833 CE)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">
                    Al-Bidaya wan-Nihaya
                  </strong>{' '}
                  — Imam Ibn Kathir (d. 1373 CE)
                </span>
              </li>
            </ul>
          </div>

          {/* Additional Sources */}
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mb-3">
              Additional Sources
            </h3>
            <ul className="space-y-2 font-body text-ink-light">
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>Tafsir Ibn Kathir</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">Asbab al-Nuzul</strong> —
                  Ali ibn Ahmad al-Wahidi (d. 1075 CE)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>Tabaqat Ibn Sa&apos;d</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">Al-Sunan al-Kubra</strong> —
                  Imam al-Bayhaqi
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-2 block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-ink">Musnad Ahmad</strong> — Imam
                  Ahmad ibn Hanbal
                </span>
              </li>
            </ul>
          </div>
        </section>

        <Divider />

        {/* Methodology */}
        <section className="mb-12" aria-labelledby="methodology-heading">
          <h2
            id="methodology-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4"
          >
            Methodology
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-light leading-relaxed">
            Events were identified from Ar-Raheeq Al-Makhtum as the primary
            chronological framework, cross-referenced with hadith collections,
            and verified against tafsir literature. Only sahih (authentic) and
            hasan (good) hadith are cited. Dates follow the majority scholarly
            opinion.
          </p>
        </section>

        <Divider />

        {/* Scholarly Differences */}
        <section className="mb-12" aria-labelledby="differences-heading">
          <h2
            id="differences-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4"
          >
            Scholarly Differences
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-light leading-relaxed">
            Some dates differ among scholars. This project follows the most
            commonly cited opinions in the sources listed above. Readers are
            encouraged to study under qualified scholars.
          </p>
        </section>

        <Divider />

        {/* Sadaqah Jariyah */}
        <section className="mb-4" aria-labelledby="sadaqah-heading">
          <h2
            id="sadaqah-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-4"
          >
            Sadaqah Jariyah
          </h2>
          <p
            className="font-body text-base sm:text-lg leading-relaxed italic"
            style={{ color: 'var(--color-ink-light)' }}
          >
            This project is intended as sadaqah jariyah (ongoing charity). We
            ask Allah to accept this effort and make it a source of benefit.
          </p>
        </section>

        <Divider className="mt-12" />
      </Container>
    </main>
  );
}
