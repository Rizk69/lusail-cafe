"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee. Renders two copies of `children` side by side and
 * translates by -50%, so the loop is gapless. Pure CSS animation (no JS/scroll).
 */
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0",
          reverse ? "animate-[marquee-rev_38s_linear_infinite]" : "animate-[marquee_38s_linear_infinite]",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
