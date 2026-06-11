/* On-brand SVG icon set — no external icon dependency.
   Stroke icons inherit `currentColor`; brand glyphs are filled. */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const stroke = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function CupIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M5 8h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z" />
      <path d="M16 9h2.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 2.5c-.6.8-.6 1.7 0 2.5M11.5 2.5c-.6.8-.6 1.7 0 2.5" />
      <path d="M3.5 21h14" />
    </svg>
  );
}

export function PlateIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export function LeafIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M4 20s0-9 7-13c4-2.3 9-2 9-2s.3 5-2 9c-4 7-13 7-13 7Z" />
      <path d="M9 15c2-3 4.5-5 8-7" />
    </svg>
  );
}

export function BikeIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17l3-7h6l2 4M9 10h6M14 7h3" />
    </svg>
  );
}

export function PhoneIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V18a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 1-2Z" />
    </svg>
  );
}

export function MapPinIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function ArrowIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function StarIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9 2.9-6Z" />
    </svg>
  );
}

export function QuoteIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H6c0-1.7 1.3-3 3-3V7Zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-4c0-1.7 1.3-3 3-3V7Z" />
    </svg>
  );
}

export function MenuIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function BeanIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <ellipse cx="12" cy="12" rx="6.5" ry="9" transform="rotate(35 12 12)" />
      <path d="M9.2 6.5c2 2.5 2 8.5-1 11.5" />
    </svg>
  );
}

/* brand glyphs (filled) */
export function InstagramIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 8.5V7c0-.8.2-1.2 1.4-1.2H17V2.6h-2.7C11.2 2.6 10 4.3 10 6.8v1.7H8v3.2h2V22h4v-10.3h2.7l.4-3.2H14Z" />
    </svg>
  );
}

export function WhatsappIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.2-4.6-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.4.4-.2.7.2.4.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.2.1.9-.1 1.7Z" />
    </svg>
  );
}

export function BagIcon(p: P) {
  return (
    <svg {...stroke(p)}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export const FEATURE_ICONS: Record<string, (p: P) => React.ReactElement> = {
  cup: CupIcon,
  plate: PlateIcon,
  leaf: LeafIcon,
  bike: BikeIcon,
};
