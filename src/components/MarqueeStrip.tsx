"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";

/** Slim cinematic photo ticker between the hero and the about section. */
const STRIP = [
  "hot-lotus",
  "shawarma",
  "mocktail",
  "fries",
  "avocado",
  "platter",
  "strawberry",
  "cocktails",
  "sandwich",
].map((n) => `/gallery/${n}.jpg`);

export function MarqueeStrip() {
  return (
    <div className="relative border-y border-line/60 bg-ink/50 py-4">
      <Marquee>
        {STRIP.map((src) => (
          <div
            key={src}
            className="relative mx-2 h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-brass/20 sm:h-24 sm:w-40"
          >
            <Image src={src} alt="" fill sizes="160px" className="object-cover" />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
