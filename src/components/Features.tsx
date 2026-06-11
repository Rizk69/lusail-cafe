"use client";

import { useLocale } from "@/lib/LocaleProvider";
import { FEATURES } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { FEATURE_ICONS } from "@/components/ui/Icons";

export function Features() {
  const { t, pick } = useLocale();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow={t.features.eyebrow} title={t.features.title} />

        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = FEATURE_ICONS[f.icon];
            return (
              <RevealItem key={f.id}>
                <article className="group relative overflow-hidden rounded-3xl card-surface border border-line/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-brass/40">
                  <span className="sheen-layer rounded-3xl" />

                  <span
                    aria-hidden="true"
                    className="absolute top-5 end-5 font-display text-2xl text-brass/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brass/10 text-brass">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 font-display text-xl text-cream">{pick(f.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand/75">{pick(f.desc)}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
