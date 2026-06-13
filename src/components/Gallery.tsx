"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/LocaleProvider";
import { useSiteData } from "@/lib/SiteDataProvider";
import type { GalleryItem } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { CafeArt } from "@/components/ui/CafeArt";
import { cn } from "@/lib/utils";

/* On-brand gradient per gallery `kind` (black & gold ground). The animated
   <CafeArt> sits on top; when a tile has a real `photo` (see content.ts) the
   image renders over both and the art is skipped. */
const kindGrad: Record<string, string> = {
  latte: "from-brass/20 to-forest",
  cold: "from-brass/15 to-ink",
  interior: "from-fern to-ink",
  beans: "from-moss to-ink",
  breakfast: "from-clay/25 to-forest",
  dessert: "from-clay/20 to-moss",
  counter: "from-brass/15 to-pine",
};

function Tile({ item }: { item: GalleryItem }) {
  const { pick } = useLocale();
  const grad = kindGrad[item.kind] ?? "from-forest to-pine";
  // If the photo file is missing at runtime, drop back to the animated art.
  const [photoOk, setPhotoOk] = useState(Boolean(item.photo));
  const showPhoto = Boolean(item.photo) && photoOk;

  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-line/60">
      {/* dark ground */}
      <div className={cn("absolute inset-0 bg-gradient-to-br", grad)} />
      <div className="grain absolute inset-0" />

      {/* animated gold line-art of the drink/dish (hidden once a photo loads) */}
      {!showPhoto && (
        <div className="absolute inset-0 grid place-items-center p-5">
          <CafeArt
            kind={item.kind}
            className="h-36 w-36 opacity-80 transition duration-500 group-hover:scale-[1.07] group-hover:opacity-100 sm:h-44 sm:w-44"
          />
        </div>
      )}

      {/* real photo (optional). alt="" — the visible caption below labels the tile.
          Absolute URLs (admin-pasted) use a plain <img> so a non-allowlisted host
          can't make next/image throw and blank the section; local /public paths
          and uploaded Storage URLs go through the optimizer. */}
      {showPhoto &&
        (/^https?:\/\//.test(item.photo!) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.photo!}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setPhotoOk(false)}
          />
        ) : (
          <Image
            src={item.photo!}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setPhotoOk(false)}
          />
        ))}

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
  const { gallery } = useSiteData();

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <RevealStagger className="mt-14 grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {gallery.map((item) => (
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
