"use client";

/* Brand intro curtain — draws the Lusail wordmark over a gilded ring of steam,
   then wipes upward to reveal the site. Shows once per browser session. */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/LocaleProvider";
import { LogoMark } from "@/components/ui/Logo";

const SESSION_KEY = "lusail-intro-seen";

export function Preloader() {
  const { t, dir } = useLocale();
  const [visible, setVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }
    setArmed(true);
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
    }, 2300);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!armed && !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          dir={dir}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex h-44 w-44 items-center justify-center">
            {/* drawing ring */}
            <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90 text-brass">
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </motion.svg>

            {/* steam */}
            <div className="absolute -top-2 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-6 w-[3px] rounded-full bg-brass/50"
                  initial={{ opacity: 0, scaleY: 0.4, y: 6 }}
                  animate={{ opacity: [0, 0.8, 0], scaleY: [0.4, 1.1, 0.6], y: [6, -8, -14] }}
                  transition={{ duration: 1.8, delay: 0.5 + i * 0.18, repeat: Infinity, repeatDelay: 0.2 }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <LogoMark decorative title={t.brand.full} className="h-[5.5rem] w-[5.5rem]" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="font-display text-3xl tracking-wide text-cream">{t.brand.full}</p>
            <p className="eyebrow mt-2 text-brass/70">{t.brand.tagline}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
