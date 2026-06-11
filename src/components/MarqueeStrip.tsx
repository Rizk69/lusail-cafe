"use client";

import { useLocale } from "@/lib/LocaleProvider";
import { MARQUEE } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";
import { BeanIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/** Slim decorative ticker band that sits between the hero and the about section. */
export function MarqueeStrip() {
  const { pick } = useLocale();

  return (
    <div className="relative border-y border-line/60 bg-forest/40 py-5">
      <Marquee>
        {MARQUEE.map((word, i) => (
          <span
            key={word.en}
            className={cn(
              "group flex items-center gap-8 whitespace-nowrap px-8 font-display text-2xl sm:text-3xl",
              i % 2 === 0 ? "text-cream" : "text-brass",
            )}
          >
            {pick(word)}
            <BeanIcon className="h-4 w-4 text-brass/50" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
