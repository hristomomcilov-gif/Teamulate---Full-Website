"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { HEADER_NAV, LAUNCH_DEMO_HREF, isFullDocumentHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { CtaLink } from "@/components/CtaLink";
import { TeamulateLogo } from "@/components/BrandLogo";

/**
 * Nav item link. Demo / /app/ / .html targets are plain anchors (full document
 * load, never a Next soft-nav); marketing routes use next/link.
 */
function NavLink({
  href,
  current,
  onClick,
  className,
  children,
}: {
  href: string;
  current: boolean;
  onClick: () => void;
  className: string;
  children: ReactNode;
}) {
  const ariaCurrent = current ? "page" : undefined;
  if (isFullDocumentHref(href)) {
    return (
      <a href={href} aria-current={ariaCurrent} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-current={ariaCurrent} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

/**
 * LOCKED sitewide chrome (docs/LOCKED_SITECHROME.md). Rendered once, from
 * SiteChrome in the root layout, on every marketing page. Never copy this
 * markup into a page or build a page-local header.
 */
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
        <Link href="/" aria-label="Teamulate home" onClick={() => navClick("logo")}>
          <TeamulateLogo className="h-8 w-auto sm:h-9" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {HEADER_NAV.map((group) =>
            group.items.length === 1 ? (
              <NavLink
                key={group.label}
                href={group.items[0].href}
                current={pathname === group.items[0].href}
                onClick={() => navClick(group.items[0].href)}
                className={`rounded-md px-3 py-2 text-sm font-medium hover:text-brand ${
                  pathname === group.items[0].href ? "text-brand" : "text-ink"
                }`}
              >
                {group.label}
              </NavLink>
            ) : (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={openGroup === group.label}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:text-brand ${
                    group.items.some((item) => item.href === pathname) ? "text-brand" : "text-ink"
                  }`}
                >
                  {group.label}
                  <span aria-hidden className="text-[10px]">▾</span>
                </button>
                {openGroup === group.label ? (
                  <div
                    className={`absolute left-0 top-full mt-1 rounded-(--tm-radius-md) border border-line bg-surface p-2 shadow-card ${
                      group.items.some((item) => item.description) ? "w-80" : "min-w-[180px]"
                    }`}
                  >
                    {group.items.map((item) => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        current={pathname === item.href}
                        onClick={() => navClick(item.href)}
                        className="block rounded-md px-3 py-2.5 hover:bg-surface-muted"
                      >
                        <span
                          className={`block text-sm font-semibold ${pathname === item.href ? "text-brand" : "text-ink"}`}
                        >
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="mt-0.5 block text-xs text-ink-muted">{item.description}</span>
                        ) : null}
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ),
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {/* Plain anchor: /app/ is the live client login gate (full page load;
              /login-intercept.js additionally guards against client routing). */}
          <a
            href="/app/"
            onClick={() => trackEvent("login_clicked", { route: pathname ?? "" })}
            className="inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-brand hover:underline"
          >
            Login
          </a>
          {/* Plain anchor via CtaLink: full document load into the filled demo clone. */}
          <CtaLink href={LAUNCH_DEMO_HREF} ctaId="header-primary" kind="primary">
            Launch Demo
          </CtaLink>
        </div>

        {/* Mobile: one menu button; Login and the primary CTA live inside the drawer (spec §8.2) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex min-h-11 items-center justify-center rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink shadow-sm"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-line bg-surface lg:hidden">
          <div className="mx-auto max-w-[1240px] space-y-4 px-5 py-4">
            {HEADER_NAV.map((group) => (
              <div key={group.label}>
                {group.items.length > 1 ? (
                  <p className="mb-1 px-2 text-xs font-bold uppercase tracking-wide text-brand">{group.label}</p>
                ) : null}
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    current={pathname === item.href}
                    onClick={() => navClick(item.href)}
                    className="block rounded-md px-2 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ))}
            <div className="space-y-2 border-t border-line pt-3">
              <a href="/app/" onClick={() => trackEvent("login_clicked", { route: pathname ?? "" })} className="block rounded-md px-2 py-2.5 text-sm font-semibold text-brand">
                Login
              </a>
              <CtaLink href={LAUNCH_DEMO_HREF} ctaId="header-primary-mobile" kind="primary" className="w-full">
                Launch Demo
              </CtaLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
