import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ORGANIZATION_SAME_AS, SOCIAL_PROFILES } from "@/lib/site";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

const EXPECTED_HREFS = [
  "https://x.com/Teamulate",
  "https://www.linkedin.com/company/teamulate/",
  "https://www.tiktok.com/@teamulate",
  "https://www.youtube.com/@teamulate",
  "https://www.instagram.com/teamulate/",
  "https://www.facebook.com/profile.php?id=61594152804581",
] as const;

describe("Footer social icons", () => {
  const footer = src("src/components/SiteFooter.tsx");
  const icons = src("src/components/SocialIcons.tsx");

  it("renders an icon-only row from the locked official profiles", () => {
    expect(footer).toContain("SocialIcons");
    expect(SOCIAL_PROFILES.map((profile) => profile.href)).toEqual([...EXPECTED_HREFS]);
    expect(ORGANIZATION_SAME_AS).toEqual([...EXPECTED_HREFS]);
    expect(icons).toContain('target="_blank"');
    expect(icons).toContain('rel="noopener noreferrer"');
    expect(icons).toContain("aria-label={profile.label}");
    expect(icons).toContain("aria-hidden");
    expect(icons).toContain("fill=\"currentColor\"");
    expect(icons).not.toMatch(/<a[^>]*>\s*(X|LinkedIn|TikTok|YouTube|Instagram|Facebook)\s*<\/a>/);
  });

  it("does not invent extra profiles, addresses, or Singularity Drive YouTube", () => {
    expect(SOCIAL_PROFILES).toHaveLength(6);
    expect(icons).not.toMatch(/Barrie|Ontario|Canada|PostalAddress/i);
    expect(footer).not.toMatch(/Barrie|Ontario|Canada|PostalAddress/i);
    expect(icons + footer).not.toMatch(/singularity|youtu\.be\/|youtube\.com\/watch|youtube\.com\/channel/i);
    for (const href of EXPECTED_HREFS) {
      expect(icons).toContain("SOCIAL_PROFILES");
      expect(SOCIAL_PROFILES.some((profile) => profile.href === href)).toBe(true);
    }
  });
});
