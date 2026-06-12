"use client";

import { useLocale } from "@/lib/LocaleProvider";
import { useSiteData } from "@/lib/SiteDataProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MapPinIcon, ClockIcon, PhoneIcon, ArrowIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/* faint surveyor's grid — brass hairlines every 22px on both axes */
const MAP_GRID =
  "repeating-linear-gradient(0deg, rgba(201,162,94,0.12) 0, rgba(201,162,94,0.12) 1px, transparent 1px, transparent 22px)," +
  "repeating-linear-gradient(90deg, rgba(201,162,94,0.12) 0, rgba(201,162,94,0.12) 1px, transparent 1px, transparent 22px)";

export function Locations() {
  const { t, pick } = useLocale();
  const { branches } = useSiteData();

  return (
    <section id="locations" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow={t.locations.eyebrow} title={t.locations.title} />

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <RevealItem key={branch.id}>
              <article className="group relative overflow-hidden rounded-3xl card-surface border border-line/60 p-6 transition hover:border-brass/40 sm:p-8">
                <span className="sheen-layer rounded-3xl" />

                {/* map region */}
                <div
                  className={cn(
                    "relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br",
                    branch.kind === "clay" ? "from-clay/25 to-forest" : "from-fern/40 to-pine",
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ backgroundImage: MAP_GRID }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="relative inline-flex h-10 w-10 items-center justify-center">
                      <span className="absolute inline-flex h-10 w-10 animate-ping rounded-full bg-brass/30" />
                      <MapPinIcon className="relative h-10 w-10 text-brass" />
                    </span>
                  </div>
                </div>

                {/* title + open pill */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl text-cream">{pick(branch.name)}</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brass/15 px-2.5 py-1 text-xs text-brass">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass" />
                    {t.locations.open}
                  </span>
                </div>

                {/* info */}
                <div className="mt-4 space-y-3 text-sm text-sand/85">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 shrink-0 text-brass" />
                    <span>{pick(branch.address)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 shrink-0 text-brass" />
                    <span>{pick(branch.hours)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 shrink-0 text-brass" />
                    <a
                      href={`tel:${branch.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-brass"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>

                <MagneticButton href={branch.mapUrl} variant="outline" className="mt-6">
                  {t.locations.directionsLabel}
                  <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
                </MagneticButton>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
