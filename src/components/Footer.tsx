"use client";

import { useLocale } from "@/lib/LocaleProvider";
import { SITE, BRANCHES } from "@/lib/content";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import {
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  ArrowIcon,
} from "@/components/ui/Icons";
import type { SVGProps, ReactElement } from "react";

type IconCmp = (p: SVGProps<SVGSVGElement>) => ReactElement;

export function Footer() {
  const { t, pick } = useLocale();
  const year = new Date().getFullYear();

  const socials: { label: string; href: string; Icon: IconCmp }[] = [
    { label: "Instagram", href: SITE.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: SITE.facebook, Icon: FacebookIcon },
    { label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}`, Icon: WhatsappIcon },
  ];

  const quickLinks: { href: string; label: string }[] = [
    { href: "#about", label: t.nav.about },
    { href: "#menu", label: t.nav.menu },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#locations", label: t.nav.locations },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative mt-10 border-t border-line/60 bg-ink/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <RevealStagger className="grid gap-10 md:grid-cols-4">
          {/* Col 1 — brand */}
          <RevealItem>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brass-bright to-brass-deep font-display text-xl text-ink shadow-[0_6px_18px_-6px_rgba(201,162,94,0.8)]">
                  <span className="leading-none">ل</span>
                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-ink/20" />
                </span>
                <span className="font-display text-lg text-cream">{t.brand.full}</span>
              </div>

              <p className="mt-4 max-w-xs text-sm text-sand/70">{t.footer.tagline}</p>

              <div className="mt-5 flex gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-brass/35 text-brass transition-colors hover:bg-brass/10"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </RevealItem>

          {/* Col 2 — quick links */}
          <RevealItem>
            <div>
              <h3 className="mb-4 font-display text-cream">{t.footer.quickLinks}</h3>
              <nav className="flex flex-col gap-2.5">
                {quickLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-sm text-sand/70 transition-colors hover:text-brass"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          </RevealItem>

          {/* Col 3 — visit us */}
          <RevealItem>
            <div>
              <h3 className="mb-4 font-display text-cream">{t.footer.visitUs}</h3>
              <div className="flex flex-col gap-4">
                {BRANCHES.map((b) => (
                  <div key={b.id}>
                    <p className="text-sm text-cream">{pick(b.name)}</p>
                    <p className="mt-1 flex items-start gap-2 text-xs text-sand/60">
                      <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                      <span>{pick(b.address)}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>

          {/* Col 4 — follow / hours */}
          <RevealItem>
            <div>
              <h3 className="mb-4 font-display text-cream">{t.footer.followUs}</h3>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-2 text-sm text-sand/70">
                  <ClockIcon className="h-4 w-4 shrink-0 text-brass" />
                  <span>{pick(BRANCHES[0].hours)}</span>
                </p>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="flex items-center gap-2 text-sm text-sand/70 transition-colors hover:text-brass"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-brass" />
                  <span dir="ltr">{SITE.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </RevealItem>
        </RevealStagger>

        {/* Bottom bar */}
        <Reveal variant="fade" delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-6 text-xs text-sand/55 sm:flex-row">
            <p>{`© ${year} ${t.brand.full} — ${t.footer.rights}`}</p>
            <p>{t.footer.madeWith}</p>
            <a
              href="#top"
              className="flex items-center gap-1.5 transition-colors hover:text-brass"
            >
              {t.footer.backToTop}
              <ArrowIcon className="h-3.5 w-3.5 -rotate-90" />
            </a>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
