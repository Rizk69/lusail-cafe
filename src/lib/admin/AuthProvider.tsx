"use client";

/* Admin authentication via Firebase Auth (email/password). Only emails listed
   in NEXT_PUBLIC_ADMIN_EMAILS may enter the dashboard (if the list is empty,
   any authenticated user is allowed). */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

type AuthState = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        setLoading(false);
        return;
      }
      return onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      });
    } catch (e) {
      console.error("Auth init failed", e);
      setLoading(false);
    }
  }, []);

  const isAdmin =
    !!user && (ADMIN_EMAILS.length === 0 || ADMIN_EMAILS.includes((user.email ?? "").toLowerCase()));

  const signIn = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Firebase not configured");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    const auth = getFirebaseAuth();
    if (auth) await fbSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, configured: isFirebaseConfigured, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
