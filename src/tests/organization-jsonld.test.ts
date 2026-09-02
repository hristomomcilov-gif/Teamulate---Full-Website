import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_JSON_LD,
  ORGANIZATION_LOGO_URL,
  SITE_URL,
} from "@/lib/site";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

describe("Organization JSON-LD", () => {
  it("names Teamulate unambiguously with the live T lockup and no location", () => {
    expect(ORGANIZATION_JSON_LD["@type"]).toEqual(["Organization", "Brand"]);
    expect(ORGANIZATION_JSON_LD.name).toBe("Teamulate");
    expect(ORGANIZATION_JSON_LD.legalName).toBe("Teamulate");
    expect(ORGANIZATION_JSON_LD.url).toBe("https://teamulate.ca/");
    expect(ORGANIZATION_JSON_LD.url).toBe(SITE_URL);
    expect(ORGANIZATION_JSON_LD.logo.url).toBe("https://teamulate.ca/apple-icon.png");
    expect(ORGANIZATION_JSON_LD.logo.url).toBe(ORGANIZATION_LOGO_URL);
    expect(ORGANIZATION_JSON_LD.description).toBe(ORGANIZATION_DESCRIPTION);
    expect(ORGANIZATION_JSON_LD.description).toMatch(/AI marketing team and department/);
    expect(ORGANIZATION_JSON_LD.description).not.toMatch(/fully autonomous/i);
    expect(ORGANIZATION_JSON_LD).not.toHaveProperty("sameAs");
    expect(ORGANIZATION_JSON_LD).not.toHaveProperty("address");
    expect(ORGANIZATION_JSON_LD).not.toHaveProperty("location");
    expect(JSON.stringify(ORGANIZATION_JSON_LD)).not.toMatch(/Barrie|Ontario|Canada|PostalAddress/i);
    expect(JSON.stringify(ORGANIZATION_JSON_LD)).not.toMatch(
      /linkedin\.com|wikipedia\.org|crunchbase\.com|martechulate|marketeam|teamulation/i,
    );
  });

  it("merges into the existing homepage graph without a second Organization", () => {
    const layout = src("src/app/layout.tsx");
    expect(layout).toContain("ORGANIZATION_JSON_LD");
    expect(layout).toContain('"@graph"');
    expect(layout).toContain("WebSite");
    expect(layout.match(/ORGANIZATION_JSON_LD/g)?.length).toBeGreaterThanOrEqual(1);
    expect(layout).not.toContain("SITE.category");
    expect(layout).not.toMatch(/PostalAddress|addressLocality|Barrie/);
    expect(layout).not.toContain("sameAs");
  });

  it("puts Teamulate in the homepage H1 as a proper name", () => {
    const home = src("src/app/page.tsx");
    expect(home).toContain("Teamulate — Your AI Marketing Team");
    expect(home).toContain('title: "Teamulate | Your AI Marketing Team"');
    expect(home).not.toMatch(/Articulate|Stimulate|MarTechulate|Marketeam/i);
    expect(home).not.toMatch(/Barrie|Ontario|PostalAddress/);
  });
});
