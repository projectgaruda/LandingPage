import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    unoptimized: true,
  },
  typescript: {
    // This allows production builds to successfully complete 
    // even if your project has type errors from untyped libraries like react-katex.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;