"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function PageViewTracker({ surface = "public" }: { surface?: "public" | "demo" }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    trackEvent("page_viewed", { route: pathname, surface });
  }, [pathname, surface]);
  return null;
}
