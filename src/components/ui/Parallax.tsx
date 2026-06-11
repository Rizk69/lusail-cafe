"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/** Vertical parallax drift as the element passes through the viewport. */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const { scrollYProgress } = useScroll({
    target: ready ? ref : undefined,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  );
}
