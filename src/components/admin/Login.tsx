"use client";

import { useState } from "react";
import { useAuth } from "@/lib/admin/AuthProvider";
import { LogoMark } from "@/components/ui/Logo";
import { TextInput, AdminButton, Field } from "@/components/admin/ui";

export function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(email.trim(), password);
    } catch {
      setError("بيانات الدخول غير صحيحة. تأكّد من البريد وكلمة المرور.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl border border-line/70 bg-forest/50 p-7">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <LogoMark decorative className="h-14 w-14" />
          <div>
            <h1 className="font-display text-xl text-cream">لوحة تحكّم لوسيل</h1>
            <p className="mt-1 text-xs text-sand/60">سجّل الدخول لإدارة محتوى الموقع</p>
          </div>
        </div>

        <div className="space-y-4">
          <Field label="البريد الإلكتروني">
            <TextInput
              type="email"
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@lusail.com"
              required
            />
          </Field>
          <Field label="كلمة المرور">
            <TextInput
              type="password"
              dir="ltr"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>

          {error && <p className="text-xs text-clay-soft">{error}</p>}

          <AdminButton type="submit" disabled={busy} className="w-full">
            {busy ? "جارٍ الدخول…" : "دخول"}
          </AdminButton>
        </div>
      </form>
    </div>
  );
}
