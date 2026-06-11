/* ============================================================================
   content.ts — the café's data (bilingual). Edit ONLY this file to update
   menu, prices, branches, reviews, links, and gallery captions.
   Every text field is { ar, en }; read it with `pick()` from useLocale().

   ⚑ TO SWAP IN REAL CONTENT: update SITE links + branch details below, and
   replace the gallery `kind` tiles with <Image> once you have real photos.
============================================================================ */

import type { Bi } from "./i18n";

export const SITE = {
  phoneDisplay: "+962 7 9682 0161",
  phoneTel: "+962796820161",
  whatsapp: "962796820161",
  instagram: "https://www.instagram.com/lusailcafe_jo/",
  facebook:
    "https://www.facebook.com/p/%D9%83%D8%A7%D9%81%D9%8A%D9%87-%D9%84%D9%88%D8%B3%D9%8A%D9%84-Lusail-cafe-100095493823330/",
  talabat: "https://www.talabat.com/jordan/restaurant/742450/lusail-cafe-tabarbour",
  cityRegion: { ar: "عمّان، الأردن", en: "Amman, Jordan" } satisfies Bi,
} as const;

/* ---- hero / about stats ---------------------------------------------------- */
export type Stat = { value: string; label: Bi };
export const STATS: Stat[] = [
  { value: "2", label: { ar: "فروع في عمّان", en: "Branches in Amman" } },
  { value: "+60", label: { ar: "صنف في المنيو", en: "Menu items" } },
  { value: "+5K", label: { ar: "زائر سعيد شهرياً", en: "Happy guests / month" } },
  { value: "4.8", label: { ar: "تقييم الزوّار", en: "Guest rating" } },
];

/* ---- marquee ticker -------------------------------------------------------- */
export const MARQUEE: Bi[] = [
  { ar: "قهوة مختصّة", en: "Specialty Coffee" },
  { ar: "فطور يومي طازج", en: "Fresh Daily Breakfast" },
  { ar: "حلويات بيتية", en: "Homemade Desserts" },
  { ar: "أجواء عائلية", en: "Family Vibes" },
  { ar: "توصيل سريع", en: "Fast Delivery" },
  { ar: "حبوب بُنّ منتقاة", en: "Hand-picked Beans" },
];

/* ---- features / why-us ----------------------------------------------------- */
export type Feature = { id: string; icon: string; title: Bi; desc: Bi };
export const FEATURES: Feature[] = [
  {
    id: "coffee",
    icon: "cup",
    title: { ar: "قهوة مختصّة", en: "Specialty Coffee" },
    desc: {
      ar: "حبوب منتقاة بعناية وتُحضَّر على يد باريستا شغوف بكل تفصيل.",
      en: "Carefully sourced beans, brewed by a barista who cares about every detail.",
    },
  },
  {
    id: "kitchen",
    icon: "plate",
    title: { ar: "مطبخٌ طازج", en: "Fresh Kitchen" },
    desc: {
      ar: "فطورٌ وأطباقٌ تُحضَّر لحظة طلبها بمكوّنات طازجة كل يوم.",
      en: "Breakfast and mains made to order with ingredients fresh every day.",
    },
  },
  {
    id: "ambiance",
    icon: "leaf",
    title: { ar: "أجواءٌ هادئة", en: "Serene Ambiance" },
    desc: {
      ar: "ديكورٌ أنيق ومساحاتٌ مريحة للعمل واللقاء والاسترخاء.",
      en: "Elegant decor and comfortable spaces to work, meet, and unwind.",
    },
  },
  {
    id: "delivery",
    icon: "bike",
    title: { ar: "توصيلٌ سريع", en: "Fast Delivery" },
    desc: {
      ar: "اطلب عبر طلبات ويصلك طلبك ساخناً أينما كنت في عمّان.",
      en: "Order on Talabat and get it delivered hot, anywhere in Amman.",
    },
  },
];

/* ---- menu ------------------------------------------------------------------ */
export type MenuItem = { name: Bi; price: string; desc?: Bi; tag?: Bi };
export type MenuCategory = { id: string; name: Bi; items: MenuItem[] };

const POPULAR: Bi = { ar: "الأكثر طلباً", en: "Bestseller" };

