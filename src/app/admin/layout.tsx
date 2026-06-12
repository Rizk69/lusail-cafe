"use client";

import type { ReactNode } from "react";
import { AuthProvider, useAuth } from "@/lib/admin/AuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Login } from "@/components/admin/Login";
import { AdminButton } from "@/components/admin/ui";

function ConfigNeeded() {
  return (
    <div dir="rtl" className="grid min-h-screen place-items-center px-5">
      <div className="max-w-md rounded-3xl border border-line/70 bg-forest/50 p-7 text-center">
        <h1 className="font-display text-xl text-cream">Firebase غير مُعدّ بعد</h1>
        <p className="mt-3 text-sm leading-relaxed text-sand/75">
          لتشغيل لوحة التحكّم، أنشئ مشروع Firebase وأضف بيانات الإعداد في الملف{" "}
          <code className="text-brass">.env.local</code> (انظر{" "}
          <code className="text-brass">SETUP-FIREBASE.md</code>) ثم أعد التشغيل.
        </p>
        <p className="mt-3 text-xs text-sand/50">
          الموقع العام يعمل الآن بالمحتوى الافتراضي حتى يتم الربط.
        </p>
      </div>
    </div>
  );
}

function NotAuthorized() {
  const { user, signOut } = useAuth();
  return (
    <div dir="rtl" className="grid min-h-screen place-items-center px-5">
      <div className="max-w-md rounded-3xl border border-line/70 bg-forest/50 p-7 text-center">
        <h1 className="font-display text-xl text-cream">غير مصرّح</h1>
        <p className="mt-3 text-sm text-sand/75">
          الحساب <span className="text-brass">{user?.email}</span> غير مُدرج كمشرف. أضف بريده إلى{" "}
          <code className="text-brass">NEXT_PUBLIC_ADMIN_EMAILS</code>.
        </p>
        <AdminButton variant="outline" className="mt-5" onClick={() => signOut()}>
          تسجيل الخروج
        </AdminButton>
      </div>
    </div>
  );
}

function Gate({ children }: { children: ReactNode }) {
  const { configured, loading, user, isAdmin } = useAuth();

  if (!configured) return <ConfigNeeded />;
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brass border-t-transparent" />
      </div>
    );
  }
  if (!user) return <Login />;
  if (!isAdmin) return <NotAuthorized />;
  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Gate>{children}</Gate>
    </AuthProvider>
  );
}
