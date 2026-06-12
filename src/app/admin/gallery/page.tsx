"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function GalleryAdmin() {
  return (
    <CollectionManager
      coll="gallery"
      title="المعرض والصور"
      itemLabel={(it) => it.caption?.ar || it.id || "صورة"}
      blank={() => ({ caption: { ar: "", en: "" }, kind: "cold", photo: "", wide: false, tall: false })}
      fields={[
        { key: "caption", label: "التعليق", type: "bi" },
        { key: "photo", label: "الصورة (ارفع ملفاً أو الصق رابطاً)", type: "image" },
        { key: "kind", label: "النوع الاحتياطي: cold / latte / breakfast / interior / counter", type: "text" },
        { key: "wide", label: "عريضة (عمودان)", type: "bool" },
        { key: "tall", label: "طويلة (صفّان)", type: "bool" },
      ]}
    />
  );
}
