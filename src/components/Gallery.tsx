"use client";

import type { ComponentType, SVGProps } from "react";
import { useLocale } from "@/lib/LocaleProvider";
import { GALLERY } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { CupIcon, LeafIcon, BeanIcon, PlateIcon, StarIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
type KindStyle = { grad: string; Icon: IconType };

/* On-brand composition per gallery `kind` — gradient + glyph, no photos.
   Swap any tile for a real photo later by replacing it with <Image src=.../>. */
const kindStyle: Record<string, KindStyle> = {
  latte: { grad: "from-brass/25 to-forest", Icon: CupIcon },
  interior: { grad: "from-fern to-pine", Icon: LeafIcon },
  beans: { grad: "from-moss to-ink", Icon: BeanIcon },
  breakfast: { grad: "from-clay/30 to-forest", Icon: PlateIcon },
  dessert: { grad: "from-clay/25 to-moss", Icon: StarIcon },
  counter: { grad: "from-brass/20 to-pine", Icon: CupIcon },
};

const fallback: KindStyle = { grad: "from-forest to-pine", Icon: CupIcon };

export function Gallery() {
  const { t, pick } = useLocale();

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <RevealStagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {GALLERY.map((item) => {
            const { grad, Icon } = kindStyle[item.kind] ?? fallback;
            return (
              <RevealItem
                key={item.id}
                className={cn(item.wide && "md:col-span-2", item.tall && "row-span-2")}
              >
                {/* Tiles can be swapped for next/image later (see content.ts GALLERY). */}
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line/60">
                  <div className={cn("absolute inset-0 bg-gradient-to-br", grad)} />
                  <div className="grain absolute inset-0" />

                  <div className="absolute inset-0 grid place-items-center">
                    <Icon className="h-24 w-24 text-cream/10 transition duration-500 group-hover:scale-110" />
                  </div>

                  <span className="sheen-layer rounded-3xl" />

                  <div className="glass absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display text-cream transition group-hover:-translate-y-0.5">
                      {pick(item.caption)}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
