/**
 * Blog catalog. Only real, published articles get a card — no empty magazine slots.
 * Public savings language is locked at 90% (not the PDF cover's 95%).
 */

/** What the /blog/ index needs to render one card. `subtitle` is the dek, `excerpt` the summary. */
export type BlogIndexCard = {
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
};

/** A post whose article body is also rendered from this repo (PDF + explainer video). */
export type BlogPost = BlogIndexCard & {
  pdfHref: string;
  youtubeId: string;
  youtubeTitle: string;
};

export const ELEVEN_VS_ELEVEN_SLUG = "11-human-hires-vs-11-ai-specialists";

/**
 * "Who AI Search Cites in 2026" is published at this URL on teamulate.ca.
 * The article body is not authored in this repo; only the index card is.
 * Do not change the slug without a redirect decision.
 */
export const WHO_AI_SEARCH_CITES_SLUG = "who-ai-search-cites-2026";

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

export const ELEVEN_VS_ELEVEN_POST: BlogPost = {
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
};

/** Dek and summary are locked copy (W1 batch, Chris Gate A). Do not paraphrase. */
export const WHO_AI_SEARCH_CITES_CARD: BlogIndexCard = {
  slug: WHO_AI_SEARCH_CITES_SLUG,
  href: `/blog/${WHO_AI_SEARCH_CITES_SLUG}/`,
  title: "Who AI Search Cites in 2026",
  subtitle: "Ranking highly does not guarantee that an AI answer will cite you.",
  excerpt:
    "An analysis of sources cited in Google AI Overviews for ordinary marketing questions on September 1, 2026—and why rankings alone are not the same as being in the answer.",
  dateLabel: "September 2026",
  datePublished: "2026-09-01",
  author: "Chris Momchilov",
  featuredImage: "/assets/og/teamulate-og.png",
  featuredImageAlt: "Teamulate share graphic: brand purple field with the Teamulate T lockup.",
};

/** Newest first. */
export const BLOG_POSTS: BlogIndexCard[] = [WHO_AI_SEARCH_CITES_CARD, ELEVEN_VS_ELEVEN_POST];

export function getBlogPost(slug: string): BlogIndexCard | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export const FEATURED_BLOG_POST = ELEVEN_VS_ELEVEN_POST;
