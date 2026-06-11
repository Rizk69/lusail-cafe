"use client";

/* ============================================================================
   LocaleProvider — bilingual AR/EN state shared across the whole site.
   - Default locale = Arabic (RTL), matching the server-rendered <html>.
   - Persists the choice to localStorage and reflects it onto <html lang|dir>.
   - useLocale() exposes: locale, setLocale, toggle, dir, t (messages), pick().
============================================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  dir as dirOf,
  messages,
  type Bi,
  type Locale,
  type Messages,
} from "./i18n";

const STORAGE_KEY = "lusail-locale";

type Ctx = {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Messages;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** Read a bilingual value from content.ts in the active language. */
  pick: (b: Bi) => string;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // hydrate from storage after mount (first render must match the server)
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLocaleState(stored);
  }, []);

  // reflect onto <html> + persist
  useEffect(() => {
    const el = document.documentElement;
    el.lang = locale;
    el.dir = dirOf(locale);
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(
    () => setLocaleState((l) => (l === "ar" ? "en" : "ar")),
    [],
  );

  const value = useMemo<Ctx>(
    () => ({
      locale,
      dir: dirOf(locale),
      t: messages[locale],
      setLocale,
      toggle,
      pick: (b: Bi) => b[locale],
    }),
    [locale, setLocale, toggle],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}
