"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
import type { Bi } from "@/lib/i18n";
import { listDocs, saveDoc, createDoc, removeDoc, uploadImage } from "@/lib/admin/crud";
import {
  BiInput,
  TextInput,
  TextArea,
  Field,
  AdminButton,
  Card,
  SectionTitle,
} from "@/components/admin/ui";

export type FieldType = "text" | "textarea" | "number" | "bool" | "bi" | "bi-textarea" | "image";
export type FieldDef = { key: string; label: string; type: FieldType };

type Item = Record<string, any> & { id?: string };
const emptyBi: Bi = { ar: "", en: "" };

export function CollectionManager({
  coll,
  title,
  fields,
  blank,
  itemLabel,
}: {
  coll: string;
  title: string;
  fields: FieldDef[];
  blank: () => Item;
  itemLabel: (it: Item) => string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [draft, setDraft] = useState<Item | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listDocs(coll));
    } catch (e: any) {
      setStatus("خطأ في التحميل: " + e.message);
    }
    setLoading(false);
  }, [coll]);

  useEffect(() => {
    load();
  }, [load]);

  const set = (k: string, v: any) => setDraft((d) => (d ? { ...d, [k]: v } : d));

  const save = async () => {
    if (!draft) return;
    setStatus("جارٍ الحفظ…");
    try {
      if (isNew) {
        const order = Math.max(-1, ...items.map((it) => (it as Item).order ?? -1)) + 1;
        await createDoc(coll, { ...draft, order });
      } else {
        const { id, ...data } = draft;
        await saveDoc(coll, id as string, data);
      }
      setDraft(null);
      await load();
      setStatus("تم الحفظ ✓");
    } catch (e: any) {
      setStatus("خطأ: " + e.message);
    }
  };

  const del = async (it: Item) => {
    if (!it.id || !confirm("حذف هذا العنصر نهائياً؟")) return;
    try {
      await removeDoc(coll, it.id);
      await load();
    } catch (e: any) {
      setStatus("خطأ بالحذف: " + e.message);
    }
  };

  const onImage = async (key: string, file: File) => {
    setStatus("جارٍ رفع الصورة…");
    try {
      const url = await uploadImage(file, `${coll}/${Date.now()}-${file.name}`);
      set(key, url);
      setStatus("تم رفع الصورة ✓");
    } catch (e: any) {
      setStatus("خطأ بالرفع: " + e.message);
    }
  };

  return (
    <div>
      <SectionTitle
        title={title}
        action={<AdminButton onClick={() => { setDraft(blank()); setIsNew(true); }}>+ إضافة</AdminButton>}
      />

      {status && <p className="mb-4 text-xs text-brass">{status}</p>}

      {/* editor */}
      {draft && (
        <Card className="mb-6 space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              {f.type === "bi" && <BiInput label={f.label} value={(draft[f.key] as Bi) ?? emptyBi} onChange={(v) => set(f.key, v)} />}
              {f.type === "bi-textarea" && <BiInput label={f.label} textarea value={(draft[f.key] as Bi) ?? emptyBi} onChange={(v) => set(f.key, v)} />}
              {f.type === "text" && (
                <Field label={f.label}>
                  <TextInput value={draft[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
                </Field>
              )}
              {f.type === "textarea" && (
                <Field label={f.label}>
                  <TextArea rows={2} value={draft[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
                </Field>
              )}
              {f.type === "number" && (
                <Field label={f.label}>
                  <TextInput
                    type="number"
                    value={draft[f.key] ?? ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      set(f.key, v === "" ? "" : Number(v));
                    }}
                  />
                </Field>
              )}
              {f.type === "bool" && (
                <label className="flex items-center gap-2 text-sm text-sand">
                  <input type="checkbox" checked={!!draft[f.key]} onChange={(e) => set(f.key, e.target.checked)} />
                  {f.label}
                </label>
              )}
              {f.type === "image" && (
                <Field label={f.label}>
                  {draft[f.key] && (
                    <img src={draft[f.key]} alt="" className="mb-2 h-32 w-full rounded-xl object-cover" />
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && onImage(f.key, e.target.files[0])}
                      className="text-xs text-sand"
                    />
                  </div>
                  <TextInput
                    dir="ltr"
                    className="mt-2"
                    placeholder="/gallery/photo.jpg أو رابط"
                    value={draft[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                  />
                </Field>
              )}
            </div>
          ))}

          <div className="flex gap-2">
            <AdminButton onClick={save}>حفظ</AdminButton>
            <AdminButton variant="outline" onClick={() => setDraft(null)}>إلغاء</AdminButton>
          </div>
        </Card>
      )}

      {/* list */}
      {loading ? (
        <p className="text-sm text-sand/60">جارٍ التحميل…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-sand/60">لا توجد عناصر بعد. اضغط «إضافة» لإنشاء أول عنصر.</p>
      ) : (
        <div className="space-y-2">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-forest/30 px-4 py-3"
            >
              <span className="truncate text-sm text-cream">{itemLabel(it)}</span>
              <div className="flex shrink-0 gap-2">
                <AdminButton variant="outline" className="px-3 py-1.5 text-xs" onClick={() => { setDraft({ ...it }); setIsNew(false); }}>
                  تعديل
                </AdminButton>
                <AdminButton variant="danger" className="px-3 py-1.5 text-xs" onClick={() => del(it)}>
                  حذف
                </AdminButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
