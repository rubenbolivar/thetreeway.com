import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intl v4: request config lives in src/i18n/request.ts
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Node server deploy (PM2 + nginx proxy), not static export.
  // Enables API routes, dynamic OG, SSR. See REFACTOR-STRATEGY.md.
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default withNextIntl(nextConfig);
