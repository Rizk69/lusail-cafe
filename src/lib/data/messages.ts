/* Customer messages / reservations — written from the public contact form,
   read in the dashboard inbox. No-ops gracefully when Firebase is unconfigured. */

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";

export type NewMessage = { name: string; message: string; phone?: string };

/** Saves a message to Firestore. Returns true if stored, false if not configured. */
export async function submitMessage(data: NewMessage): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await addDoc(collection(db, "messages"), {
      name: data.name,
      message: data.message,
      phone: data.phone ?? "",
      status: "new",
      createdAt: serverTimestamp(),
    });
    return true;
  } catch {
    return false;
  }
}
