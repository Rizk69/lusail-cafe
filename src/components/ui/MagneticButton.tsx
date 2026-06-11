"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "clay";

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-gradient-to-b from-brass-bright to-brass text-ink shadow-[0_10px_30px_-12px_rgba(201,162,94,0.7)] hover:shadow-[0_14px_40px_-10px_rgba(201,162,94,0.85)]",
  clay:
    "bg-gradient-to-b from-clay-soft to-clay text-ink shadow-[0_10px_30px_-12px_rgba(199,107,67,0.7)] hover:shadow-[0_14px_40px_-10px_rgba(199,107,67,0.85)]",
  outline:
    "border border-brass/45 text-cream hover:border-brass hover:bg-brass/10",
};

/**
 * Magnetic CTA. Renders <a> when `href` is set (external links open in a new
 * tab automatically), otherwise <button>. Includes a hover sheen sweep.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18 });
  const y = useSpring(my, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[box-shadow,border-color,background-color] duration-300 will-change-transform",
    VARIANTS[variant],
    className,
  );

  const inner = (
    <>
      <span className="sheen-layer rounded-full" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const external = href?.startsWith("http");

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x, y }}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={classes}
    >
      {inner}
    </motion.button>
  );
}
