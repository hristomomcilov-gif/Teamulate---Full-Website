"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

function isDemoDashboardPath(pathname: string | null) {
  return (pathname ?? "").replace(/\/$/, "") === "/demo/dashboard";
}

/**
 * Marketing chrome stays on every public page except /demo/dashboard/,
 * which is a full-viewport product recreation.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const productDemo = isDemoDashboardPath(pathname);

  useEffect(() => {
    if (!productDemo) return;
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [productDemo]);

  if (productDemo) {
    return <div className="h-dvh overflow-hidden bg-surface-muted">{children}</div>;
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
