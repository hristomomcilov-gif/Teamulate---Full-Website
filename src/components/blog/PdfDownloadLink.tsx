"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { withBasePath } from "@/lib/base-path";

export function PdfDownloadLink({
  href,
  contentId,
  children,
  className = "",
}: {
  href: string;
  contentId: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <a
      href={withBasePath(href)}
      download
      onClick={() =>
        trackEvent("research_pdf_downloaded", {
          contentId,
          contentType: "report",
          route: pathname ?? "",
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
