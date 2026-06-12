"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function ReviewsAdmin() {
  return (
    <CollectionManager
      coll="reviews"
      title="تقييمات الزوّار"
      itemLabel={(it) => `${it.name?.ar || "زائر"} — ${it.rating ?? 5}★`}
      blank={() => ({ name: { ar: "", en: "" }, role: { ar: "", en: "" }, text: { ar: "", en: "" }, rating: 5 })}
      fields={[
        { key: "name", label: "الاسم", type: "bi" },
        { key: "role", label: "الصفة (زائر دائم…)", type: "bi" },
        { key: "text", label: "نص التقييم", type: "bi-textarea" },
        { key: "rating", label: "التقييم (1–5)", type: "number" },
      ]}
    />
  );
}
