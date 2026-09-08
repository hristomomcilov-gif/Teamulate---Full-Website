import Script from "next/script";

const GA_MEASUREMENT_ID = "G-N9TCF45QX6";

/**
 * Official GA4 gtag snippet. Rendered in the marketing-site root layout,
 * which covers only this repo's routes - the live host's /preview/ and shop
 * paths are separate deployments and never receive this tag.
 */
export function GoogleAnalytics() {
  // Preview overlay is a separate SuperHosting path and must not receive GA4.
  if (process.env.NEXT_PUBLIC_PREVIEW_EXPORT === "1") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
