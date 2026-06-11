"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "rise" | "scale" | "clip" | "fade";

/**
 * Scroll-triggered cinematic reveal.
 *   rise  → fade + translate up (default)
 *   scale → rise + subtle scale-up (cards / media)
 *   clip  → curtain wipe from the bottom (headers / media)
 *   fade  → opacity only
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  variant = "rise",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  variant?: RevealVariant;
  className?: string;
}) {
  const variants: Record<RevealVariant, Variants> = {
    rise: { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } },
    scale: { hidden: { opacity: 0, y, scale: 0.965 }, show: { opacity: 1, y: 0, scale: 1 } },
    clip: {
      hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
      show: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
    },
    fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  };

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container — children wrapped in <RevealItem> animate in sequence.
 * Put RevealStagger on a wrapper and RevealItem on each child.
 */
export function RevealStagger({
  children,
  stagger = 0.1,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  y = 24,
  className,
}: {
  children: ReactNode;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
