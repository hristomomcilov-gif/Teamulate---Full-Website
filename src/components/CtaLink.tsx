"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * CTA link that fires the appropriate analytics event
 * (primary_cta_clicked / secondary_cta_clicked / nav_item_clicked / login_clicked).
 */
export function CtaLink({
  href,
  ctaId,
  kind = "primary",
  children,
  className = "",
  variant,
}: {
  href: string;
  ctaId: string;
  kind?: "primary" | "secondary" | "nav" | "login";
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const pathname = usePathname();
  const resolvedVariant = variant ?? (kind === "primary" ? "primary" : "secondary");
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200";
  const variants = {
    primary: "bg-brand text-white hover:bg-[#4a38d8]",
    secondary: "border border-line bg-surface text-ink hover:border-brand hover:text-brand",
    ghost: "text-brand hover:underline",
  } as const;

  const onClick = () => {
    const eventName =
      kind === "primary"
        ? "primary_cta_clicked"
        : kind === "secondary"
          ? "secondary_cta_clicked"
          : kind === "login"
            ? "login_clicked"
            : "nav_item_clicked";
    trackEvent(eventName, { ctaId, route: pathname ?? "" });
  };

  return (
    <Link href={href} onClick={onClick} className={`${base} ${variants[resolvedVariant]} ${className}`}>
      {children}
    </Link>
  );
}
