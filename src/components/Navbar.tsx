"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/LocaleProvider";
import { SITE } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BagIcon, MenuIcon, CloseIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

function LogoMark() {
  const { t } = useLocale();
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label={t.brand.full}>
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brass-bright to-brass-deep text-ink shadow-[0_6px_18px_-6px_rgba(201,162,94,0.8)]">
        <span className="font-display text-xl leading-none">ل</span>
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-ink/20" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg text-cream">{t.brand.full}</span>
        <span className="text-[10px] tracking-[0.3em] text-brass/70">AMMAN</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const { t, locale, toggle } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#menu", label: t.nav.menu },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#locations", label: t.nav.locations },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-300",
          scrolled ? "glass border-b py-2.5" : "border-b border-transparent py-4",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <LogoMark />

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm text-sand/85 transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 inset-x-0 h-px origin-center scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggle}
              aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              className="grid h-10 w-10 place-items-center rounded-full border border-brass/35 text-sm font-semibold text-brass transition-colors hover:bg-brass/10"
            >
              {t.common.langToggle}
            </button>

            <div className="hidden sm:block">
              <MagneticButton href={SITE.talabat} className="px-5 py-2.5 text-[13px]">
                <BagIcon className="h-4 w-4" />
                {t.nav.order}
              </MagneticButton>
            </div>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-brass/35 text-cream lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <LogoMark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-brass/35 text-cream"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              className="flex flex-1 flex-col justify-center gap-2 px-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="border-b border-line/60 py-4 font-display text-3xl text-cream"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-8">
                <MagneticButton href={SITE.talabat} className="w-full">
                  <BagIcon className="h-4 w-4" />
                  {t.nav.order}
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
