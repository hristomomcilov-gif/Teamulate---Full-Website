import type { NextConfig } from "next";

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
};

export default nextConfig;