export const MENU: MenuCategory[] = [
  {
    id: "hot",
    name: { ar: "قهوة ساخنة", en: "Hot Coffee" },
    items: [
      { name: { ar: "إسبريسو", en: "Espresso" }, price: "1.00" },
      { name: { ar: "أمريكانو", en: "Americano" }, price: "1.50" },
      { name: { ar: "كابتشينو", en: "Cappuccino" }, price: "2.00", tag: POPULAR },
      { name: { ar: "كافيه لاتيه", en: "Caffè Latte" }, price: "2.25" },
      { name: { ar: "سبانيش لاتيه", en: "Spanish Latte" }, price: "2.50", tag: POPULAR },
      { name: { ar: "فلات وايت", en: "Flat White" }, price: "2.25" },
      { name: { ar: "موكا", en: "Mocha" }, price: "2.50" },
      { name: { ar: "قهوة تركية", en: "Turkish Coffee" }, price: "1.50" },
      { name: { ar: "قهوة عربية", en: "Arabic Coffee" }, price: "1.75" },
    ],
  },
  {
    id: "cold",
    name: { ar: "مشروبات باردة", en: "Cold Drinks" },
    items: [
      { name: { ar: "آيس لاتيه", en: "Iced Latte" }, price: "2.50" },
      { name: { ar: "آيس سبانيش لاتيه", en: "Iced Spanish Latte" }, price: "2.75", tag: POPULAR },
      { name: { ar: "كولد برو", en: "Cold Brew" }, price: "2.75" },
      { name: { ar: "آيس موكا", en: "Iced Mocha" }, price: "2.75" },
      { name: { ar: "فرابيه", en: "Frappé" }, price: "3.00" },
      { name: { ar: "موهيتو", en: "Mojito" }, price: "2.75" },
      { name: { ar: "عصير طازج", en: "Fresh Juice" }, price: "2.50" },
      { name: { ar: "سموذي", en: "Smoothie" }, price: "3.00" },
    ],
  },
  {
    id: "breakfast",
    name: { ar: "فطور", en: "Breakfast" },
    items: [
      { name: { ar: "منقوشة زعتر", en: "Zaatar Manakish" }, price: "1.25" },
      { name: { ar: "منقوشة جبنة", en: "Cheese Manakish" }, price: "1.75" },
      { name: { ar: "طبق حلوم", en: "Halloumi Plate" }, price: "3.50" },
      { name: { ar: "شكشوكة", en: "Shakshuka" }, price: "3.00", tag: POPULAR },
      { name: { ar: "بيض بأنواعه", en: "Eggs Your Way" }, price: "2.50" },
      { name: { ar: "بان كيك", en: "Pancakes" }, price: "3.50" },
      { name: { ar: "فرنش توست", en: "French Toast" }, price: "3.50" },
      { name: { ar: "كرواسون", en: "Croissant" }, price: "1.75" },
    ],
  },
  {
    id: "mains",
    name: { ar: "أطباق رئيسية", en: "Mains" },
    items: [
      { name: { ar: "برجر لوسيل", en: "Lusail Burger" }, price: "5.50", tag: POPULAR },
      { name: { ar: "دجاج مقرمش", en: "Crispy Chicken" }, price: "5.00" },
      { name: { ar: "فاهيتا دجاج", en: "Chicken Fajita" }, price: "5.50" },
      { name: { ar: "باستا ألفريدو", en: "Alfredo Pasta" }, price: "4.75" },
      { name: { ar: "كلوب ساندويش", en: "Club Sandwich" }, price: "4.00" },
      { name: { ar: "صاج رول", en: "Saj Wrap" }, price: "3.00" },
    ],
  },
  {
    id: "desserts",
    name: { ar: "حلويات", en: "Desserts" },
    items: [
      { name: { ar: "كنافة", en: "Kunafa" }, price: "3.00", tag: POPULAR },
      { name: { ar: "تشيز كيك", en: "Cheesecake" }, price: "3.25" },
      { name: { ar: "براوني", en: "Brownie" }, price: "3.00" },
      { name: { ar: "تيراميسو", en: "Tiramisu" }, price: "3.25" },
      { name: { ar: "وافل", en: "Waffle" }, price: "3.50" },
      { name: { ar: "كريب", en: "Crêpe" }, price: "3.50" },
    ],
  },
];

