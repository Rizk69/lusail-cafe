import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Real café photos can be dropped into /public, or hot-linked from a CDN.
  // Add the host here if you later switch the gallery to remote images.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
