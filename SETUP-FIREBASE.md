# إعداد Firebase + لوحة التحكّم — خطوة بخطوة

الموقع يعمل الآن بمحتوى افتراضي. بعد ربط Firebase، تصير لوحة التحكّم على
`/admin` تدير كل المحتوى (المنيو، الصور، الفروع، التقييمات، الإعدادات، الرسائل)،
والموقع العام يقرأ منها مباشرة. **لو لم تُضبط Firebase، لا ينكسر الموقع** — يبقى
على المحتوى الافتراضي.

---

## 1) أنشئ مشروع Firebase
1. افتح <https://console.firebase.google.com> → **Add project** → سمّه مثلاً `lusail-cafe`.
2. تقدر تتجاوز Google Analytics.

## 2) أضف تطبيق ويب وانسخ الإعدادات
1. داخل المشروع: أيقونة الترس ⚙ → **Project settings** → انزل لـ **Your apps** → اختر **Web** (`</>`).
2. سمّه `lusail-web` → Register app.
3. ستظهر `firebaseConfig`. انسخ القيم إلى ملف جديد اسمه **`.env.local`** في جذر المشروع
   (انسخ `.env.local.example` وعبّئه):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=lusail-cafe.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=lusail-cafe
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=lusail-cafe.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123
NEXT_PUBLIC_ADMIN_EMAILS=your-email@gmail.com
```

## 3) فعّل تسجيل الدخول وأنشئ حساب المدير
1. القائمة → **Build → Authentication** → **Get started**.
2. **Sign-in method** → فعّل **Email/Password**.
3. **Users** → **Add user** → أدخل بريدك وكلمة مرور. **هذا حساب دخولك للوحة.**
4. تأكّد أنّ نفس البريد موجود في `NEXT_PUBLIC_ADMIN_EMAILS`.

## 4) أنشئ قاعدة البيانات (Firestore)
1. **Build → Firestore Database** → **Create database** → اختر **Production mode** → اختر إقليماً (مثلاً `eur3` أو `europe-west`).
2. تبويب **Rules** → الصق محتوى ملف `firestore.rules` (الموجود بالمشروع) → **Publish**.

## 5) فعّل التخزين (Storage) لرفع الصور
1. **Build → Storage** → **Get started** → Production mode.
2. تبويب **Rules** → الصق محتوى ملف `storage.rules` → **Publish**.

## 6) شغّل وادخل اللوحة
```
npm run dev
```
1. افتح <http://localhost:3000/admin> → سجّل الدخول بالبريد الذي أنشأته.
2. في «نظرة عامة» اضغط **زرع المحتوى الافتراضي** — يكتب المنيو/الصور/الفروع/التقييمات/الإعدادات الحالية إلى قاعدة البيانات.
3. الآن عدّل أي شيء من القوائم — وينعكس على الموقع مباشرة.

> ملاحظة: زرّ الزرع يكتب مسارات الصور الحالية (`/gallery/...`). الصور المرفوعة لاحقاً من اللوحة تُخزَّن في Firebase Storage تلقائياً.

## 7) للنشر على Vercel
أضف **نفس متغيّرات البيئة** في Vercel:
```
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
# ... كرّر لباقي المتغيّرات، ثم:
vercel --prod
```
أو من لوحة Vercel: Project → Settings → Environment Variables → أضِفها كلها → Redeploy.

---

## تأمين إضافي (اختياري)
في `firestore.rules` بدّل دالة `isAdmin()` لتقصر الكتابة على بريدك:
```
return request.auth != null && request.auth.token.email in ['your-email@gmail.com'];
```
