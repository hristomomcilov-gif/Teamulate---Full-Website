import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SITEMAP_ROUTES } from "@/lib/site";
import { isBlockedSitemapPath, renderSitemapXml, sitemapLocs } from "@/lib/sitemap-xml";

const REQUIRED_PATHS = [
  "/",
  "/ai-marketing-team/",
  "/autonomous-ai-marketing-department/",
  "/ai-marketing-automation/",
  "/research/marketing-team-cost-2026/",
  "/compare/ai-vs-agency-vs-fractional-vs-inhouse/",
  "/blog/",
  "/blog/11-human-hires-vs-11-ai-specialists/",
  "/how-it-works/",
  "/team/",
  "/pricing/",
] as const;

const FORBIDDEN_SUBSTR = ["/preview/", "/stg/", "/app/", "/auth/", "/shop/", "/demo/"];

function readPublicSitemap() {
  return readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
}

function assertWellFormedXml(xml: string) {
  execFileSync(
    "python3",
    ["-c", "import sys, xml.etree.ElementTree as ET; ET.fromstring(sys.stdin.read())"],
    { input: xml },
  );
}

describe("marketing sitemap", () => {
  it("keeps the committed xml in sync with SITEMAP_ROUTES and well-formed", () => {
    const xml = readPublicSitemap();
    expect(xml).toBe(renderSitemapXml());
    assertWellFormedXml(xml);

    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locs).toEqual(sitemapLocs());
    expect(locs[0]).toBe("https://teamulate.ca/");
    for (const path of REQUIRED_PATHS) {
      expect(SITEMAP_ROUTES).toContain(path);
      expect(locs).toContain(path === "/" ? "https://teamulate.ca/" : `https://teamulate.ca${path}`);
    }
  });

  it("omits lastmod, xml declaration, and private/demo folders", () => {
    const xml = readPublicSitemap();
    expect(xml.startsWith("<?")).toBe(false);
    expect(xml).not.toContain("<lastmod");
    expect(xml).not.toContain("changefreq");
    for (const blocked of FORBIDDEN_SUBSTR) {
      expect(xml).not.toContain(blocked);
      expect(SITEMAP_ROUTES.some((route) => isBlockedSitemapPath(route))).toBe(false);
      expect(isBlockedSitemapPath(blocked)).toBe(true);
    }
  });

  it("lists the same marketing urls in the PHP generator", () => {
    const php = readFileSync(resolve(process.cwd(), "public/sitemap.php"), "utf8");
    expect(php.startsWith("<?php")).toBe(true);
    expect(php).toContain("application/xml");
    expect(php).toContain("echo '<?xml version=");
    expect(php).toContain('encoding="UTF-8"');
    expect(php).not.toMatch(/Barrie|Ontario|PostalAddress/i);
    for (const loc of sitemapLocs()) {
      expect(php).toContain(loc);
    }
    for (const blocked of FORBIDDEN_SUBSTR) {
      expect(php).not.toContain(blocked);
    }
    expect(readFileSync(resolve(process.cwd(), "hosting/sitemap.php"), "utf8")).toContain(
      "https://teamulate.ca/pricing/",
    );
    expect(readFileSync(resolve(process.cwd(), "hosting/root.htaccess"), "utf8")).toMatch(
      /RewriteRule \^sitemap\\.xml\$ \/sitemap\.php \[L\]/,
    );
  });
});
