/**
 * LOCKED SITECHROME (Chris, 2026-09-09) — docs/LOCKED_SITECHROME.md
 *
 * Every marketing page must render the identical shared header and footer.
 * A visitor must not be able to tell from the chrome that they left the
 * homepage. This suite fails the build if any route, component or static file
 * introduces divergent chrome:
 *
 *  1. Source lock — chrome exists once (SiteHeader / SiteFooter via SiteChrome
 *     in the root layout); no page-local <header>/<footer>, no second import,
 *     no hand-built marketing HTML in public/.
 *  2. Rendered lock — SiteHeader and SiteFooter produce byte-identical markup
 *     on every marketing route (only the active-item highlight may differ).
 *  3. CTA lock — Launch Demo / Demo / Interactive Demo all target the filled
 *     demo document as a plain full-document anchor, and Login targets /app/.
 *
 * scripts/check-sitechrome-parity.mjs repeats the rendered lock against the
 * static export in out/ after `next build` (catches pages that bypass the
 * layout), and eslint.config.mjs forbids the imports/elements at lint time.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FOOTER_GROUPS, HEADER_NAV, LAUNCH_DEMO_HREF, SITEMAP_ROUTES, isFullDocumentHref } from "@/lib/site";

let currentPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => currentPathname,
  useRouter: () => ({ push: () => {}, replace: () => {}, prefetch: () => {} }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    prefetch: _prefetch,
    ...rest
  }: { href: string; children: ReactNode; prefetch?: boolean } & Record<string, unknown>) =>
    createElement("a", { href, ...rest }, children),
}));

const { SiteHeader } = await import("@/components/SiteHeader");
const { SiteFooter } = await import("@/components/SiteFooter");

const ROOT = process.cwd();

function src(relativePath: string) {
  return readFileSync(resolve(ROOT, relativePath), "utf8");
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function rel(path: string) {
  return relative(ROOT, path).split("\\").join("/");
}

/** Files allowed to define or import the chrome. Everything else is a consumer. */
const CHROME_OWNERS = new Set([
  "src/components/SiteHeader.tsx",
  "src/components/SiteFooter.tsx",
  "src/components/SiteChrome.tsx",
]);

/** Product recreation inside the demo — protected, out of scope, not marketing chrome. */
function isProtectedDemo(path: string) {
  return path.startsWith("src/components/demo/") || path.startsWith("src/app/demo/");
}

/** Marketing routes whose chrome must be indistinguishable from the homepage. */
const MARKETING_ROUTES = Array.from(new Set<string>([...SITEMAP_ROUTES, "/about-chris/", "/team/", "/login/", "/not-found/"]));

/**
 * Active-route highlight is the only permitted difference between pages:
 * `aria-current="page"` and the text-brand colour on the current item / its
 * dropdown parent. Strip both so everything else must match byte-for-byte.
 */
