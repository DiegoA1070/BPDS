import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  images: { unoptimized: true
        },
        assetPrefix: process.env.ASSET_PREFIX || undefined,
};

export default nextConfig;
