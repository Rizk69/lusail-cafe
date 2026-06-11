"use client";

import { useLocale } from "@/lib/LocaleProvider";
import { STATS } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Counter } from "@/components/ui/Counter";
import { CupIcon, StarIcon, ArrowIcon } from "@/components/ui/Icons";

/** Concentric gilded rings, sized inside-out (literal classes so Tailwind scans them). */
const RINGS = ["h-44 w-44", "h-64 w-64", "h-80 w-80", "h-[23rem] w-[23rem]"] as const;

/** About — the café's story beside a decorative gilded emblem. */
export function About() {
  const { t, pick } = useLocale();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* TEXT */}
          <div>
            <SectionHeader align="start" eyebrow={t.about.eyebrow} title={t.about.title} />

            <Reveal delay={0.05} className="mt-6">
              <p className="font-display text-xl text-cream">{t.about.lead}</p>
            </Reveal>

            <Reveal delay={0.12} className="mt-5 space-y-4">
              <p className="leading-relaxed text-sand/80">{t.about.body1}</p>
              <p className="leading-relaxed text-sand/80">{t.about.body2}</p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <MagneticButton href="#menu" variant="outline">
                {t.about.cta}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </MagneticButton>
            </Reveal>
          </div>

          {/* VISUAL — gilded emblem */}
          <Reveal variant="scale" delay={0.1}>
            <Parallax speed={40}>
              <div className="group relative h-[28rem] overflow-hidden rounded-3xl card-surface brass-frame grain">
                <span className="sheen-layer rounded-3xl" />

                {/* concentric rings */}
                {RINGS.map((size) => (
                  <span
                    key={size}
                    className={`absolute inset-0 m-auto rounded-full border border-brass/20 ${size}`}
                  />
                ))}

                {/* soft brass aura behind the cup */}
                <span className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-brass/10 blur-2xl" />

                {/* centered emblem */}
                <CupIcon className="absolute inset-0 m-auto h-40 w-40 text-brass/80 animate-[float_7s_ease-in-out_infinite]" />

                {/* floating rating badge */}
                <div className="absolute bottom-4 end-4 rounded-2xl glass px-4 py-3 text-center">
                  <Counter value="4.8" className="font-display text-2xl text-brass" />
                  <div className="mt-1 flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5 text-brass" />
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] text-sand/80">{pick(STATS[3].label)}</p>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
