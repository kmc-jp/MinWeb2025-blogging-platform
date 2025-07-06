import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: config => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://minweb2025-blogging-platform-backend-975320007014.asia-northeast2.run.app/api/:path*'
      }
    ];
  },
};

export default nextConfig;
