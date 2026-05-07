import { Section } from '@/features/landing/Section';
import { SponsorLogos } from '@/features/sponsors/SponsorLogos';

export const Sponsors = () => (
  <div id="partners" className="scroll-mt-32 w-full py-12 md:py-16">
    <Section>
      <div className="mb-12 text-center">
        {/* Class khusus ini yang bakal narik TT Interphase Pro untuk judul */}
        <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl font-[family-name:var(--font-tt-interphase)]">
          Partner Companies
        </h2>
        
        {/* Paragraf ini bakal narik Creato Display bawaan dari tag <body> di layout */}
        <p className="mt-4 text-lg text-slate-600">
          Empowering Symbiocle alongside our amazing industry leaders.
        </p>
      </div>

      <SponsorLogos />
    </Section>
  </div>
);