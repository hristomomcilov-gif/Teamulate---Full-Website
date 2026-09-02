import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ORGANIZATION_SAME_AS, SOCIAL_PROFILES } from "@/lib/site";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

const LOCKED_SOCIAL = [
  "https://x.com/Teamulate",
  "https://www.linkedin.com/company/teamulate/",
  "https://www.tiktok.com/@teamulate",
  "https://www.youtube.com/@teamulate",
  "https://www.instagram.com/teamulate/",
  "https://www.facebook.com/profile.php?id=61594152804581",
] as const;

describe("2026-09-02 live marketing locks", () => {
  it("homepage 90% glance card uses coins-square, not coins-arrow or people-seats", () => {
    const home = src("src/app/page.tsx");
    expect(home).toContain('src="/assets/glance-90-coins-square.png"');
    expect(home).toContain("Up to 90%");
    expect(home).toContain("Lower people-cost than building the department");
    expect(home).not.toContain("glance-90-coins-arrow.png");
    expect(home).not.toContain("people-seats");
    const pngPath = resolve(process.cwd(), "public/assets/glance-90-coins-square.png");
    expect(existsSync(pngPath)).toBe(true);
    const png = readFileSync(pngPath);
    expect(createHash("md5").update(png).digest("hex")).toBe("456b1ae7a28df08ebaa32b44c7cf0c5c");
    expect(png.readUInt32BE(16)).toBe(276);
    expect(png.readUInt32BE(20)).toBe(276);
  });

  it("client login shows a password toggle, current-password autocomplete, and Forgot password mailto", () => {
    const pages = ["public/client-login.html", "hosting/client-login.html"];
    for (const file of pages) {
      const html = src(file);
      expect(html).toContain('action="/auth/login.php"');
      expect(html).toContain('type="password"');
      expect(html).toContain('autocomplete="current-password"');
      expect(html).toContain('id="pw-toggle"');
      expect(html).toContain('aria-label="Show password"');
      expect(html).toContain("Forgot password?");
      expect(html).toContain("mailto:skipper@teamulate.ca?subject=Teamulate%20login%20reset");
      expect(html).toContain("input.setAttribute('type', show ? 'text' : 'password')");
      expect(html).not.toMatch(/auth0/i);
    }

    const loginRoute = src("src/app/login/page.tsx");
    expect(loginRoute).toContain("/client-login.html");
    expect(loginRoute).not.toMatch(/auth0/i);
  });

  it("keeps the locked footer social URLs from PR #8", () => {
    expect(SOCIAL_PROFILES.map((profile) => profile.href)).toEqual([...LOCKED_SOCIAL]);
    expect(ORGANIZATION_SAME_AS).toEqual([...LOCKED_SOCIAL]);
    expect(src("src/components/SiteFooter.tsx")).toContain("SocialIcons");
  });
});
