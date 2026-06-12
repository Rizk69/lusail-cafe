/* ============================================================================
   Site data layer — the single source the public site reads from. It tries
   Firestore first and falls back to the static content in content.ts whenever
   Firebase is not configured or a read fails. Shapes match content.ts exactly,
   so the UI is identical whether data comes from Firestore or the fallback.
============================================================================ */

import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase/client";
import type { Bi } from "@/lib/i18n";
import {
  MENU,
  GALLERY,
  BRANCHES,
  REVIEWS,
  SIGNATURES,
  STATS,
  SITE,
  type MenuCategory,
  type GalleryItem,
  type Branch,
  type Review,
  type Signature,
  type Stat,
} from "@/lib/content";

export type Settings = {
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  talabat: string;
  cityRegion: Bi;
  stats: Stat[];
};

export type SiteData = {
  menu: MenuCategory[];
  gallery: GalleryItem[];
  branches: Branch[];
  reviews: Review[];
  signatures: Signature[];
  settings: Settings;
};

/** Static fallback assembled from content.ts — always valid, never throws. */
export const FALLBACK_SITE_DATA: SiteData = {
  menu: MENU,
  gallery: GALLERY,
  branches: BRANCHES,
  reviews: REVIEWS,
  signatures: SIGNATURES,
  settings: {
    phoneDisplay: SITE.phoneDisplay,
    phoneTel: SITE.phoneTel,
    whatsapp: SITE.whatsapp,
    instagram: SITE.instagram,
    facebook: SITE.facebook,
    talabat: SITE.talabat,
    cityRegion: SITE.cityRegion,
    stats: STATS,
  },
};

async function readCollection<T>(name: string): Promise<T[] | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await getDocs(query(collection(db, name), orderBy("order")));
    if (snap.empty) return null;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
  } catch {
    return null;
  }
}

async function readSettings(): Promise<Settings | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, "settings", "site"));
    return snap.exists() ? ({ ...FALLBACK_SITE_DATA.settings, ...snap.data() } as Settings) : null;
  } catch {
    return null;
  }
}

/** Fetch everything, each piece falling back to static content independently. */
export async function fetchSiteData(): Promise<SiteData> {
  if (!isFirebaseConfigured) return FALLBACK_SITE_DATA;

  const [menu, gallery, branches, reviews, signatures, settings] = await Promise.all([
    readCollection<MenuCategory>("menu"),
    readCollection<GalleryItem>("gallery"),
    readCollection<Branch>("branches"),
    readCollection<Review>("reviews"),
    readCollection<Signature>("signatures"),
    readSettings(),
  ]);

  return {
    menu: menu ?? FALLBACK_SITE_DATA.menu,
    gallery: gallery ?? FALLBACK_SITE_DATA.gallery,
    branches: branches ?? FALLBACK_SITE_DATA.branches,
    reviews: reviews ?? FALLBACK_SITE_DATA.reviews,
    signatures: signatures ?? FALLBACK_SITE_DATA.signatures,
    settings: settings ?? FALLBACK_SITE_DATA.settings,
  };
}
