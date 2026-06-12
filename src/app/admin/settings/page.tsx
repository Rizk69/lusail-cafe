"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getSettingsDoc, saveSettings } from "@/lib/admin/crud";
import { FALLBACK_SITE_DATA } from "@/lib/data/site-data";
import { BiInput, TextInput, Field, AdminButton, Card, SectionTitle } from "@/components/admin/ui";

const LINKS: { key: string; label: string }[] = [
  { key: "phoneDisplay", label: "الهاتف (للعرض)" },
  { key: "phoneTel", label: "الهاتف (tel:)" },
  { key: "whatsapp", label: "واتساب (رقم دولي بدون +)" },
  { key: "instagram", label: "رابط إنستغرام" },
  { key: "facebook", label: "رابط فيسبوك" },
  { key: "talabat", label: "رابط طلبات" },
];

export default function SettingsAdmin() {
  const [s, setS] = useState<any>(FALLBACK_SITE_DATA.settings);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const d = await getSettingsDoc();
        if (d) setS({ ...FALLBACK_SITE_DATA.settings, ...d });
      } catch {
        /* keep defaults */
      }
      setLoading(false);
    })();
  }, []);

  const setField = (k: string, v: any) => setS((p: any) => ({ ...p, [k]: v }));
  const setStat = (i: number, patch: any) =>
    setS((p: any) => ({ ...p, stats: p.stats.map((st: any, idx: number) => (idx === i ? { ...st, ...patch } : st)) }));

  const save = async () => {
    setStatus("جارٍ الحفظ…");
    try {
      await saveSettings(s);
      setStatus("تم الحفظ ✓");
    } catch (e: any) {
      setStatus("خطأ: " + e.message);
    }
  };

  if (loading) return <p className="text-sm text-sand/60">جارٍ التحميل…</p>;

  return (
    <div>
      <SectionTitle title="إعدادات الموقع" action={<AdminButton onClick={save}>حفظ</AdminButton>} />
      {status && <p className="mb-4 text-xs text-brass">{status}</p>}

      <div className="space-y-6">
        <Card className="space-y-4">
          <p className="text-sm text-cream">روابط ومعلومات الاتصال</p>
          {LINKS.map((l) => (
            <Field key={l.key} label={l.label}>
              <TextInput dir="ltr" value={s[l.key] ?? ""} onChange={(e) => setField(l.key, e.target.value)} />
            </Field>
          ))}
          <BiInput label="المدينة / المنطقة" value={s.cityRegion} onChange={(v) => setField("cityRegion", v)} />
        </Card>

        <Card className="space-y-4">
          <p className="text-sm text-cream">أرقام الإحصائيات (الهيرو)</p>
          {(s.stats ?? []).map((st: any, i: number) => (
            <div key={i} className="rounded-xl border border-line/60 bg-ink/40 p-3">
              <Field label="القيمة (مثال: ‎+60 أو 4.8)">
                <TextInput dir="ltr" value={st.value ?? ""} onChange={(e) => setStat(i, { value: e.target.value })} />
              </Field>
              <div className="mt-2">
                <BiInput label="الوصف" value={st.label} onChange={(v) => setStat(i, { label: v })} />
              </div>
            </div>
          ))}
        </Card>

        <AdminButton onClick={save}>حفظ كل الإعدادات</AdminButton>
      </div>
    </div>
  );
}
