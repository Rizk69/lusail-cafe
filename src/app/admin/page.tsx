"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { listDocs, seedFromDefaults } from "@/lib/admin/crud";
import { AdminButton, Card, SectionTitle } from "@/components/admin/ui";

const CARDS = [
  { coll: "menu", label: "فئات المنيو", href: "/admin/menu" },
  { coll: "gallery", label: "صور المعرض", href: "/admin/gallery" },
  { coll: "signatures", label: "التوقيعات", href: "/admin/signatures" },
  { coll: "branches", label: "الفروع", href: "/admin/branches" },
  { coll: "reviews", label: "التقييمات", href: "/admin/reviews" },
  { coll: "messages", label: "الرسائل", href: "/admin/messages" },
];

export default function Overview() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    const entries = await Promise.all(
      CARDS.map(async (c) => [c.coll, (await listDocs(c.coll).catch(() => [])).length] as const),
    );
    setCounts(Object.fromEntries(entries));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const seed = async () => {
    if (!confirm("سيكتب المحتوى الحالي للموقع إلى قاعدة البيانات كنقطة بداية. متابعة؟")) return;
    setStatus("جارٍ زرع البيانات…");
    try {
      await seedFromDefaults();
      setStatus("تم زرع البيانات ✓");
      await load();
    } catch (e: any) {
      setStatus("خطأ: " + e.message);
    }
  };

  const empty = Object.values(counts).every((n) => n === 0) && Object.keys(counts).length > 0;

  return (
    <div>
      <SectionTitle title="نظرة عامة" />

      {empty && (
        <Card className="mb-6 border-brass/30">
          <p className="text-sm text-cream">قاعدة البيانات فارغة.</p>
          <p className="mt-1 text-xs text-sand/70">
            اضغط الزر لزرع محتوى الموقع الحالي (المنيو، الصور، الفروع، التقييمات، الإعدادات) كبداية، ثم عدّله من القوائم.
          </p>
          <AdminButton className="mt-3" onClick={seed}>
            زرع المحتوى الافتراضي
          </AdminButton>
          {status && <p className="mt-2 text-xs text-brass">{status}</p>}
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CARDS.map((c) => (
          <Link key={c.coll} href={c.href}>
            <Card className="transition-colors hover:border-brass/40">
              <p className="font-display text-3xl text-brass">{counts[c.coll] ?? "—"}</p>
              <p className="mt-1 text-sm text-sand/80">{c.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {!empty && status && <p className="mt-4 text-xs text-brass">{status}</p>}
      {!empty && (
        <div className="mt-6">
          <AdminButton variant="outline" onClick={seed}>
            إعادة زرع المحتوى الافتراضي
          </AdminButton>
        </div>
      )}
    </div>
  );
}
