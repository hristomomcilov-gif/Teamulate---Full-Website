import type { Metadata } from "next";
import Link from "next/link";
import {
  ELEVEN_ROLE_SALARIES,
  ELEVEN_VS_ELEVEN_FIGURES as F,
  FEATURED_BLOG_POST,
} from "@/content/blog";
import { PdfDownloadLink } from "@/components/blog/PdfDownloadLink";
import { PullQuote } from "@/components/blog/PullQuote";
import {
  FigureEmployerBurden,
  FigurePublicSavings,
  FigureSalaryIndex,
} from "@/components/blog/ReportFigures";
import { ScrollTable } from "@/components/blog/ScrollTable";
import { YouTubeEmbed } from "@/components/blog/YouTubeEmbed";
import { CtaLink } from "@/components/CtaLink";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { SITE, absoluteUrl } from "@/lib/site";

const post = FEATURED_BLOG_POST;
const shareImage = {
  url: absoluteUrl(post.featuredImage),
  secureUrl: absoluteUrl(post.featuredImage),
  width: 1200,
  height: 630,
  type: "image/png" as const,
};

export const metadata: Metadata = {
  title: post.title,
  description: `${post.subtitle} Salary-only benchmarks ~${F.salaryUsRound} and ${F.salaryCaRound}; modeled employer cost ~${F.loadedUsRound} and ${F.loadedCaRound}. Public people-cost positioning: ${F.publicSavings}, modeled, not a guarantee.`,
  alternates: { canonical: absoluteUrl(post.href) },
  authors: [{ name: post.author }],
  openGraph: {
    siteName: SITE.name,
    type: "article",
    url: absoluteUrl(post.href),
    title: post.title,
    description: post.subtitle,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.subtitle,
    images: [shareImage.url],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  alternativeHeadline: post.subtitle,
  description: post.excerpt,
  author: { "@type": "Person", name: post.author },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.domain },
  datePublished: post.datePublished,
  dateModified: post.datePublished,
  image: shareImage.url,
  mainEntityOfPage: absoluteUrl(post.href),
};

