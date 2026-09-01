import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { FOOTER_GROUPS, HEADER_NAV, SITEMAP_ROUTES } from "@/lib/site";
import {
  BLOG_POSTS,
  ELEVEN_ROLE_SALARIES,
  ELEVEN_VS_ELEVEN_FIGURES,
  ELEVEN_VS_ELEVEN_SLUG,
  FEATURED_BLOG_POST,
} from "@/content/blog";
import { AGENTS } from "@/content/agents";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

function pngSize(buf: Buffer) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("Blog section (staging v0)", () => {
  const index = src("src/app/blog/page.tsx");
  const article = src("src/app/blog/11-human-hires-vs-11-ai-specialists/page.tsx");

  it("keeps a real index at /blog and one published post", () => {
    expect(index).toContain("<h1");
    expect(index).toContain("Notes from the department");
    expect(index).toContain("Read the article");
    expect(index).toContain("post.href");
    expect(FEATURED_BLOG_POST.href).toBe("/blog/11-human-hires-vs-11-ai-specialists/");
    expect(BLOG_POSTS).toHaveLength(1);
    expect(FEATURED_BLOG_POST.href).toBe(`/blog/${ELEVEN_VS_ELEVEN_SLUG}/`);
    expect(FEATURED_BLOG_POST.title).toBe("11 Human Hires vs. 11 AI Specialists");
    expect(FEATURED_BLOG_POST.subtitle).toContain("cost, capacity, consistency and control");
    expect(FEATURED_BLOG_POST.youtubeId).toBe("Lr8QlT2ng9o");
  });

  it("adds Blog to header and footer without removing Guides", () => {
    expect(HEADER_NAV.map((g) => g.label)).toEqual([
      "How it works",
      "Team",
      "Pricing",
      "Blog",
      "Demo",
    ]);
    expect(HEADER_NAV.find((g) => g.label === "Blog")?.items[0].href).toBe("/blog/");
    const guides = FOOTER_GROUPS.find((g) => g.label === "Guides");
    expect(guides?.items).toHaveLength(6);
    expect(guides?.items.map((i) => i.href)).toContain("/research/marketing-team-cost-2026/");
    expect(FOOTER_GROUPS.find((g) => g.label === "Company")?.items.map((i) => i.href)).toContain("/blog/");
    expect(SITEMAP_ROUTES).toContain("/blog/");
    expect(SITEMAP_ROUTES).toContain("/blog/11-human-hires-vs-11-ai-specialists/");
  });

  it("keeps public savings at 90% and out of 95% headlines", () => {
    expect(ELEVEN_VS_ELEVEN_FIGURES.publicSavings).toBe("up to 90%");
    expect(article).toContain(">90%<");
    expect(article).toContain("up to 90%");
    expect(article).not.toMatch(/up to 95%/i);
    expect(article).not.toMatch(/<h1[^>]*>[\s\S]*95%/);
    expect(index).not.toMatch(/95%/);
    expect(ELEVEN_VS_ELEVEN_FIGURES.salaryUsExact).toBe(960_490);
    expect(ELEVEN_VS_ELEVEN_FIGURES.salaryCaExact).toBe(866_486);
    expect(ELEVEN_VS_ELEVEN_FIGURES.loadedUsExact).toBe(1_401_956);
    expect(ELEVEN_VS_ELEVEN_FIGURES.loadedCaExact).toBe(1_060_174);
    expect(ELEVEN_VS_ELEVEN_FIGURES.loadedUsMonthly).toBe(116_830);
    expect(ELEVEN_VS_ELEVEN_FIGURES.loadedCaMonthly).toBe(88_348);
    expect(article).toContain("F.salaryUsRound");
    expect(article).toContain("F.loadedUsExact");
  });

  it("embeds the official explainer and links index ↔ post ↔ PDF", () => {
    const embed = src("src/components/blog/YouTubeEmbed.tsx");
    expect(embed).toContain("youtube-nocookie.com/embed/");
    expect(embed).toContain("aspect-video");
    expect(embed).not.toMatch(/autoplay=/);
    expect(embed).not.toContain("autoplay=1");
    expect(article).toContain("<YouTubeEmbed");
    expect(article).toContain("post.youtubeId");
    expect(article).toContain('href="/blog/"');
    expect(article).toContain("Download the full report (PDF)");
    expect(article).toContain("post.pdfHref");
    expect(article).toContain("Back to the blog");
  });

  it("uses the live 11-agent roster and the locked role table", () => {
    expect(AGENTS).toHaveLength(11);
    expect(AGENTS.map((a) => a.name)).toEqual([
      "Strategos",
      "Scout",
      "Wordsmith",
      "Seeker",
      "GrowthTrack",
      "Pixel",
      "Flow",
      "Socialite",
      "Nexus",
      "Metric",
      "Guardian",
    ]);
    expect(ELEVEN_ROLE_SALARIES).toHaveLength(11);
    expect(ELEVEN_ROLE_SALARIES[0]).toEqual({
      role: "Marketing Director / Strategy Lead",
      us: "US $166,790",
      ca: "C$115,003",
    });
    for (const name of AGENTS.map((a) => a.name)) {
      expect(article).toContain(name);
    }
  });

  it("ships a branded OG image and a real PDF download", () => {
    const og = resolve(process.cwd(), `public${FEATURED_BLOG_POST.featuredImage}`);
    const pdf = resolve(process.cwd(), `public${FEATURED_BLOG_POST.pdfHref}`);
    expect(existsSync(og)).toBe(true);
    expect(existsSync(pdf)).toBe(true);
    const ogBuf = readFileSync(og);
    expect(ogBuf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    expect(pngSize(ogBuf)).toEqual({ width: 1200, height: 630 });
    const pdfBuf = readFileSync(pdf);
    expect(pdfBuf.subarray(0, 5).toString("utf8")).toBe("%PDF-");
    expect(pdfBuf.byteLength).toBeGreaterThan(8_000);
    expect(pdfBuf.toString("latin1")).not.toMatch(/up to 95%/i);
  });

  it("does not invent testimonials or live metrics", () => {
    expect(article).not.toMatch(/trusted by/i);
    expect(article).not.toMatch(/testimonial/i);
    expect(article).not.toContain("Guaranteed");
    expect(article).toContain("modeled, not a guarantee");
  });
});
