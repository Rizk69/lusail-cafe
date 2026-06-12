"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function BranchesAdmin() {
  return (
    <CollectionManager
      coll="branches"
      title="الفروع"
      itemLabel={(it) => it.name?.ar || it.id || "فرع"}
      blank={() => ({
        name: { ar: "", en: "" },
        address: { ar: "", en: "" },
        hours: { ar: "", en: "" },
        phone: "",
        mapUrl: "",
        kind: "pine",
      })}
      fields={[
        { key: "name", label: "اسم الفرع", type: "bi" },
        { key: "address", label: "العنوان", type: "bi" },
        { key: "hours", label: "ساعات العمل", type: "bi" },
        { key: "phone", label: "الهاتف", type: "text" },
        { key: "mapUrl", label: "رابط الخريطة (Google Maps)", type: "text" },
        { key: "kind", label: "لون البطاقة: pine أو clay", type: "text" },
      ]}
    />
  );
}
