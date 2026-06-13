/* Admin-only Firestore + Storage operations used by the dashboard. All writes
   require an authenticated admin (enforced by the security rules). */

import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDb, getFirebaseStorage } from "@/lib/firebase/client";
import { MENU, GALLERY, BRANCHES, REVIEWS, SIGNATURES, SITE, STATS } from "@/lib/content";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = Record<string, any>;

function db() {
  const d = getDb();
  if (!d) throw new Error("Firebase not configured");
  return d;
}

export async function listDocs<T extends Doc = Doc>(coll: string): Promise<(T & { id: string })[]> {
  const snap = await getDocs(collection(db(), coll));
  const rows = snap.docs.map((d) => ({ ...(d.data() as T), id: d.id }));
  rows.sort((a, b) => ((a as Doc).order ?? 0) - ((b as Doc).order ?? 0));
  return rows;
}

export async function saveDoc(coll: string, id: string, data: Doc) {
  await setDoc(doc(db(), coll, id), data, { merge: true });
}

export async function createDoc(coll: string, data: Doc): Promise<string> {
  const r = await addDoc(collection(db(), coll), data);
  return r.id;
}

export async function removeDoc(coll: string, id: string) {
  await deleteDoc(doc(db(), coll, id));
}

export async function getSettingsDoc(): Promise<Doc | null> {
  const s = await getDoc(doc(db(), "settings", "site"));
  return s.exists() ? (s.data() as Doc) : null;
}

export async function saveSettings(data: Doc) {
  await setDoc(doc(db(), "settings", "site"), data, { merge: true });
}

/** Upload an image to Storage and return its public download URL. */
export async function uploadImage(file: File, path: string): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Storage not configured (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?)");
  // sanitize so reserved/Unicode chars can't create odd object paths
  const safe = path.replace(/[^a-zA-Z0-9._/-]/g, "_");
  const r = ref(storage, safe);
  await uploadBytes(r, file);
  return getDownloadURL(r);
}

/** One-click: write the current static content into Firestore (initial seed). */
export async function seedFromDefaults() {
  const d = db();
  const batch = writeBatch(d);
  MENU.forEach((c, i) => batch.set(doc(d, "menu", c.id), { ...c, order: i }));
  GALLERY.forEach((g, i) => batch.set(doc(d, "gallery", g.id), { ...g, order: i }));
  BRANCHES.forEach((b, i) => batch.set(doc(d, "branches", b.id), { ...b, order: i }));
  SIGNATURES.forEach((s, i) => batch.set(doc(d, "signatures", s.id), { ...s, order: i }));
  REVIEWS.forEach((r, i) => batch.set(doc(d, "reviews", `review-${i + 1}`), { ...r, order: i }));
  batch.set(doc(d, "settings", "site"), {
    phoneDisplay: SITE.phoneDisplay,
    phoneTel: SITE.phoneTel,
    whatsapp: SITE.whatsapp,
    instagram: SITE.instagram,
    facebook: SITE.facebook,
    talabat: SITE.talabat,
    cityRegion: SITE.cityRegion,
    stats: STATS,
  });
  await batch.commit();
}
