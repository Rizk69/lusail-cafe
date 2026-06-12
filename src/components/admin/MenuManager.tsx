"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";
import type { Bi } from "@/lib/i18n";
import { listDocs, saveDoc, createDoc, removeDoc } from "@/lib/admin/crud";
import { BiInput, TextInput, AdminButton, Card, SectionTitle, Field } from "@/components/admin/ui";

type MItem = { name: Bi; price: string; tag?: Bi; desc?: Bi };
type Cat = { id?: string; name: Bi; items: MItem[]; order?: number };

const bi = (): Bi => ({ ar: "", en: "" });
const blankItem = (): MItem => ({ name: bi(), price: "", tag: bi() });

function CategoryEditor({ initial, index, onChanged }: { initial: Cat; index: number; onChanged: () => void }) {
  const [draft, setDraft] = useState<Cat>(initial);
  const [status, setStatus] = useState("");

  const setItem = (i: number, patch: Partial<MItem>) =>
    setDraft((d) => ({ ...d, items: d.items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)) }));

  const save = async () => {
    setStatus("جارٍ الحفظ…");
    try {
      const items = draft.items.map((it) => {
        const o: any = { name: it.name, price: it.price };
        if (it.tag && (it.tag.ar || it.tag.en)) o.tag = it.tag;
        if (it.desc && (it.desc.ar || it.desc.en)) o.desc = it.desc;
        return o;
      });
      if (draft.id) {
        await saveDoc("menu", draft.id, { name: draft.name, items, order: draft.order ?? index });
      } else {
        await createDoc("menu", { name: draft.name, items, order: index });
      }
      setStatus("تم الحفظ ✓");
      onChanged();
    } catch (e: any) {
      setStatus("خطأ: " + e.message);
    }
  };

  const del = async () => {
    if (!draft.id || !confirm("حذف هذه الفئة وكل أصنافها؟")) return;
    await removeDoc("menu", draft.id);
    onChanged();
  };

  return (
    <Card className="space-y-4">
      <BiInput label="اسم الفئة" value={draft.name} onChange={(v) => setDraft((d) => ({ ...d, name: v }))} />

      <div className="space-y-3">
        <p className="text-xs text-sand/60">الأصناف</p>
        {draft.items.map((it, i) => (
          <div key={i} className="rounded-xl border border-line/60 bg-ink/40 p-3">
            <BiInput label={`الصنف ${i + 1}`} value={it.name} onChange={(v) => setItem(i, { name: v })} />
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <Field label="السعر">
                <TextInput dir="ltr" value={it.price} onChange={(e) => setItem(i, { price: e.target.value })} />
              </Field>
            </div>
            <div className="mt-2">
              <BiInput label="وسم (اختياري: الأكثر طلباً…)" value={it.tag ?? bi()} onChange={(v) => setItem(i, { tag: v })} />
            </div>
            <div className="mt-2 text-end">
              <AdminButton
                variant="danger"
                className="px-3 py-1 text-xs"
                onClick={() => setDraft((d) => ({ ...d, items: d.items.filter((_, idx) => idx !== i) }))}
              >
                حذف الصنف
              </AdminButton>
            </div>
          </div>
        ))}
        <AdminButton variant="outline" onClick={() => setDraft((d) => ({ ...d, items: [...d.items, blankItem()] }))}>
          + إضافة صنف
        </AdminButton>
      </div>

      {status && <p className="text-xs text-brass">{status}</p>}
      <div className="flex gap-2">
        <AdminButton onClick={save}>حفظ الفئة</AdminButton>
        <AdminButton variant="danger" onClick={del}>حذف الفئة</AdminButton>
      </div>
    </Card>
  );
}

export function MenuManager() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setCats(await listDocs<Cat>("menu"));
    } catch {
      setCats([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addCategory = () => setCats((c) => [...c, { name: { ar: "فئة جديدة", en: "New category" }, items: [] }]);

  return (
    <div>
      <SectionTitle title="المنيو والأسعار" action={<AdminButton onClick={addCategory}>+ فئة جديدة</AdminButton>} />
      {loading ? (
        <p className="text-sm text-sand/60">جارٍ التحميل…</p>
      ) : (
        <div className="space-y-6">
          {cats.map((cat, i) => (
            <CategoryEditor key={cat.id ?? `new-${i}`} initial={cat} index={i} onChanged={load} />
          ))}
          {cats.length === 0 && (
            <p className="text-sm text-sand/60">لا توجد فئات بعد. اضغط «فئة جديدة» أو ازرع البيانات من «نظرة عامة».</p>
          )}
        </div>
      )}
    </div>
  );
}
