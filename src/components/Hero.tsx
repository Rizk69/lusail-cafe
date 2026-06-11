"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/LocaleProvider";
import { SITE, STATS } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Counter } from "@/components/ui/Counter";
import { BagIcon, ArrowIcon, ChevronDownIcon } from "@/components/ui/Icons";

const HeroScene = dynamic(() => import("./hero/HeroScene"), { ssr: false });

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const { t } = useLocale();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-24">
      {/* 3D scene */}
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>
      {/* legibility + transition overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(6,18,13,0.55),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-b from-transparent to-pine" />

      {/* steam */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] -z-10 flex -translate-x-1/2 gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-20 w-[6px] rounded-full bg-gradient-to-t from-transparent via-cream/20 to-transparent blur-[3px] animate-[steam_4.2s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
        className="relative flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={rise}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-hero inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-sand"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brass" />
          </span>
          {t.hero.badge}
        </motion.span>

        <motion.p
          variants={rise}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-display text-lg text-sand/80"
        >
          {t.hero.titleTop}
        </motion.p>

        <motion.h1
          variants={{ hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" }, show: { opacity: 1, clipPath: "inset(0 0 0% 0)" } }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-7xl leading-none text-brass-gradient text-glow sm:text-8xl md:text-[9rem]"
        >
          {t.brand.name}
        </motion.h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-balance font-display text-xl text-cream sm:text-2xl"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-lg text-balance text-sm leading-relaxed text-sand/75 sm:text-base"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href={SITE.talabat}>
            <BagIcon className="h-4 w-4" />
            {t.hero.orderCta}
          </MagneticButton>
          <MagneticButton href="#menu" variant="outline">
            {t.hero.menuCta}
            <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* stats */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-14 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl glass-hero sm:grid-cols-4"
      >
        {STATS.map((s) => (
          <div key={s.value} className="flex flex-col items-center gap-1 px-3 py-5">
            <Counter value={s.value} className="font-display text-3xl text-brass" />
            <StatLabel value={s.value} />
          </div>
        ))}
      </motion.div>

      {/* scroll cue */}
      <a href="#about" aria-label={t.hero.cue} className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-sand/60">
        <span className="eyebrow">{t.hero.cue}</span>
        <ChevronDownIcon className="h-5 w-5 animate-[cue_1.8s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}

function StatLabel({ value }: { value: string }) {
  const { pick } = useLocale();
  const stat = STATS.find((s) => s.value === value)!;
  return <span className="text-center text-xs text-sand/70">{pick(stat.label)}</span>;
}
