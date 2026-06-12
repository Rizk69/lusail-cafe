/* ============================================================================
   Firebase client — lazily initialised and FULLY GUARDED. If the env vars are
   not set yet, every getter returns null and the app falls back to the static
   content in content.ts. So the public site never breaks before Firebase is
   wired. Fill the NEXT_PUBLIC_FIREBASE_* vars (see .env.local.example) to go live.
============================================================================ */

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True only when the minimum required config is present. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

function ensureApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null;
  return getApps().length ? getApp() : initializeApp(firebaseConfig as Record<string, string>);
}

/** Firestore handle (safe on server & client) — null when unconfigured. */
export function getDb(): Firestore | null {
  const app = ensureApp();
  return app ? getFirestore(app) : null;
}

/** Auth handle (client only) — null when unconfigured. */
export function getFirebaseAuth(): Auth | null {
  const app = ensureApp();
  return app ? getAuth(app) : null;
}

/** Storage handle (client only) — null when unconfigured. */
export function getFirebaseStorage(): FirebaseStorage | null {
  const app = ensureApp();
  return app ? getStorage(app) : null;
}
