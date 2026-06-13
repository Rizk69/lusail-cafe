"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/LocaleProvider";
import { useSiteData } from "@/lib/SiteDataProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BagIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function Menu() {
  const { t, pick } = useLocale();
  const { menu, settings } = useSiteData();
  const [active, setActive] = useState<string>(menu[0].id);

  // after live data hydrates, keep the active tab valid (ids may differ)
  useEffect(() => {
    if (!menu.some((c) => c.id === active)) setActive(menu[0]?.id ?? "");
  }, [menu, active]);

  const category = menu.find((c) => c.id === active) ?? menu[0];

  return (
    <section id="menu" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow={t.menu.eyebrow} title={t.menu.title} align="center" />

        {/* category tabs */}
        <Reveal>
          <div className="mt-12 flex gap-2 overflow-x-auto no-scrollbar mask-fade-x justify-start sm:justify-center">
            {menu.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-colors duration-300",
                    isActive
                      ? "bg-brass text-ink font-semibold"
                      : "border border-line text-sand hover:text-cream hover:border-brass/40",
                  )}
                >
                  {pick(cat.name)}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* items panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-x-12 gap-y-5 sm:grid-cols-2"
          >
            {category.items.map((item) => (
              <div key={pick(item.name)} className="flex items-baseline gap-3">
                <div className="min-w-0">
                  <p className="font-display text-lg text-cream">
                    {pick(item.name)}
                    {item.tag && (
                      <span className="ms-2 inline-block rounded-full bg-clay/20 px-2 py-0.5 text-[10px] text-clay-soft">
                        {pick(item.tag)}
                      </span>
                    )}
                  </p>
                  {item.desc && (
                    <p className="text-sm text-sand/55">{pick(item.desc)}</p>
                  )}
                </div>

                <span className="mt-3 h-px flex-1 self-end border-b border-dashed border-line/70" />

                <span className="whitespace-nowrap font-semibold text-brass">
                  {item.price}
                  <span className="ms-1 text-xs text-brass/70">{t.menu.currency}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* note + order CTA */}
        <p className="mt-8 text-center text-xs italic text-sand/50">{t.menu.note}</p>

        <div className="mt-6 flex justify-center">
          <MagneticButton href={settings.talabat} variant="clay">
            <BagIcon className="h-4 w-4" />
            {t.menu.orderCta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
