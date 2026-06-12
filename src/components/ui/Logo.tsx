"use client";

/* ============================================================================
   Lusail Café brand mark — a gilded medallion holding a coffee cup + steam.
   Self-contained SVG (no image file needed), so it stays crisp at any size and
   never 404s. Used in the Navbar, Footer, Preloader and as the favicon.

   ⚑ TO SWAP IN THE REAL LOGO: drop your file at  public/brand/logo.svg  (or
   .png) and set  USE_BRAND_FILE = true  below — every instance switches at once.
   See public/brand/README.md for sizing notes.
============================================================================ */

import { useId } from "react";
import Image from "next/image";
import type { SVGProps } from "react";

const USE_BRAND_FILE = false; // flip to true once public/brand/logo.svg exists
const BRAND_FILE = "/brand/logo.svg";

type MarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
  /** Set when a visible "Lusail Café" wordmark sits beside the mark, so screen
      readers don't announce the brand name twice. Hides the mark from AT. */
  decorative?: boolean;
};

export function LogoMark({ title = "Lusail Café", decorative = false, className, ...rest }: MarkProps) {
  const gid = useId();
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": title };

  if (USE_BRAND_FILE) {
    return (
      <span className={className} {...a11y}>
        <Image src={BRAND_FILE} alt={decorative ? "" : title} fill className="object-contain" sizes="48px" />
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      {...a11y}
      {...rest}
    >
      <defs>
        <linearGradient id={`${gid}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecd29a" />
          <stop offset="0.5" stopColor="#c9a25e" />
          <stop offset="1" stopColor="#9a7330" />
        </linearGradient>
      </defs>

      {/* gilded medallion */}
      <circle cx="24" cy="24" r="22.5" fill={`url(#${gid}-gold)`} />
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="#0a0a0a" strokeOpacity="0.18" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="18.8" fill="none" stroke="#0a0a0a" strokeOpacity="0.22" strokeWidth="1" />

      {/* cup + steam, carved in the deep-pine ink colour */}
      <g
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.92"
      >
        {/* steam */}
        <path d="M20 12.6c-1.4 1.5-1.4 3 0 4.5" />
        <path d="M24 11.8c-1.4 1.5-1.4 3 0 4.5" />
        <path d="M28 12.6c-1.4 1.5-1.4 3 0 4.5" />
        {/* cup body */}
        <path d="M15 21.4h18l-1.5 8.4a4 4 0 0 1-3.95 3.3h-7.1a4 4 0 0 1-3.95-3.3L15 21.4Z" />
        {/* handle */}
        <path d="M32.7 23.4c3.7.5 3.7 6.4 0 6.9" />
        {/* saucer */}
        <path d="M13.4 35.4h21.2" />
      </g>
    </svg>
  );
}
