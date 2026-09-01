/**
 * Blog catalog. One published post is enough for v0 — no empty magazine slots.
 * Public savings language is locked at 90% (not the PDF cover's 95%).
 */

export type BlogPost = {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  excerpt: string;
  dateLabel: string;
  datePublished: string;
  author: string;
  featuredImage: string;
  featuredImageAlt: string;
  pdfHref: string;
  youtubeId: string;
  youtubeTitle: string;
};

export const ELEVEN_VS_ELEVEN_SLUG = "11-human-hires-vs-11-ai-specialists";

/** Locked research totals from the August 2026 comparison report. */
export const ELEVEN_VS_ELEVEN_FIGURES = {
  salaryUsExact: 960_490,
  salaryCaExact: 866_486,
  salaryUsRound: "US $960K",
  salaryCaRound: "C$866K",
  loadedUsExact: 1_401_956,
  loadedCaExact: 1_060_174,
  loadedUsRound: "US $1.40M",
  loadedCaRound: "C$1.06M",
  loadedUsMonthly: 116_830,
  loadedCaMonthly: 88_348,
  publicSavings: "up to 90%",
} as const;

export const ELEVEN_ROLE_SALARIES = [
  { role: "Marketing Director / Strategy Lead", us: "US $166,790", ca: "C$115,003" },
  { role: "Marketing Strategist", us: "US $78,760", ca: "C$74,006" },
  { role: "Market & Competitive Research Analyst", us: "US $78,760", ca: "C$74,006" },
  { role: "SEO / GEO Specialist", us: "US $78,760", ca: "C$74,006" },
  { role: "Content Writer / Copywriter", us: "US $76,910", ca: "C$76,565" },
  { role: "Social Media & Community Specialist", us: "US $78,760", ca: "C$74,006" },
  { role: "Email / Lifecycle Marketing Specialist", us: "US $78,760", ca: "C$74,006" },
  { role: "Paid Media / Demand Generation Specialist", us: "US $78,760", ca: "C$74,006" },
  { role: "Graphic Designer", us: "US $62,960", ca: "C$65,000" },
  { role: "Video Editor", us: "US $75,420", ca: "C$72,010" },
  { role: "Marketing Operations & Automation Specialist", us: "US $105,850", ca: "C$93,870" },
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: ELEVEN_VS_ELEVEN_SLUG,
    href: `/blog/${ELEVEN_VS_ELEVEN_SLUG}/`,
    title: "11 Human Hires vs. 11 AI Specialists",
    subtitle:
      "The cost, capacity, consistency and control trade-offs behind a modern marketing department.",
    excerpt:
      "Most businesses do not need eleven additional payrolls. They need the coordinated capabilities those eleven specialists provide. A buyer guide to cost, capacity, consistency and control — with humans still owning the decisions that need judgment.",
    dateLabel: "August 2026",
    datePublished: "2026-08-01",
    author: "Chris Momchilov",
    featuredImage: `/assets/blog/${ELEVEN_VS_ELEVEN_SLUG}-og.png`,
    featuredImageAlt:
      "Teamulate blog cover: 11 Human Hires vs. 11 AI Specialists, brand purple field with the Teamulate T lockup.",
    pdfHref: `/reports/${ELEVEN_VS_ELEVEN_SLUG}.pdf`,
    youtubeId: "Lr8QlT2ng9o",
    youtubeTitle: "11 Human Hires vs. 11 AI Specialists — Teamulate explainer",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export const FEATURED_BLOG_POST = BLOG_POSTS[0];
