import type { NextConfig } from "next";

/**
 * Phone-staging overlay (TEAMULATE_STAGING_BASE=1): served at teamulate.ca/stg/
 * only. Never use this flag for a live-root export.
 */
const stagingBase = process.env.TEAMULATE_STAGING_BASE === "1" ? "/stg" : "";

/**
 * Static export configuration for Apache hosting (SuperHosting, teamulate.ca).
 * - output "export" emits plain HTML/CSS/JS into `out/` — no Node required.
 * - trailingSlash keeps canonical /route/ URLs and maps to route/index.html,
 *   which Apache serves natively.
 * - Images are unoptimized because the Next image optimizer needs a server;
 *   all site images are pre-sized WebP files, so this is acceptable.
 * - Security headers (previously set here) must be configured in Apache
 *   (.htaccess) instead: X-Content-Type-Options, X-Frame-Options,
 *   Referrer-Policy, Permissions-Policy, and X-Robots-Tag noindex for /demo/.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(stagingBase ? { basePath: stagingBase, assetPrefix: stagingBase } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: stagingBase,
    NEXT_PUBLIC_PREVIEW_EXPORT: stagingBase ? "1" : "",
  },
};

export default nextConfig;
