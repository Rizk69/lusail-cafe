"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Eyebrow + display title + optional subtitle, with a cinematic reveal. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn("flex items-center gap-3 text-brass", centered && "justify-center")}
        >
          <span className="h-px w-8 bg-brass/60" />
          <span className="eyebrow font-medium">{eyebrow}</span>
          <span className="h-px w-8 bg-brass/60" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl leading-[1.1] text-cream sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={cn("max-w-2xl text-base text-sand/80 sm:text-lg", centered && "mx-auto")}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
