"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { trackEvent, type EventProperties, type PublicEventName } from "@/lib/analytics";

/** Fires an analytics event once when the wrapped content enters the viewport. */
export function InViewEvent({
  event,
  props = {},
  children,
}: {
  event: PublicEventName;
  props?: EventProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && !fired.current) {
        fired.current = true;
        trackEvent(event, props);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref}>{children}</div>;
}
