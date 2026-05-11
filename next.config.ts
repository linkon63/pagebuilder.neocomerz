import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile the local neocomerz-ui package so Next.js picks up
  // source changes immediately without a full reinstall.
  transpilePackages: ["neocomerz-storefront-ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
