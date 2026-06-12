import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Real café photos can be dropped into /public, or hot-linked from a CDN.
  // Add the host here if you later switch the gallery to remote images.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // gallery images uploaded through the dashboard live in Firebase Storage
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
