"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function SignaturesAdmin() {
  return (
    <CollectionManager
      coll="signatures"
      title="التوقيعات (مشروبات وأطباق مميّزة)"
      itemLabel={(it) => it.name?.ar || it.id || "صنف"}
      blank={() => ({ name: { ar: "", en: "" }, note: { ar: "", en: "" }, photo: "" })}
      fields={[
        { key: "name", label: "الاسم", type: "bi" },
        { key: "note", label: "وصف قصير", type: "bi" },
        { key: "photo", label: "الصورة", type: "image" },
      ]}
    />
  );
}
