"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";
import { listDocs, saveDoc, removeDoc } from "@/lib/admin/crud";
import { AdminButton, Card, SectionTitle } from "@/components/admin/ui";

const fmt = (ts: any) => (ts?.seconds ? new Date(ts.seconds * 1000).toLocaleString("ar-EG") : "");

export default function MessagesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await listDocs<any>("messages");
      rows.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
      setItems(rows);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markDone = async (it: any) => {
    await saveDoc("messages", it.id, { status: it.status === "done" ? "new" : "done" });
    await load();
  };
  const del = async (it: any) => {
    if (!confirm("حذف الرسالة؟")) return;
    await removeDoc("messages", it.id);
    await load();
  };

  return (
    <div>
      <SectionTitle title="الرسائل والحجوزات" action={<AdminButton variant="outline" onClick={load}>تحديث</AdminButton>} />

      {loading ? (
        <p className="text-sm text-sand/60">جارٍ التحميل…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-sand/60">لا توجد رسائل بعد. الرسائل المرسلة من نموذج «تواصل معنا» تظهر هنا.</p>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <Card key={it.id} className={it.status === "done" ? "opacity-60" : ""}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-cream">
                    {it.name || "بدون اسم"}
                    {it.phone && <span dir="ltr" className="ms-2 text-xs text-sand/60">{it.phone}</span>}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-sand/85">{it.message}</p>
                  <p className="mt-2 text-[11px] text-sand/45">{fmt(it.createdAt)}</p>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <AdminButton variant="outline" className="px-3 py-1 text-xs" onClick={() => markDone(it)}>
                    {it.status === "done" ? "إرجاع" : "تمّت المعالجة"}
                  </AdminButton>
                  <AdminButton variant="danger" className="px-3 py-1 text-xs" onClick={() => del(it)}>
                    حذف
                  </AdminButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
