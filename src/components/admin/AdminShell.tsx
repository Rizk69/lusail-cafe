"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/admin/AuthProvider";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/menu", label: "المنيو والأسعار" },
  { href: "/admin/gallery", label: "المعرض والصور" },
  { href: "/admin/signatures", label: "التوقيعات" },
  { href: "/admin/branches", label: "الفروع" },
  { href: "/admin/reviews", label: "التقييمات" },
  { href: "/admin/messages", label: "الرسائل والحجوزات" },
  { href: "/admin/settings", label: "الإعدادات" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div dir="rtl" className="flex min-h-screen bg-pine">
      {/* sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-e border-line/60 bg-ink/60 p-4 md:flex">
        <Link href="/admin" className="mb-6 flex items-center gap-2.5 px-2">
          <LogoMark decorative className="h-9 w-9" />
          <span className="font-display text-cream">لوحة لوسيل</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm transition-colors",
                  active ? "bg-brass text-ink font-semibold" : "text-sand hover:bg-forest/60 hover:text-cream",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 space-y-1 border-t border-line/60 pt-4">
          <Link href="/" className="block rounded-xl px-3 py-2 text-sm text-sand hover:text-brass">
            ← عرض الموقع
          </Link>
          <button
            onClick={() => signOut()}
            className="block w-full rounded-xl px-3 py-2 text-start text-sm text-clay-soft hover:bg-clay/10"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile top bar */}
        <header className="flex items-center justify-between gap-3 border-b border-line/60 bg-ink/60 px-4 py-3 md:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <LogoMark decorative className="h-7 w-7" />
            <span className="font-display text-sm text-cream">لوحة لوسيل</span>
          </Link>
          <button onClick={() => signOut()} className="text-xs text-clay-soft">
            خروج
          </button>
        </header>

        {/* mobile nav (scrollable chips) */}
        <nav className="flex gap-2 overflow-x-auto border-b border-line/60 bg-ink/40 px-4 py-2 md:hidden">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-xs",
                  active ? "bg-brass text-ink" : "border border-line text-sand",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
          <p className="mb-4 text-xs text-sand/50">{user?.email}</p>
          {children}
        </main>
      </div>
    </div>
  );
}
