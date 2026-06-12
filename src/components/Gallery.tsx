"use client";

import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/LocaleProvider";
import { GALLERY } from "@/lib/content";
import type { GalleryItem } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { CupIcon, LeafIcon, BeanIcon, PlateIcon, StarIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
type KindStyle = { grad: string; Icon: IconType };

/* On-brand composition per gallery `kind` — gradient + glyph, no photos.
   When a tile has `photo` set (see content.ts), the real image renders on top
   and this art becomes its loading/fallback layer. */
const kindStyle: Record<string, KindStyle> = {
  latte: { grad: "from-brass/25 to-forest", Icon: CupIcon },
  interior: { grad: "from-fern to-pine", Icon: LeafIcon },
  beans: { grad: "from-moss to-ink", Icon: BeanIcon },
  breakfast: { grad: "from-clay/30 to-forest", Icon: PlateIcon },
  dessert: { grad: "from-clay/25 to-moss", Icon: StarIcon },
  counter: { grad: "from-brass/20 to-pine", Icon: CupIcon },
};

const fallback: KindStyle = { grad: "from-forest to-pine", Icon: CupIcon };

function Tile({ item }: { item: GalleryItem }) {
  const { pick } = useLocale();
  const { grad, Icon } = kindStyle[item.kind] ?? fallback;
  // If the photo file is missing at runtime, drop back to the SVG art.
  const [photoOk, setPhotoOk] = useState(Boolean(item.photo));
  const showPhoto = Boolean(item.photo) && photoOk;

  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-line/60">
      {/* on-brand art — always rendered; sits under the photo as a backdrop */}
      <div className={cn("absolute inset-0 bg-gradient-to-br", grad)} />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 grid place-items-center">
        <Icon className="h-24 w-24 text-cream/10 transition duration-500 group-hover:scale-110" />
      </div>

      {/* real photo (optional). alt="" — the visible caption below labels the
          tile, so the photo is decorative and skipped by screen readers. */}
      {showPhoto && (
        <Image
          src={item.photo!}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setPhotoOk(false)}
        />
      )}

      {/* darken the bottom so the caption stays legible (AA) over bright photos */}
      {showPhoto && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
      )}

      <span className="sheen-layer rounded-3xl" />

      <div className={cn("absolute inset-x-0 bottom-0 p-4", !showPhoto && "glass")}>
        <p
          className={cn(
            "font-display text-cream transition group-hover:-translate-y-0.5",
            showPhoto && "[text-shadow:0_1px_10px_rgba(0,0,0,0.9)]",
          )}
        >
          {pick(item.caption)}
        </p>
      </div>
    </div>
  );
}

export function Gallery() {
  const { t } = useLocale();

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <RevealStagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {GALLERY.map((item) => (
            <RevealItem
              key={item.id}
              className={cn(item.wide && "md:col-span-2", item.tall && "row-span-2")}
            >
              <Tile item={item} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
