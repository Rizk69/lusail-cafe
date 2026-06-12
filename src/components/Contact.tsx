"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { useLocale } from "@/lib/LocaleProvider";
import { useSiteData } from "@/lib/SiteDataProvider";
import { submitMessage } from "@/lib/data/messages";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  PhoneIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
  BagIcon,
} from "@/components/ui/Icons";

type Social = {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function Contact() {
  const { t, pick } = useLocale();
  const { settings, branches } = useSiteData();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const SOCIALS: Social[] = [
    { href: settings.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: settings.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: `https://wa.me/${settings.whatsapp}`, label: "WhatsApp", Icon: WhatsappIcon },
  ];

  const send = () => {
    // Save to the dashboard inbox (no-op if Firebase isn't configured)...
    void submitMessage({ name, message });
    if (name || message) setSent(true);
    // ...and hand off to WhatsApp as before.
    const text = encodeURIComponent(`${name} - ${message}`);
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, "_blank");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send();
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.lead}
        />

        <Reveal className="mt-14">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* LEFT — info */}
            <div className="group relative overflow-hidden rounded-3xl glass p-7">
              <span className="sheen-layer rounded-3xl" />
              <div className="relative space-y-6">
                {/* phone */}
                <div className="flex items-start gap-4">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-sand/60">{t.contact.phoneLabel}</span>
                    <a
                      href={`tel:${settings.phoneTel}`}
                      className="font-display text-lg text-cream transition-colors hover:text-brass"
                    >
                      <span dir="ltr">{settings.phoneDisplay}</span>
                    </a>
                  </div>
                </div>

                {/* hours */}
                <div className="flex items-start gap-4">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-sand/60">{t.contact.hoursLabel}</span>
                    <span className="text-cream">{pick(branches[0].hours)}</span>
                  </div>
                </div>

                <div className="brass-line h-px w-full opacity-40" aria-hidden />

                {/* follow */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs text-sand/60">{t.contact.followLabel}</span>
                  <div className="flex gap-3">
                    {SOCIALS.map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid h-11 w-11 place-items-center rounded-full border border-brass/35 text-brass transition-colors hover:bg-brass/10"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <MagneticButton href={settings.talabat} variant="clay">
                  <BagIcon className="h-4 w-4" />
                  {t.contact.orderCta}
                </MagneticButton>
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="group relative overflow-hidden rounded-3xl card-surface border border-line/60 p-7">
              <span className="sheen-layer rounded-3xl" />
              <form onSubmit={onSubmit} className="relative space-y-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-name" className="text-xs text-sand/60">
                    {t.contact.formName}
                  </label>
                  <input
                    id="c-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.formNamePh}
                    className="w-full rounded-xl border border-line bg-pine/60 px-4 py-3 text-cream placeholder:text-sand/40 focus:border-brass focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="c-msg" className="text-xs text-sand/60">
                    {t.contact.formMsg}
                  </label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.formMsgPh}
                    className="w-full resize-none rounded-xl border border-line bg-pine/60 px-4 py-3 text-cream placeholder:text-sand/40 focus:border-brass focus:outline-none"
                  />
                </div>

                <MagneticButton onClick={send} className="mt-2 w-full">
                  <WhatsappIcon className="h-4 w-4" />
                  {t.contact.formSend}
                </MagneticButton>

                {sent && (
                  <p className="text-center text-xs text-brass">
                    {pick({ ar: "تم الإرسال! سنردّ عليك قريباً.", en: "Sent! We'll reply soon." })}
                  </p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
