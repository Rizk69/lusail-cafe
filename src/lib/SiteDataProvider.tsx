"use client";

/* Supplies live site content to the public components. Starts from the static
   fallback (so SSR and first paint show real content with no flash or hydration
   mismatch), then hydrates from Firestore on mount when configured. */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchSiteData, FALLBACK_SITE_DATA, type SiteData } from "@/lib/data/site-data";

const SiteDataContext = createContext<SiteData>(FALLBACK_SITE_DATA);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(FALLBACK_SITE_DATA);

  useEffect(() => {
    let alive = true;
    fetchSiteData()
      .then((d) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

export const useSiteData = () => useContext(SiteDataContext);
