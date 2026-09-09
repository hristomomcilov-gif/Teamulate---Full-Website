import type { Metadata } from "next";
import Link from "next/link";
import { TEAM_STRUCTURE_SENTENCE } from "@/content/agents";
import { DepartmentOrgChart } from "@/components/team/DepartmentOrgChart";
import { CtaLink } from "@/components/CtaLink";
import { Eyebrow, Section } from "@/components/ui";

/**
 * PREVIEW DRAFT of the /team/ "department organization" redesign (8 Sep 2026).
 *
 * - Lives only at /preview/team/. The live /team/ page is untouched.
 * - noindex,nofollow here, /preview/ is disallowed in robots.txt, and the
 *   sitemap generator blocks the /preview/ prefix - never add this route to
 *   SITEMAP_ROUTES.
 * - No canonical: a noindex draft must not point search engines anywhere.
 * - Flow overlays the self-contained bundle from scripts/export-preview-team.sh
 *   under teamulate.ca/preview/team/ only (see docs/ROUTE_INVENTORY.md).
 */
export const metadata: Metadata = {
  title: "The Team - department redesign (preview draft)",
  description: "Preview-only draft of the redesigned Teamulate department organization section. Not published.",
  robots: { index: false, follow: false, nocache: true },
};

export default function PreviewTeamPage() {
  return (
    <>
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs text-amber-900 sm:px-8">
          <p>
            <span className="font-semibold uppercase tracking-[0.12em]">Preview draft</span> - redesigned department
            section for review. noindex, not linked from navigation, not the live page.
          </p>
          <Link href="/team/" className="font-semibold underline-offset-2 hover:underline">
            Open the live /team/ page
          </Link>
        </div>
      </div>

      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>The team</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            One coordinated department, not eleven chatbots
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            {TEAM_STRUCTURE_SENTENCE}. Every agent has a defined role, defined inputs and outputs, defined collaboration
            paths - and defined boundaries on what it may do autonomously and what always requires your approval.
          </p>
        </div>
      </Section>

      {/* The redesigned "How the department is organized" section. Seat cards
          link to the live profiles so reviewers can check every role line. */}
      <DepartmentOrgChart id="structure" profileHrefBase="/team/" />

      <Section muted>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">See the department at work</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Watch a goal move through delegation, QA, approval and measurement in the interactive demo.
            </p>
          </div>
          <CtaLink href="/request-demo/" ctaId="preview-team-final" kind="primary">
            Meet your department
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