export default function ElevenVsElevenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Section className="pt-16 pb-8">
        <div className="mx-auto max-w-[820px] space-y-6">
          <p className="text-sm text-ink-muted">
            <Link href="/blog/" className="font-semibold text-brand hover:underline">
              Blog
            </Link>
            <span aria-hidden> / </span>
            <span>11 vs. 11</span>
          </p>
          <Eyebrow>Public-facing comparison</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{post.title}</h1>
          <p className="text-lg font-medium leading-relaxed text-ink-muted">{post.subtitle}</p>
          <p className="text-sm text-ink-muted">
            By <strong className="text-ink">{post.author}</strong> · {post.dateLabel} · United States + Canada
            national wage benchmarks
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-(--tm-radius-md) bg-surface-muted px-5 py-4">
              <p className="text-2xl font-extrabold tabular-nums text-brand">{F.salaryUsRound}</p>
              <p className="mt-1 text-xs leading-snug text-ink-muted">U.S. salary-only benchmark</p>
            </div>
            <div className="rounded-(--tm-radius-md) bg-lavender px-5 py-4">
              <p className="text-2xl font-extrabold tabular-nums text-brand">{F.salaryCaRound}</p>
              <p className="mt-1 text-xs leading-snug text-ink-muted">Canada salary-only benchmark</p>
            </div>
            <div className="rounded-(--tm-radius-md) border border-line bg-surface px-5 py-4">
              <p className="text-2xl font-extrabold tabular-nums text-brand">90%</p>
              <p className="mt-1 text-xs leading-snug text-ink-muted">up to lower people-cost, modeled</p>
            </div>
          </div>

          <PullQuote label="The thesis">
            Most businesses do not actually need eleven additional payrolls. They need the coordinated capabilities
            those eleven specialists provide. Teamulate is designed to deliver broad marketing coverage through a
            coordinated AI agent team that can work from the same priorities, plans and operating context — while
            keeping humans in control of the decisions that genuinely require human judgment.
          </PullQuote>

          <p className="text-sm leading-relaxed text-ink-muted">
            This is functional coverage, not a claim that one AI agent equals one employee. Human leadership stays
            essential for judgment, brand taste, sensitive approvals and accountability.
          </p>

          <YouTubeEmbed videoId={post.youtubeId} title={post.youtubeTitle} />
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="The payroll"
            title="What an 11-person marketing department actually costs"
            lede="U.S. figures are BLS median annual wages. Canada figures are Job Bank wages annualized at 2,080 hours. August 2026 pull."
          />
          <ScrollTable
            caption="Illustrative eleven-role salary benchmarks, United States and Canada wage models"
            headers={["Illustrative role", "United States / median annual (USD)", "Canada / annualized median (CAD)"]}
            rows={[
              ...ELEVEN_ROLE_SALARIES.map((row) => [row.role, row.us, row.ca]),
              [
                "Salary-only total",
                `US $${F.salaryUsExact.toLocaleString("en-US")}`,
                `C$${F.salaryCaExact.toLocaleString("en-CA")}`,
              ],
            ]}
          />
          <p className="text-sm leading-relaxed text-ink">
            Salary-only benchmark: approximately{" "}
            <strong className="tabular-nums">US ${F.salaryUsExact.toLocaleString("en-US")}</strong> per year in the
            United States wage model and{" "}
            <strong className="tabular-nums">C${F.salaryCaExact.toLocaleString("en-CA")}</strong> per year in the
            Canada wage model.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Modeled employer cost</p>
              <p className="mt-2 text-xl font-extrabold tabular-nums text-ink">{F.loadedUsRound}</p>
              <p className="text-sm tabular-nums text-ink-muted">
                US ${F.loadedUsExact.toLocaleString("en-US")} · ~${F.loadedUsMonthly.toLocaleString("en-US")}/month
              </p>
              <p className="mt-3 text-xl font-extrabold tabular-nums text-ink">{F.loadedCaRound}</p>
              <p className="text-sm tabular-nums text-ink-muted">
                C${F.loadedCaExact.toLocaleString("en-CA")} · ~C${F.loadedCaMonthly.toLocaleString("en-CA")}/month
              </p>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Why salary is not the bill</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                BLS ECEC March 2026 (management / professional, private industry): $53.50/hour wages + $24.59/hour
                benefits — about 46% above U.S. wages. Canada: 2026 employer CPP/EI outside Quebec ~C$63,700 plus an
                illustrative 15% benefits-plan ~C$130,000 — about 22% above Canadian wages. Job Bank: 95.5% of
                marketing managers receive at least one non-wage benefit.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px] space-y-10">
          <SectionHeading eyebrow="The figures" title="How the load, and the public claim, actually look" />
          <FigureSalaryIndex />
          <FigureEmployerBurden />
          <FigurePublicSavings />
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-5">
          <SectionHeading eyebrow="Judgment" title="Hybrid by default. Alignment is not free." />
          <PullQuote label="The hybrid principle">
            Keep humans closest to strategy, taste, relationships, risk and accountability. Keep AI closest to
            research, preparation, production, repetition, monitoring, reporting, documentation and cross-channel
            execution.
          </PullQuote>
          <p className="text-base leading-relaxed text-ink">
            Disagreement can surface better ideas. AI alignment is an advantage only when the direction is good — if
            the brief is wrong, aligned agents will be wrong together. Design for a human who can reject the strategy,
            ask for alternative directions, and stop on stale context.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading eyebrow="Fit" title="Who should choose which model" />
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="text-sm font-bold text-ink">Teamulate</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                You need broad coverage and will stay on judgment, without eleven additional payrolls.
              </p>
            </Card>
            <Card>
              <p className="text-sm font-bold text-ink">Hybrid</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                A human stays closest to strategy, taste and relationships; the department carries production and
                monitoring.
              </p>
            </Card>
            <Card>
              <p className="text-sm font-bold text-ink">Human-team-first</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                The work is the relationship, the product is original creative direction, or risk must stay in a fully
                human employment chain.
              </p>
            </Card>
          </div>
          <p className="text-lg font-semibold text-ink">Build the capability before you build the payroll.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PdfDownloadLink
              href={post.pdfHref}
              contentId={post.slug}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4a38d8]"
            >
              Download the full report (PDF)
            </PdfDownloadLink>
            <CtaLink href="/pricing/" ctaId="blog-11v11-pricing" kind="secondary">
              See plans
            </CtaLink>
            <CtaLink href="/blog/" ctaId="blog-11v11-back" kind="secondary" variant="ghost">
              Back to the blog
            </CtaLink>
          </div>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-4">
          <SectionHeading eyebrow="Sources" title="Sources and methodology" />
          <Card>
            <ul className="space-y-2 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="text-ink">U.S. BLS</strong> — OEWS national median annual wages (August 2026 pull);
                ECEC March 2026 management/professional private industry ($53.50 + $24.59/hour).
              </li>
              <li>
                <strong className="text-ink">Canada Job Bank</strong> — median wages annualized at 2,080 hours; 95.5%
                of marketing managers reported with at least one non-wage benefit.
              </li>
              <li>
                <strong className="text-ink">CRA + typical benefits-plan context</strong> — 2026 employer CPP/EI
                outside Quebec (~C$63,700 on this wage base) plus an illustrative 15% benefits-plan (~C$130,000).
              </li>
              <li>
                Not a quote for your city, not a guarantee, not one-to-one output. Software and ads excluded from
                people-cost percentages.
              </li>
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
