"use client";

import Image from "next/image";
import { useLocale } from "@/lib/LocaleProvider";
import { SIGNATURES, SITE } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BagIcon } from "@/components/ui/Icons";

/** Signatures — a photo showcase of the café's most-loved drinks & plates. */
export function Signatures() {
  const { t, pick } = useLocale();

  return (
    <section id="signatures" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.signatures.eyebrow}
          title={t.signatures.title}
          subtitle={t.signatures.subtitle}
        />

        <RevealStagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {SIGNATURES.map((s) => (
            <RevealItem key={s.id}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-brass/20">
                <Image
                  src={s.photo}
                  alt={pick(s.name)}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* legibility scrim */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="sheen-layer rounded-3xl" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[11px] text-brass">{pick(s.note)}</p>
                  <p className="mt-0.5 font-display text-lg leading-tight text-cream [text-shadow:0_1px_10px_rgba(0,0,0,0.85)]">
                    {pick(s.name)}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <div className="mt-12 flex justify-center">
          <MagneticButton href={SITE.talabat} variant="clay">
            <BagIcon className="h-4 w-4" />
            {t.hero.orderCta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
