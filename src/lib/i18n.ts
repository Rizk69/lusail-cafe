/* ============================================================================
   i18n — single source of truth for every UI string (AR + EN).
   Section components only READ from here; they never hold hardcoded copy.
   Default locale is Arabic (RTL). English flips direction + font pairing.
============================================================================ */

export type Locale = "ar" | "en";

export const LOCALES: Locale[] = ["ar", "en"];
export const DEFAULT_LOCALE: Locale = "ar";

export const dir = (l: Locale): "rtl" | "ltr" => (l === "ar" ? "rtl" : "ltr");

/** A value that exists in both languages. Use `pick()` from useLocale to read it. */
export type Bi = { ar: string; en: string };

export const messages = {
  ar: {
    brand: { name: "لوسيل", full: "كافيه لوسيل", tagline: "حيث يلتقي طعمُ القهوة بدفءِ المكان" },
    nav: {
      about: "عن لوسيل",
      menu: "المنيو",
      gallery: "أجواؤنا",
      locations: "فروعنا",
      contact: "تواصل معنا",
      order: "اطلب الآن",
    },
    hero: {
      badge: "كافيه ومطعم · عمّان",
      titleTop: "أهلاً بك في",
      title: "لوسيل",
      subtitle: "قهوة مختصّة، فطورٌ شهيّ، وأجواءٌ تُشبه البيت",
      description:
        "في قلب المقابلين، نقدّم لك قهوةً تُحضّر بشغف، وأطباقاً طازجة، ومساحةً هادئة تجمع الأصدقاء والعائلة على مدار اليوم.",
      orderCta: "اطلب عبر طلبات",
      menuCta: "تصفّح المنيو",
      cue: "اكتشف",
    },
    about: {
      eyebrow: "من نحن",
      title: "مكانٌ صُنع ليجمع الأحبّة",
      lead: "لوسيل ليس مجرّد كافيه — إنه عنوانٌ للقاء.",
      body1:
        "بدأت فكرة لوسيل من حبّنا للتفاصيل: فنجان قهوة محضّر بإتقان، طاولة تجمع الأصدقاء، وموسيقى هادئة تملأ المكان. اخترنا لكم أجود حبوب البُنّ وأعددنا قائمةً تُرضي كل الأذواق.",
      body2:
        "من الفطور الصباحي إلى جلسات المساء، يفتح لوسيل أبوابه ليكون امتداداً لبيتك — بخدمةٍ دافئة وتفاصيل مرصّعة بالاهتمام في فرعَيْنا بالمقابلين وطبربور.",
      cta: "تعرّف على المنيو",
    },
    features: { eyebrow: "لماذا لوسيل", title: "تجربةٌ متكاملة في كل زيارة" },
    menu: {
      eyebrow: "قائمتنا",
      title: "منيو يُرضي كل الأذواق",
      note: "* الأسعار بالدينار الأردني. القائمة نموذجية — استبدلها بمنيوكم الرسمي.",
      currency: "د.أ",
      orderCta: "اطلب طلبك الآن",
    },
    gallery: {
      eyebrow: "أجواؤنا",
      title: "لمحاتٌ من لوسيل",
      subtitle: "كل ركن في المكان قصّة — تعالَ وعِشها بنفسك.",
    },
    locations: {
      eyebrow: "فروعنا",
      title: "زورونا في أقرب فرع",
      hoursLabel: "ساعات العمل",
      callLabel: "اتصل بنا",
      directionsLabel: "الاتجاهات",
      open: "مفتوح الآن",
    },
    reviews: { eyebrow: "آراء زوّارنا", title: "كلماتٌ تُدفئ القلب" },
    contact: {
      eyebrow: "تواصل معنا",
      title: "يسعدنا أن نراك",
      lead: "اطلب توصيلاً، احجز طاولة، أو راسلنا — نحن دائماً هنا.",
      phoneLabel: "الهاتف",
      hoursLabel: "ساعات العمل",
      followLabel: "تابعنا",
      formName: "الاسم",
      formNamePh: "اسمك الكريم",
      formMsg: "رسالتك",
      formMsgPh: "كيف نقدر نخدمك؟",
      formSend: "أرسل عبر واتساب",
      orderCta: "اطلب عبر طلبات",
    },
    footer: {
      tagline: "قهوةٌ بحُبّ، وأجواءٌ تُشبه البيت.",
      quickLinks: "روابط سريعة",
      visitUs: "زورونا",
      followUs: "تابعنا",
      rights: "جميع الحقوق محفوظة",
      madeWith: "صُنع بشغف في عمّان",
      backToTop: "للأعلى",
    },
    common: { langToggle: "EN", menuFull: "القائمة الكاملة" },
  },

  en: {
    brand: { name: "Lusail", full: "Lusail Café", tagline: "Where great coffee meets a warm place" },
    nav: {
      about: "About",
      menu: "Menu",
      gallery: "Gallery",
      locations: "Locations",
      contact: "Contact",
      order: "Order now",
    },
    hero: {
      badge: "Café & Restaurant · Amman",
      titleTop: "Welcome to",
      title: "Lusail",
      subtitle: "Specialty coffee, hearty breakfasts, and a room that feels like home",
      description:
        "In the heart of Al-Muqabeleen, we serve coffee brewed with passion, fresh plates, and a calm space that brings friends and family together all day long.",
      orderCta: "Order on Talabat",
      menuCta: "Explore the menu",
      cue: "Scroll",
    },
    about: {
      eyebrow: "Our Story",
      title: "A place made to bring people together",
      lead: "Lusail isn't just a café — it's a place to meet.",
      body1:
        "Lusail began with a love of detail: a cup brewed with care, a table that gathers friends, and soft music that fills the room. We hand-pick our beans and craft a menu made for every taste.",
      body2:
        "From morning breakfast to evening sittings, Lusail opens its doors to be an extension of your home — with warm service and gilded attention to detail across our Al-Muqabeleen and Tabarbour branches.",
      cta: "See the menu",
    },
    features: { eyebrow: "Why Lusail", title: "A complete experience, every visit" },
    menu: {
      eyebrow: "Our Menu",
      title: "A menu for every taste",
      note: "* Prices in Jordanian Dinar. Sample menu — replace with your official one.",
      currency: "JOD",
      orderCta: "Place your order",
    },
    gallery: {
      eyebrow: "The Vibe",
      title: "Moments from Lusail",
      subtitle: "Every corner tells a story — come live it yourself.",
    },
    locations: {
      eyebrow: "Our Branches",
      title: "Visit your nearest branch",
      hoursLabel: "Opening hours",
      callLabel: "Call us",
      directionsLabel: "Directions",
      open: "Open now",
    },
    reviews: { eyebrow: "Guest Reviews", title: "Words that warm the heart" },
    contact: {
      eyebrow: "Get in touch",
      title: "We'd love to see you",
      lead: "Order delivery, reserve a table, or message us — we're always here.",
      phoneLabel: "Phone",
      hoursLabel: "Hours",
      followLabel: "Follow us",
      formName: "Name",
      formNamePh: "Your name",
      formMsg: "Message",
      formMsgPh: "How can we help?",
      formSend: "Send via WhatsApp",
      orderCta: "Order on Talabat",
    },
    footer: {
      tagline: "Coffee with love, and a room that feels like home.",
      quickLinks: "Quick links",
      visitUs: "Visit us",
      followUs: "Follow us",
      rights: "All rights reserved",
      madeWith: "Made with passion in Amman",
      backToTop: "Top",
    },
    common: { langToggle: "ع", menuFull: "Full menu" },
  },
};

/** Strongly-typed message tree for the active locale (string-widened so both
    locales share one structural type). */
export type Messages = (typeof messages)["ar"];
