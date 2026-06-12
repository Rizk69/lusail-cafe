import type { Metadata } from "next";
import { Playfair_Display, Manrope, El_Messiri, Tajawal } from "next/font/google";
import { LocaleProvider } from "@/lib/LocaleProvider";
import { SiteDataProvider } from "@/lib/SiteDataProvider";
import "./globals.css";

/* Latin pairing (EN) */
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
/* Arabic pairing (AR, default) */
const messiri = El_Messiri({
  variable: "--font-messiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// ⚑ Update this to your production domain before deploying.
const SITE_URL = "https://lusail-cafe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "كافيه لوسيل | Lusail Café — Amman",
  description:
    "كافيه لوسيل في عمّان — قهوة مختصّة، فطور شهي، وأجواء هادئة في المقابلين وطبربور. Lusail Café: specialty coffee, fresh breakfast & a serene space in Amman.",
  keywords: ["كافيه لوسيل", "lusail cafe", "كافيه عمان", "قهوة مختصة", "المقابلين", "طبربور", "Amman cafe", "specialty coffee Jordan"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_JO",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Lusail Café · كافيه لوسيل",
    title: "كافيه لوسيل | Lusail Café — Amman",
    description: "قهوة مختصّة، فطور شهي، وأجواء هادئة في قلب عمّان.",
  },
  twitter: {
    card: "summary_large_image",
    title: "كافيه لوسيل | Lusail Café",
    description: "قهوة مختصّة، فطور شهي، وأجواء هادئة في عمّان.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${manrope.variable} ${messiri.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LocaleProvider>
          <SiteDataProvider>{children}</SiteDataProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
