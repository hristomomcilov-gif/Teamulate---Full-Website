import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  MARKETING_SHARE_IMAGE_URL,
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_DISAMBIGUATING_DESCRIPTION,
  ORGANIZATION_JSON_LD,
  ORGANIZATION_LOGO_URL,
  ORGANIZATION_SAME_AS,
  SITE_URL,
  SOCIAL_PROFILES,
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
    expect(ORGANIZATION_JSON_LD.sameAs).toEqual([
      "https://x.com/Teamulate",
      "https://www.linkedin.com/company/teamulate/",
      "https://www.tiktok.com/@teamulate",
      "https://www.youtube.com/@teamulate",
      "https://www.instagram.com/teamulate/",
      "https://www.facebook.com/profile.php?id=61594152804581",
    ]);
    expect(ORGANIZATION_JSON_LD.sameAs).toEqual(ORGANIZATION_SAME_AS);
    expect(ORGANIZATION_JSON_LD.sameAs).toEqual(SOCIAL_PROFILES.map((profile) => profile.href));
    expect(ORGANIZATION_JSON_LD).not.toHaveProperty("address");
    expect(ORGANIZATION_JSON_LD).not.toHaveProperty("location");
    expect(JSON.stringify(ORGANIZATION_JSON_LD)).not.toMatch(/Barrie|Ontario|Canada|PostalAddress/i);
    expect(JSON.stringify(ORGANIZATION_JSON_LD)).not.toMatch(
      /wikipedia\.org|crunchbase\.com|martechulate|marketeam|teamulation|singularity/i,
    );
  });

  it("disambiguates Teamulate with the locked W1 identity fields only", () => {
    expect(ORGANIZATION_JSON_LD.disambiguatingDescription).toBe(
      "Teamulate (teamulate.ca) is a managed AI marketing department for B2B companies. It is distinct from unrelated HR and behavioural-skills products that use similar names.",
    );
    expect(ORGANIZATION_JSON_LD.disambiguatingDescription).toBe(ORGANIZATION_DISAMBIGUATING_DESCRIPTION);
    expect(ORGANIZATION_JSON_LD.alternateName).toEqual(["Teamulate AI Marketing Team"]);
    expect(ORGANIZATION_JSON_LD.alternateName).toHaveLength(1);
    expect(ORGANIZATION_JSON_LD.image).toBe("https://teamulate.ca/assets/og/teamulate-og.png");
    expect(ORGANIZATION_JSON_LD.image).toBe(MARKETING_SHARE_IMAGE_URL);
    expect(existsSync(resolve(process.cwd(), "public/assets/og/teamulate-og.png"))).toBe(true);

    // Merge-only: nothing else may be added alongside the three W1 fields.
    expect(ORGANIZATION_JSON_LD).not.toHaveProperty("knowsAbout");
    expect(ORGANIZATION_JSON_LD).not.toHaveProperty("notes");
    expect(Object.keys(ORGANIZATION_JSON_LD).sort()).toEqual(
      [
        "@id",
        "@type",
        "alternateName",
        "description",
        "disambiguatingDescription",
        "image",
        "legalName",
        "logo",
        "name",
        "sameAs",
        "url",
      ].sort(),
    );
    expect(JSON.stringify(ORGANIZATION_JSON_LD)).not.toMatch(/\/\*|TODO|NOTE:|implementation/i);
  });

  it("merges into the existing homepage graph without a second Organization", () => {
    const layout = src("src/app/layout.tsx");
    expect(layout).toContain("ORGANIZATION_JSON_LD");
    expect(layout).toContain('"@graph"');
    expect(layout).toContain("WebSite");
    expect(layout.match(/ORGANIZATION_JSON_LD/g)?.length).toBeGreaterThanOrEqual(1);
    expect(layout).not.toContain("SITE.category");
    expect(layout).not.toMatch(/PostalAddress|addressLocality|Barrie/);
  });

  it("puts Teamulate in the homepage H1 as a proper name", () => {
    const home = src("src/app/page.tsx");
    expect(home).toContain("Teamulate — Your AI Marketing Team");
    expect(home).toContain('title: "Teamulate | Your AI Marketing Team"');
    expect(home).not.toMatch(/Articulate|Stimulate|MarTechulate|Marketeam/i);
    expect(home).not.toMatch(/Barrie|Ontario|PostalAddress/);
  });
});
