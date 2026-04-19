import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack compatibility: ensure we can still use standard features
  serverExternalPackages: ["@prisma/client", "prisma"],
  // Allow the 3D model to be served from the public folder without complex loaders
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
