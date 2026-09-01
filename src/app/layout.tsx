import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE, absoluteUrl } from "@/lib/site";
import Script from "next/script";
import { SiteChrome } from "@/components/SiteChrome";
import { PageViewTracker } from "@/components/PageViewTracker";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const previewExport = process.env.NEXT_PUBLIC_PREVIEW_EXPORT === "1";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Teamulate | A Full Marketing Department Without Building One",
    template: "%s | Teamulate",
  },
  description: SITE.description,
  ...(previewExport ? { robots: { index: false, follow: false } } : {}),
  openGraph: {
    siteName: SITE.name,
    type: "website",
    url: SITE.domain,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/") + "#organization",
      name: SITE.name,
      url: SITE.domain,
      description: SITE.category,
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/") + "#website",
      name: SITE.name,
      url: SITE.domain,
      publisher: { "@id": absoluteUrl("/") + "#organization" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-[16px] leading-relaxed">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Capture-phase guard: any Login/Client-login anchor goes to /app/
            as a full page load - Next client routing can never reopen an old
            cached login card (matches production wiring). */}
        <Script src="/login-intercept.js" strategy="beforeInteractive" />
        <GoogleAnalytics />
        <PageViewTracker />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
