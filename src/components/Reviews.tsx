"use client";

import { useLocale } from "@/lib/LocaleProvider";
import { REVIEWS } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { StarIcon, QuoteIcon } from "@/components/ui/Icons";

export function Reviews() {
  const { t, pick } = useLocale();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow={t.reviews.eyebrow} title={t.reviews.title} />

        <RevealStagger className="mt-14 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => {
            const name = pick(review.name);
            return (
              <RevealItem key={review.name.en}>
                <article className="group relative overflow-hidden rounded-3xl card-surface border border-line/60 p-7 transition hover:-translate-y-1">
                  <span className="sheen-layer rounded-3xl" />
                  <QuoteIcon
                    aria-hidden="true"
                    className="absolute top-5 end-5 h-10 w-10 text-brass/15"
                  />

                  <div className="relative">
                    <div className="flex gap-1" aria-hidden="true">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 text-brass" />
                      ))}
                    </div>

                    <p className="mt-4 leading-relaxed text-sand/85">{pick(review.text)}</p>

                    <div className="my-5 border-t border-line/60" />

                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-brass/15 font-display text-brass">
                        {name.charAt(0)}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-display text-cream">{name}</span>
                        <span className="text-xs text-sand/60">{pick(review.role)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