/* ---- gallery --------------------------------------------------------------
   `kind` selects an on-brand SVG/CSS composition in <Gallery>. Swap a tile for
   a real photo later by replacing it with <Image src=.../> in that component.
--------------------------------------------------------------------------- */
export type GalleryItem = { id: string; kind: string; caption: Bi; wide?: boolean; tall?: boolean };
export const GALLERY: GalleryItem[] = [
  { id: "latte", kind: "latte", caption: { ar: "فنّ اللاتيه", en: "Latte art" }, tall: true },
  { id: "interior", kind: "interior", caption: { ar: "جلساتنا الدافئة", en: "Our cozy corners" }, wide: true },
  { id: "beans", kind: "beans", caption: { ar: "حبوبٌ منتقاة", en: "Hand-picked beans" } },
  { id: "breakfast", kind: "breakfast", caption: { ar: "فطور الصباح", en: "Morning breakfast" } },
  { id: "dessert", kind: "dessert", caption: { ar: "حلوياتٌ شهيّة", en: "Sweet treats" } },
  { id: "counter", kind: "counter", caption: { ar: "ركن الباريستا", en: "The barista bar" }, wide: true },
];

/* ---- locations / branches -------------------------------------------------- */
export type Branch = {
  id: string;
  name: Bi;
  address: Bi;
  phone: string;
  hours: Bi;
  mapUrl: string;
  kind: string;
};
export const BRANCHES: Branch[] = [
  {
    id: "muqabaleen",
    name: { ar: "فرع المقابلين", en: "Al-Muqabeleen Branch" },
    address: { ar: "شارع الإذاعة والتلفزيون، المقابلين، عمّان", en: "Radio & TV Street, Al-Muqabeleen, Amman" },
    phone: "+962 7 9682 0161",
    hours: { ar: "يومياً · ٨:٠٠ ص — ١:٠٠ ص", en: "Daily · 8:00 AM — 1:00 AM" },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lusail+Cafe+Al+Muqabaleen+Amman",
    kind: "pine",
  },
  {
    id: "tabarbour",
    name: { ar: "فرع طبربور", en: "Tabarbour Branch" },
    address: { ar: "طبربور، عمّان", en: "Tabarbour, Amman" },
    phone: "+962 7 9682 0161",
    hours: { ar: "يومياً · ٨:٠٠ ص — ١:٠٠ ص", en: "Daily · 8:00 AM — 1:00 AM" },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lusail+Cafe+Tabarbour+Amman",
    kind: "clay",
  },
];

/* ---- reviews --------------------------------------------------------------- */
export type Review = { name: Bi; role: Bi; text: Bi; rating: number };
export const REVIEWS: Review[] = [
  {
    name: { ar: "رهف العمري", en: "Rahaf Al-Omari" },
    role: { ar: "زائرة دائمة", en: "Regular guest" },
    rating: 5,
    text: {
      ar: "أحلى سبانيش لاتيه جرّبتها بعمّان، والأجواء هادئة ومريحة. صار مكاني المفضّل للدراسة.",
      en: "The best Spanish latte I've had in Amman, and the vibe is calm and cozy. It's become my favorite study spot.",
    },
  },
  {
    name: { ar: "أحمد دروزة", en: "Ahmad Darwazeh" },
    role: { ar: "عميل توصيل", en: "Delivery customer" },
    rating: 5,
    text: {
      ar: "الفطور وصل ساخن وبسرعة عبر طلبات، والطعم رائع. خدمة محترمة وأسعار منيحة.",
      en: "Breakfast arrived hot and fast on Talabat, and it tasted great. Lovely service and fair prices.",
    },
  },
  {
    name: { ar: "لينا سماره", en: "Lina Samara" },
    role: { ar: "زائرة لأول مرة", en: "First-time guest" },
    rating: 5,
    text: {
      ar: "ديكور أنيق وموظفون لطفاء. الكنافة والتشيز كيك خيالية، رح أرجع أكيد!",
      en: "Elegant decor and friendly staff. The kunafa and cheesecake are unreal — I'll definitely be back!",
    },
  },
];
