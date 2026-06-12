# Gallery photos — كيف تضيف صورك الحقيقية

ضع صور المقهى هنا، ثم افتح `src/lib/content.ts` وأضف المسار في حقل `photo`
لكل بطاقة. ستظهر الصورة فوراً، وإن لم يوجد الملف يرجع التصميم الفنّي تلقائياً.

## مثال
في `src/lib/content.ts` غيّر:

```ts
{ id: "latte", kind: "latte", caption: { ar: "فنّ اللاتيه", en: "Latte art" }, tall: true },
```

إلى:

```ts
{ id: "latte", kind: "latte", caption: { ar: "فنّ اللاتيه", en: "Latte art" }, tall: true,
  photo: "/gallery/latte.jpg" },
```

## أسماء مقترحة للملفات (اختياري)
latte.jpg · interior.jpg · beans.jpg · breakfast.jpg · dessert.jpg · counter.jpg

## نصائح
- المقاس المثالي: 1200×1500 للبطاقات الطويلة (tall)، 1600×1000 للعريضة (wide)،
  و1200×1200 للمربّعة. صيغة **.jpg** أو **.webp**.
- صغّر حجم الصور (< 300KB لكل صورة) لسرعة التحميل.
- لسحب صورك من إنستغرام: افتح المنشور ← زر (•••) ← أو احفظ الصورة من حسابك.
