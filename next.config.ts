import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hh-test-frontend",
  assetPrefix: "/hh-test-frontend/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;