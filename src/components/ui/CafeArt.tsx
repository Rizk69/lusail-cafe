"use client";

/* ============================================================================
   CafeArt — animated, on-brand line-art of the café's drinks & food, drawn in
   gold over the dark ground (black & gold identity). Used to bring the gallery
   tiles to life while there are no real photos; a tile with a real `photo`
   (see content.ts) renders the photo on top and hides this art.

   Each illustration fills its tile (object-like, centered) and loops a subtle
   motion — steam rising, beans drifting, a sparkle, a pour. Motion is disabled
   under prefers-reduced-motion.
============================================================================ */

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";

const GOLD = "#c9a25e";
const GOLD_HI = "#ecd29a";

type ArtProps = { className?: string };

const base = {
  viewBox: "0 0 200 200",
  fill: "none" as const,
  stroke: GOLD,
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const spin = { transformBox: "fill-box" as const, transformOrigin: "center" as const };

/* ---- hot coffee: rising steam + glinting cup ------------------------------- */
function SteamingCup({ className }: ArtProps) {
  const still = useReducedMotion();
  return (
    <svg {...base} className={className} aria-hidden>
      {[78, 100, 122].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 64c-7 7-7 13 0 20s7 13 0 20`}
          stroke={GOLD_HI}
          strokeWidth={2.4}
          opacity={0.4}
          style={spin}
          animate={still ? {} : { opacity: [0.12, 0.5, 0.12], y: [2, -8, 2], scaleY: [0.9, 1.12, 0.9] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
      {/* cup */}
      <path d="M52 118h84l-7 38a16 16 0 0 1-15.8 13H74.8A16 16 0 0 1 59 156l-7-38Z" />
      <path d="M136 124c18 2 18 30 0 33" />
      <path d="M44 170h96" />
      {/* coffee surface */}
      <motion.ellipse
        cx={94} cy={120} rx={40} ry={6} fill={GOLD} opacity={0.22} stroke="none"
        animate={still ? {} : { opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ---- iced drink: bobbing ice + straw --------------------------------------- */
function IcedDrink({ className }: ArtProps) {
  const still = useReducedMotion();
  return (
    <svg {...base} className={className} aria-hidden>
      {/* glass */}
      <path d="M64 70h72l-9 86a10 10 0 0 1-10 9H83a10 10 0 0 1-10-9L64 70Z" />
      <path d="M58 70h84" />
      {/* straw */}
      <path d="M118 52 96 150" stroke={GOLD_HI} strokeWidth={4} />
      {/* liquid line */}
      <path d="M70 104h60" opacity={0.5} />
      {/* ice cubes */}
      {[
        { x: 86, y: 96, d: 0 },
        { x: 112, y: 110, d: 0.6 },
        { x: 98, y: 126, d: 1.1 },
      ].map((c, i) => (
        <motion.rect
          key={i}
          x={c.x} y={c.y} width={18} height={18} rx={4}
          transform={`rotate(${i * 18 - 12} ${c.x + 9} ${c.y + 9})`}
          fill={GOLD} opacity={0.16} stroke={GOLD_HI} strokeWidth={2} style={spin}
          animate={still ? {} : { y: [0, -4, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: c.d }}
        />
      ))}
    </svg>
  );
}

/* ---- drifting coffee beans ------------------------------------------------- */
function BeansDrift({ className }: ArtProps) {
  const still = useReducedMotion();
  const beans = [
    { x: 70, y: 80, s: 1.1, dur: 7, dl: 0 },
    { x: 120, y: 70, s: 0.85, dur: 8.5, dl: 0.8 },
    { x: 100, y: 118, s: 1.25, dur: 6.5, dl: 0.4 },
    { x: 78, y: 132, s: 0.8, dur: 9, dl: 1.2 },
    { x: 134, y: 124, s: 0.95, dur: 7.8, dl: 0.6 },
  ];
  return (
    <svg {...base} className={className} aria-hidden>
      {beans.map((b, i) => (
        <motion.g
          key={i}
          style={spin}
          transform={`translate(${b.x} ${b.y}) scale(${b.s})`}
          animate={still ? {} : { rotate: [0, 360], y: [0, -6, 0] }}
          transition={{
            rotate: { duration: b.dur * 2.5, repeat: Infinity, ease: "linear" },
            y: { duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.dl },
          }}
        >
          <ellipse cx={0} cy={0} rx={11} ry={16} stroke={i % 2 ? GOLD_HI : GOLD} />
          <path d="M-4.5 -12C2 -6 2 6 -4.5 12" stroke={i % 2 ? GOLD_HI : GOLD} strokeWidth={2.4} />
        </motion.g>
      ))}
    </svg>
  );
}

/* ---- breakfast plate: egg + croissant + soft steam ------------------------- */
function BreakfastPlate({ className }: ArtProps) {
  const still = useReducedMotion();
  return (
    <svg {...base} className={className} aria-hidden>
      {[84, 116].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 56c-6 6-6 11 0 17`}
          stroke={GOLD_HI} strokeWidth={2.2} opacity={0.4} style={spin}
          animate={still ? {} : { opacity: [0.1, 0.45, 0.1], y: [1, -7, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}
      {/* plate */}
      <ellipse cx={100} cy={124} rx={64} ry={26} />
      <ellipse cx={100} cy={124} rx={50} ry={18} opacity={0.45} />
      {/* fried egg */}
      <path d="M74 122c-10 0-16-8-12-15s16-7 20-1 14 2 18 6-2 13-12 12-8-2-14-2Z" />
      <motion.circle
        cx={82} cy={116} r={7} fill={GOLD} stroke="none"
        animate={still ? {} : { scale: [1, 1.08, 1] }}
        style={spin}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* croissant */}
      <path d="M118 118c10-6 22-4 26 3 3 6-3 13-13 13-8 0-12-4-18-6" stroke={GOLD_HI} />
      <path d="M120 122l24 8M126 116l14 18" stroke={GOLD_HI} strokeWidth={2} opacity={0.7} />
    </svg>
  );
}

/* ---- dessert slice: layered cake + cherry + twinkles ----------------------- */
function DessertSlice({ className }: ArtProps) {
  const still = useReducedMotion();
  return (
    <svg {...base} className={className} aria-hidden>
      {/* slice */}
      <path d="M64 150 100 84l36 66Z" />
      <path d="M75 128h50" opacity={0.6} />
      <path d="M86 106h28" opacity={0.6} />
      <path d="M64 150h72" />
      {/* cherry */}
      <circle cx={100} cy={74} r={9} fill={GOLD} stroke={GOLD_HI} strokeWidth={2} />
      <path d="M100 65c2-8 8-12 14-12" stroke={GOLD_HI} strokeWidth={2.4} />
      {/* twinkles */}
      {[
        { x: 78, y: 88, d: 0 },
        { x: 126, y: 96, d: 0.7 },
        { x: 112, y: 132, d: 1.3 },
      ].map((s, i) => (
        <motion.path
          key={i}
          d={`M${s.x} ${s.y - 6}v12M${s.x - 6} ${s.y}h12`}
          stroke={GOLD_HI} strokeWidth={2.4} style={spin}
          animate={still ? { opacity: 0.4 } : { opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: s.d }}
        />
      ))}
    </svg>
  );
}

/* ---- pour-over: kettle stream + drip into cup ------------------------------ */
function PourOver({ className }: ArtProps) {
  const still = useReducedMotion();
  return (
    <svg {...base} className={className} aria-hidden>
      {/* dripper */}
      <path d="M70 64h60l-16 26H86L70 64Z" />
      <path d="M64 64h72" />
      {/* stream */}
      <motion.path
        d="M100 92v34" stroke={GOLD_HI} strokeWidth={3}
        animate={still ? {} : { opacity: [0.25, 0.9, 0.25] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* falling drop */}
      {!still && (
        <motion.circle
          cx={100} r={3} fill={GOLD_HI} stroke="none"
          animate={{ cy: [96, 126], opacity: [0, 1, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeIn" }}
        />
      )}
      {/* cup */}
      <path d="M68 128h64l-6 30a14 14 0 0 1-13.8 11H87.8A14 14 0 0 1 74 158l-6-30Z" />
      <path d="M132 134c15 2 15 24 0 26" />
      <path d="M60 169h80" />
    </svg>
  );
}

const MAP: Record<string, ComponentType<ArtProps>> = {
  latte: SteamingCup,
  hot: SteamingCup,
  cold: IcedDrink,
  iced: IcedDrink,
  beans: BeansDrift,
  interior: BeansDrift, // ambiance — drifting beans read as warmth
  breakfast: BreakfastPlate,
  dessert: DessertSlice,
  counter: PourOver,
};

export function CafeArt({ kind, className }: { kind: string; className?: string }) {
  const Art = MAP[kind] ?? SteamingCup;
  return <Art className={className} />;
}