export function normalizeChrome(html: string) {
  return html.replace(/ aria-current="page"/g, "").replace(/hover:text-brand text-brand(?=[" ])/g, "hover:text-brand text-ink");
}

function renderChrome(pathname: string) {
  currentPathname = pathname;
  return {
    header: renderToStaticMarkup(createElement(SiteHeader)),
    footer: renderToStaticMarkup(createElement(SiteFooter)),
  };
}

beforeEach(() => {
  currentPathname = "/";
});

describe("LOCKED SITECHROME · source lock", () => {
  const appFiles = walk(resolve(ROOT, "src/app")).map(rel);
  const componentFiles = walk(resolve(ROOT, "src/components")).map(rel);
  const tsxFiles = [...appFiles, ...componentFiles].filter((f) => f.endsWith(".tsx"));

  it("wires the chrome exactly once: root layout → SiteChrome → SiteHeader + SiteFooter", () => {
    expect(src("src/app/layout.tsx")).toContain("<SiteChrome>{children}</SiteChrome>");
    const chrome = src("src/components/SiteChrome.tsx");
    expect(chrome).toContain("<SiteHeader />");
    expect(chrome).toContain("<SiteFooter />");
    expect(chrome).toContain('<main id="main-content"');
  });

  it("has no nested layout that could swap or hide the shared chrome", () => {
    const layouts = appFiles.filter((f) => /\/layout\.tsx$/.test(f));
    expect(layouts).toEqual(["src/app/layout.tsx"]);
  });

  it("forbids page-local <header>/<footer>/main-nav markup outside the shared chrome", () => {
    const offenders: string[] = [];
    for (const file of tsxFiles) {
      if (CHROME_OWNERS.has(file) || isProtectedDemo(file)) continue;
      const code = src(file);
      if (/<header[\s>]/.test(code)) offenders.push(`${file}: <header>`);
      if (/<footer[\s>]/.test(code)) offenders.push(`${file}: <footer>`);
      if (/aria-label=["']Main["']/.test(code)) offenders.push(`${file}: nav[aria-label="Main"]`);
      if (/aria-label=["']Teamulate on social/.test(code) && file !== "src/components/SocialIcons.tsx") {
        offenders.push(`${file}: social nav`);
      }
    }
    expect(offenders, "Marketing pages must inherit chrome from SiteChrome (docs/LOCKED_SITECHROME.md)").toEqual([]);
  });

  it("forbids importing SiteHeader/SiteFooter anywhere except SiteChrome", () => {
    const offenders: string[] = [];
    for (const file of tsxFiles) {
      if (file === "src/components/SiteChrome.tsx") continue;
      const code = src(file);
      if (/from ["'][^"']*\/(SiteHeader|SiteFooter)["']/.test(code)) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });

  it("keeps hand-built marketing HTML out of public/ (the live About Chris bug)", () => {
    const html = walk(resolve(ROOT, "public"))
      .map(rel)
      .filter((f) => f.endsWith(".html") || f.endsWith(".htm"));
    // The client-login field form is the only static document the marketing tree ships.
    expect(html).toEqual(["public/client-login.html"]);
  });

  it("does not let any marketing page bypass the layout with its own <html>/<body>", () => {
    const offenders = appFiles
      .filter((f) => f.endsWith(".tsx") && f !== "src/app/layout.tsx" && !isProtectedDemo(f))
      .filter((f) => /<html[\s>]|<body[\s>]/.test(src(f)));
    expect(offenders).toEqual([]);
  });
});

describe("LOCKED SITECHROME · header + footer content", () => {
  it("locks the top bar: How it works · About▾ (Chris, The Team) · Pricing · Blog · Demo", () => {
    expect(HEADER_NAV.map((g) => g.label)).toEqual(["How it works", "About", "Pricing", "Blog", "Demo"]);
    expect(HEADER_NAV.find((g) => g.label === "About")?.items).toEqual([
      { label: "Chris", href: "/about-chris/" },
      { label: "The Team", href: "/team/" },
    ]);
    expect(HEADER_NAV.filter((g) => g.items.length > 1).map((g) => g.label)).toEqual(["About"]);
  });

  it("About trigger is plain text + chevron (no button chrome, no gray box)", () => {
    const header = src("src/components/SiteHeader.tsx");
    const trigger = header.match(/<button[\s\S]*?aria-haspopup="true"[\s\S]*?<\/button>/)?.[0] ?? "";
    expect(trigger).toContain("▾");
    expect(trigger).toMatch(/className=\{`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:text-brand/);
    expect(trigger).not.toMatch(/\b(bg-|border|shadow|ring)/);
  });

  it("Launch Demo / Demo / Interactive Demo all target the filled demo as full-document anchors", () => {
    expect(LAUNCH_DEMO_HREF).toBe("/demo/dashboard/dashboard.html");
    expect(isFullDocumentHref(LAUNCH_DEMO_HREF)).toBe(true);
    expect(isFullDocumentHref("/demo/dashboard/")).toBe(true);
    expect(isFullDocumentHref("/demo/")).toBe(true);
    expect(isFullDocumentHref("/app/")).toBe(true);
    expect(isFullDocumentHref("/about-chris/")).toBe(false);
    expect(isFullDocumentHref("/team/")).toBe(false);
    expect(isFullDocumentHref("https://x.com/Teamulate")).toBe(false);

    expect(HEADER_NAV.find((g) => g.label === "Demo")?.items[0].href).toBe(LAUNCH_DEMO_HREF);
    const interactiveDemo = FOOTER_GROUPS.flatMap((g) => g.items).find((i) => i.label === "Interactive Demo");
    expect(interactiveDemo?.href).toBe(LAUNCH_DEMO_HREF);

    const header = src("src/components/SiteHeader.tsx");
    expect(header.match(/href=\{LAUNCH_DEMO_HREF\}/g)).toHaveLength(2); // desktop + mobile drawer CTA
    expect(header).not.toContain('href="/demo/dashboard/"');
    expect(header).toContain('href="/app/"');

    const cta = src("src/components/CtaLink.tsx");
    expect(cta).toContain("isFullDocumentHref(href)");
    expect(cta).toMatch(/<a href=\{href\}/);
  });

  it("footer social row matches the live /js/footer-social.js contract (no duplicate row)", () => {
    const icons = src("src/components/SocialIcons.tsx");
    expect(icons).toContain('aria-label="Teamulate on social"');
    expect(icons).toContain('data-teamulate-social="2"');
    const footer = src("src/components/SiteFooter.tsx");
    // The social nav must be the immediate sibling after the entity line.
    expect(footer).toMatch(/\{ENTITY_LINE\}<\/p>\s*(\{\/\*[\s\S]*?\*\/\}\s*)?<SocialIcons className="mt-4" \/>/);
  });
});

describe("LOCKED SITECHROME · rendered parity across marketing routes", () => {
  const home = renderChrome("/");

  it("homepage chrome has the locked pieces", () => {
    expect(home.header).toContain('<header class="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">');
    expect(home.header).toContain('<nav aria-label="Main" class="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8">');
    for (const label of ["How it works", "About", "Pricing", "Blog", "Demo", "Login", "Launch Demo", "Menu"]) {
      expect(home.header).toContain(label);
    }
    expect(home.header).toContain(`href="${LAUNCH_DEMO_HREF}"`);
    expect(home.header).toContain('href="/app/"');
    expect(home.header).not.toContain('href="/demo/dashboard/"');
    expect(home.header).toMatch(/<button[^>]*aria-haspopup="true"[^>]*class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:text-brand text-ink">About<span aria-hidden="true" class="text-\[10px\]">▾<\/span><\/button>/);

    expect(home.footer).toContain('<footer class="border-t border-line bg-surface-muted">');
    expect(home.footer).toContain('class="mx-auto w-full max-w-[1240px] px-5 sm:px-8 py-14"');
    expect((home.footer.match(/<nav aria-label="Teamulate on social" data-teamulate-social="2"/g) ?? []).length).toBe(1);
    for (const group of ["Product", "Guides", "Plans", "Company"]) {
      expect(home.footer).toContain(`<nav aria-label="Footer ${group}">`);
    }
    expect(home.footer).toContain("Stay in the loop");
    expect(home.footer).toContain(`href="${LAUNCH_DEMO_HREF}"`);
    expect(home.footer).toContain('href="/privacy/"');
    expect(home.footer).toContain('href="/terms/"');
  });

  for (const route of MARKETING_ROUTES) {
    it(`${route} renders the exact homepage header and footer`, () => {
      const page = renderChrome(route);
      expect(normalizeChrome(page.header)).toBe(normalizeChrome(home.header));
      expect(page.footer).toBe(home.footer);
    });
  }

  it("only the current-page highlight differs on /about-chris/ and /team/ (About turns brand)", () => {
    const about = renderChrome("/about-chris/");
    expect(about.header).toMatch(/aria-haspopup="true"[^>]*hover:text-brand text-brand">About</);
    const team = renderChrome("/team/");
    expect(team.header).toMatch(/aria-haspopup="true"[^>]*hover:text-brand text-brand">About</);
    expect(home.header).toMatch(/aria-haspopup="true"[^>]*hover:text-brand text-ink">About</);
  });
});
