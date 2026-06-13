"use client";

import Image from "next/image";
import { useLocale } from "@/lib/LocaleProvider";
import { useSiteData } from "@/lib/SiteDataProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Counter } from "@/components/ui/Counter";
import { StarIcon, ArrowIcon } from "@/components/ui/Icons";

/** About — the café's story beside a real photo of the space. */
export function About() {
  const { t, pick } = useLocale();
  const { settings } = useSiteData();

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

          {/* VISUAL — real photo of the space */}
          <Reveal variant="scale" delay={0.1}>
            <Parallax speed={40}>
              <div className="group relative h-[28rem] overflow-hidden rounded-3xl brass-frame">
                <Image
                  src="/gallery/interior.jpg"
                  alt={pick({ ar: "جلسات كافيه لوسيل", en: "Inside Lusail Café" })}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/10" />
                <span className="sheen-layer rounded-3xl" />

                {/* floating rating badge */}
                <div className="absolute bottom-4 end-4 rounded-2xl glass px-4 py-3 text-center">
                  <Counter value="4.8" className="font-display text-2xl text-brass" />
                  <div className="mt-1 flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5 text-brass" />
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] text-sand/80">
                    {pick(settings.stats?.[3]?.label ?? { ar: "تقييم الزوّار", en: "Guest rating" })}
                  </p>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
