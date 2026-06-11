"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts up to a numeric value when scrolled into view. Preserves any non-digit
 * prefix/suffix (e.g. "+60", "+5K", "4.8") and the original decimal precision.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;

  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match) return;
    if (!inView || reduce) {
      setN(target);
      return;
    }
    const duration = 1400;
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, match]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
