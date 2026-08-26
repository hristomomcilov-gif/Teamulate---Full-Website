"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HEADER_NAV } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { CtaLink } from "@/components/CtaLink";

export function SiteHeader() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on Escape and outside click (spec §8.2); navigation closes
  // menus via navClick on every link activation.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const navClick = (ctaId: string) => {
    trackEvent("nav_item_clicked", { ctaId, route: pathname ?? "" });
    setOpenGroup(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav ref={navRef} aria-label="Main" className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink" onClick={() => navClick("logo")}>
          <span aria-hidden className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-brand to-brand-purple" />
          Teamulate
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {HEADER_NAV.map((group) =>
            group.items.length === 1 ? (
              <Link
                key={group.label}
                href={group.items[0].href}
                aria-current={pathname === group.items[0].href ? "page" : undefined}
                onClick={() => navClick(group.items[0].href)}
                className={`rounded-md px-3 py-2 text-sm font-medium hover:text-brand ${
                  pathname === group.items[0].href ? "text-brand" : "text-ink"
                }`}
              >
                {group.label}
              </Link>
            ) : (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={openGroup === group.label}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink hover:text-brand"
                >
                  {group.label}
                  <span aria-hidden className="text-[10px]">▾</span>
                </button>
                {openGroup === group.label ? (
                  <div className="absolute left-0 top-full mt-1 w-80 rounded-(--tm-radius-md) border border-line bg-surface p-2 shadow-card">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={() => navClick(item.href)}
                        className="block rounded-md px-3 py-2.5 hover:bg-surface-muted"
                      >
                        <span className="block text-sm font-semibold text-ink">{item.label}</span>
                        {item.description ? (
                          <span className="mt-0.5 block text-xs text-ink-muted">{item.description}</span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ),
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <CtaLink href="/login/" ctaId="header-login" kind="login" variant="ghost">
            Login
          </CtaLink>
          <CtaLink href="/request-demo/" ctaId="header-primary" kind="primary">
            See the team in action
          </CtaLink>
        </div>

        {/* Mobile: one menu button, clear Login, one CTA (spec §8.2) */}
        <div className="flex items-center gap-2 lg:hidden">
          <CtaLink href="/request-demo/" ctaId="header-primary-mobile" kind="primary" className="px-3 text-xs">
            See the team
          </CtaLink>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink"
          >
            <span aria-hidden>{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-line bg-surface lg:hidden">
          <div className="mx-auto max-w-[1240px] space-y-4 px-5 py-4">
            {HEADER_NAV.map((group) => (
              <div key={group.label}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">{group.label}</p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => navClick(item.href)}
                    className="block rounded-md px-2 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-line pt-3">
              <Link href="/login/" onClick={() => trackEvent("login_clicked", { route: pathname ?? "" })} className="block rounded-md px-2 py-2.5 text-sm font-semibold text-brand">
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
