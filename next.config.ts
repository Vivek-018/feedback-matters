import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // ❌ skips all TS errors at build
  },
};

export default nextConfig;
