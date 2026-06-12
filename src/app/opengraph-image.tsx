import { ImageResponse } from "next/og";

/* Branded social share card (1200×630) — shown when the site link is shared on
   WhatsApp, Facebook, Instagram, X, etc. Latin-only text to stay font-safe. */

export const alt = "Lusail Café — Specialty Coffee, Amman";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const emblem = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ecd29a"/><stop offset="0.5" stop-color="#c9a25e"/><stop offset="1" stop-color="#9a7330"/>
    </linearGradient></defs>
    <circle cx="24" cy="24" r="22.5" fill="url(#g)"/>
    <circle cx="24" cy="24" r="18.8" fill="none" stroke="#0a0a0a" stroke-opacity="0.22" stroke-width="1"/>
    <g fill="none" stroke="#0a0a0a" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.92">
      <path d="M20 12.6c-1.4 1.5-1.4 3 0 4.5"/><path d="M24 11.8c-1.4 1.5-1.4 3 0 4.5"/><path d="M28 12.6c-1.4 1.5-1.4 3 0 4.5"/>
      <path d="M15 21.4h18l-1.5 8.4a4 4 0 0 1-3.95 3.3h-7.1a4 4 0 0 1-3.95-3.3L15 21.4Z"/>
      <path d="M32.7 23.4c3.7.5 3.7 6.4 0 6.9"/><path d="M13.4 35.4h21.2"/>
    </g>
  </svg>`,
)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(900px 600px at 80% -10%, rgba(201,162,94,0.20), transparent 60%), linear-gradient(135deg, #0c0b08 0%, #16130d 55%, #050505 100%)",
          fontFamily: "serif",
          color: "#f4ecda",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={emblem} width={150} height={150} alt="" />
        <div
          style={{
            marginTop: 34,
            fontSize: 86,
            fontWeight: 700,
            letterSpacing: -1,
            color: "#ecd29a",
          }}
        >
          Lusail Café
        </div>
        <div style={{ marginTop: 10, fontSize: 30, color: "#cdbf9f" }}>
          Specialty Coffee · Breakfast · Amman
        </div>
        <div
          style={{
            marginTop: 30,
            height: 2,
            width: 260,
            background:
              "linear-gradient(90deg, transparent, #c9a25e, transparent)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
