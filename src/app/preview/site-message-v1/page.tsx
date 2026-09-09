import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, formatCad } from "@/content/plans";
import {
  SMV1_ASSETS,
  SMV1_CTA,
  SMV1_FAQ,
  SMV1_FINAL,
  SMV1_GLANCE,
  SMV1_HERO,
  SMV1_META,
  SMV1_RESOURCES,
  SMV1_RIBBON,
} from "@/content/site-message-v1";
import { Container, Section } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { DashboardMockup } from "@/components/home/DashboardMockup";
import { SiteImage } from "@/components/SiteImage";
import { AssetGallery } from "@/components/home/AssetGallery";
import { PlanIcon } from "@/components/PlanIcon";
import {
  BuildLogPanel,
  BuyerProblemChooser,
  EyebrowPill,
  HumanControlLayers,
  OutcomeSystems,
} from "@/components/home/SiteMessageV1Sections";

/**
 * PREVIEW DRAFT of the homepage with the Site Message & Experience Audit deltas
 * applied (8 Sep 2026): problem-first hero, buyer-problem chooser, two-layer
 * human control, three outcome systems instead of the roster, Build Log panel,
 * one CTA set.
 *
 * - Lives only at /preview/site-message-v1/. The live homepage (src/app/page.tsx)
 *   is untouched and stays the public root.
 * - noindex,nofollow here, /preview/ is disallowed in robots.txt, and the
 *   sitemap generator blocks the /preview/ prefix - never add this route to
 *   SITEMAP_ROUTES.
 * - No canonical and no share metadata: a noindex draft must not point search
 *   engines or scrapers anywhere.
 * - Flow overlays the self-contained bundle from
 *   scripts/export-preview-site-message.sh under teamulate.ca/preview/site-message-v1/
 *   only (see docs/ROUTE_INVENTORY.md). Launch Demo, /demo/, /app/ and the
 *   glance-90 coins-square asset are not touched.
 */
export const metadata: Metadata = {
  title: SMV1_META.title,
  description: SMV1_META.description,
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Pixel's annotated dashboard hero is a binary that has to be dropped into
 * public/preview/site-message-v1/. Until it is there, the static build keeps
 * the shipped DashboardMockup so the preview never shows a broken image.
 * (Resolved once at build time - this is a static export.)
 */
function hasDashboardHeroAsset(): boolean {
  return existsSync(join(process.cwd(), "public", SMV1_ASSETS.dashboardHero.src));
}

function HeroVisual() {
  if (!hasDashboardHeroAsset()) return <DashboardMockup />;
  const asset = SMV1_ASSETS.dashboardHero;
  return (
    <figure>
      <SiteImage
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        priority
        className="h-auto w-full rounded-(--tm-radius-lg) border border-line shadow-card"
      />
      <figcaption className="mt-3 text-center text-xs text-ink-muted lg:text-left">
        Demo dashboard with callouts. Sample data, labelled sample.
      </figcaption>
    </figure>
  );
}

const PLAN_FEATURES: Record<string, string[]> = {
  core: ["1 brand", "4 integrations", "8 workflows", "2 primary channels + email/site"],
  growth: ["1 brand", "8 integrations", "20 workflows", "Up to 4 active channels"],
  scale: ["1-2 business units", "12 integrations", "35 workflows", "Up to 6 active channels"],
};

export default function PreviewSiteMessageV1Page() {
  return (
    <>
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs text-amber-900 sm:px-8">
          <p>
            <span className="font-semibold uppercase tracking-[0.12em]">{SMV1_RIBBON.label}</span> - {SMV1_RIBBON.text}
          </p>
          <Link href={SMV1_RIBBON.liveHref} className="font-semibold underline-offset-2 hover:underline">
            {SMV1_RIBBON.liveLabel}
          </Link>
        </div>
      </div>

      {/* 1. Problem-first hero */}
      <Section muted className="pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center lg:max-w-none lg:text-left">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand">{SMV1_HERO.eyebrow}</p>
              <h1 className="text-[clamp(1.55rem,6.9vw,3.1rem)] font-bold leading-[1.05] tracking-tight text-ink">
                {SMV1_HERO.headline}
              </h1>
              <p className="mt-5 text-lg font-medium leading-relaxed text-ink-muted">{SMV1_HERO.dek}</p>
              <ul className="mt-6 flex flex-nowrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
                {SMV1_HERO.proofChips.map((label) => (
                  <li key={label} className="flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-ink sm:text-base">
                    <span aria-hidden className="text-sm font-extrabold text-brand">✓</span>
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:justify-start">
                <CtaLink href={SMV1_CTA.primary.href} ctaId="smv1-hero-primary" kind="primary" className="px-5 py-3 sm:px-7 sm:text-base">
                  {SMV1_CTA.primary.label} →
                </CtaLink>
                <CtaLink
                  href={SMV1_CTA.secondary.href}
                  ctaId="smv1-hero-secondary"
                  kind="secondary"
                  variant="secondary"
                  className="px-5 py-3 sm:px-7 sm:text-base"
                >
                  {SMV1_CTA.secondary.label}
                </CtaLink>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">{SMV1_HERO.tenant0}</p>
            </div>
            <HeroVisual />
          </div>
        </div>
      </Section>

      {/* 2. Buyer-problem chooser */}
      <BuyerProblemChooser />

      {/* 3. Human control, two layers (+ the shipped founder card) */}
      <HumanControlLayers />

      {/* 4. Three outcome systems instead of the eleven-card roster */}
      <OutcomeSystems />

      {/* 5. Build Log */}
      <BuildLogPanel />

      {/* The contrast / system at a glance - shipped markup, tenure lock applied */}
      <Section id="glance">
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>{SMV1_GLANCE.eyebrow}</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{SMV1_GLANCE.title}</h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex flex-row items-center gap-4 rounded-(--tm-radius-lg) bg-lavender p-6 sm:gap-8 sm:p-8">
            <div className="min-w-0 flex-1">
              <p className="text-3xl font-extrabold text-brand sm:text-4xl">{SMV1_GLANCE.headline}</p>
              <p className="mt-1 text-sm font-bold leading-snug text-ink">{SMV1_GLANCE.headlineCaption}</p>
            </div>
            <SiteImage
              src="/assets/glance-90-coins-square.png"
              alt=""
              width={80}
              height={80}
              className="h-20 w-20 shrink-0 object-contain"
              style={{ width: "5rem", height: "5rem" }}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {SMV1_GLANCE.stats.map((stat) => (
              <div key={stat.label} className="rounded-(--tm-radius-lg) border border-line bg-surface p-5 shadow-card">
                <p className="text-2xl font-extrabold tabular-nums text-ink sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-(--tm-radius-lg) border border-line bg-surface p-5 shadow-card">
            <p className="text-2xl font-extrabold text-ink sm:text-3xl">{SMV1_GLANCE.tenure.value}</p>
            <p className="mt-1 text-sm text-ink-muted">{SMV1_GLANCE.tenure.label}</p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ink-muted">
            Cost comparison based on 2026 Robert Half national midpoints plus employer load for a 10-role North
            American marketing department, against Teamulate plan fees. Software and ads excluded from people-cost
            percentages. Modeled, not a guarantee.{" "}
            <Link href="/research/marketing-team-cost-2026/" className="font-semibold text-brand underline">
              Read the full cost research
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* What your team creates - shipped markup, standardized CTA */}
      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>Output</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">What your team creates</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Ready-to-ship marketing assets that drive demand and accelerate growth.
          </p>
        </div>
        <div className="mt-10">
          <AssetGallery />
        </div>
        <div className="mx-auto mt-6 max-w-3xl rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card sm:p-8">
          <p className="text-lg font-extrabold text-ink">✦ Custom assets, your way</p>
          <p className="mt-1 text-sm text-ink-muted">Tailored to your brand, voice, and goals.</p>
          <div className="mt-5">
            <CtaLink href={SMV1_CTA.primary.href} ctaId="smv1-assets-primary" kind="primary" className="w-full py-3 text-base sm:w-auto sm:px-8">
              {SMV1_CTA.primary.label} →
            </CtaLink>
          </div>
        </div>
      </Section>

      {/* Pricing - shipped markup */}
      <section className="relative overflow-hidden bg-[#0a0a0f] py-16 sm:py-24">
        <div aria-hidden className="absolute -left-40 -top-64 h-[560px] w-[560px] rounded-full bg-brand opacity-90" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Simple pricing</h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              You pay a one-time setup and a monthly retainer.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              The GrokBot agent system is included. Martech, advertising, and premium third-party services are billed
              separately.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.key}
                className={`rounded-(--tm-radius-lg) bg-surface p-6 sm:p-7 ${plan.recommended ? "ring-2 ring-brand" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-brand">
                    <PlanIcon planKey={plan.key} />
                    {plan.name}
                  </p>
                  {plan.recommended ? (
                    <span className="rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 border-b border-line pb-5">
                  <div>
                    <p className="inline-block rounded-full bg-lavender px-2.5 py-0.5 text-[11px] font-bold text-brand">
                      One-time setup
                    </p>
                    <p className="mt-1.5 text-xl font-extrabold tabular-nums text-ink sm:text-2xl">
                      {formatCad(plan.setupCad)}
                    </p>
                  </div>
                  <div>
                    <p className="inline-block rounded-full bg-lavender px-2.5 py-0.5 text-[11px] font-bold text-brand">
                      Monthly retainer
                    </p>
                    <p className="mt-1.5 text-xl font-extrabold tabular-nums text-ink sm:text-2xl">
                      {formatCad(plan.monthlyCad)}
                      <span className="text-sm font-medium text-ink-muted">/mo</span>
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {PLAN_FEATURES[plan.key].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm font-medium text-ink">
                      <span aria-hidden className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[9px] font-bold text-white">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/pricing/"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#4a38d8]"
            >
              Compare plans and scope →
            </Link>
          </div>
        </Container>
      </section>

      {/* Resources - shipped markup; "Who runs it" now resolves to the live About Chris page */}
      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>{SMV1_RESOURCES.eyebrow}</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{SMV1_RESOURCES.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{SMV1_RESOURCES.lede}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3">
          <div className="rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card">
            <p className="inline-block rounded-full bg-lavender px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink">
              Guides
            </p>
            <h3 className="mt-3 text-lg font-extrabold text-ink">Guides to how it works</h3>
            <ul className="mt-4 space-y-1.5 text-sm font-semibold text-brand">
              <li><Link href="/autonomous-ai-marketing-department/" className="hover:underline">Autonomous Marketing Department →</Link></li>
              <li><Link href="/ai-marketing-team/" className="hover:underline">What is an AI marketing team? →</Link></li>
              <li><Link href="/workflows/" className="hover:underline">Workflow library →</Link></li>
              <li><Link href="/ai-marketing-automation/" className="hover:underline">AI vs marketing automation →</Link></li>
              <li><Link href="/research/marketing-team-cost-2026/" className="hover:underline">Marketing team cost 2026 →</Link></li>
              <li><Link href="/compare/ai-vs-agency-vs-fractional-vs-inhouse/" className="hover:underline">Compare your options →</Link></li>
            </ul>
            <div aria-hidden className="relative mt-5 h-28 overflow-hidden rounded-(--tm-radius-md) bg-[#0a0a0f]">
              <div className="absolute -left-10 top-2 h-40 w-40 rounded-full bg-brand" />
            </div>
          </div>
          <Link
            href={SMV1_RESOURCES.whoRunsIt.link.href}
            className="group rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card transition-colors hover:border-brand"
          >
            <p className="inline-block rounded-full bg-lavender px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink">
              About
            </p>
            <h3 className="mt-3 text-lg font-extrabold text-ink">{SMV1_RESOURCES.whoRunsIt.label}</h3>
            <p className="mt-4 text-sm font-bold text-brand group-hover:underline">{SMV1_RESOURCES.whoRunsIt.link.label} →</p>
            <div aria-hidden className="relative mt-5 h-28 overflow-hidden rounded-(--tm-radius-md) bg-[#0a0a0f]">
              <div className="absolute -right-10 top-2 h-40 w-40 rounded-full bg-brand-blue" />
            </div>
          </Link>
          <Link
            href={SMV1_CTA.demo.href}
            className="group rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card transition-colors hover:border-brand"
          >
            <p className="inline-block rounded-full bg-lavender px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink">
              Demo
            </p>
            <h3 className="mt-3 text-lg font-extrabold text-ink">See one workflow</h3>
            <p className="mt-4 text-sm font-bold text-brand group-hover:underline">{SMV1_CTA.demo.label} →</p>
            <div aria-hidden className="relative mt-5 h-28 overflow-hidden rounded-(--tm-radius-md) bg-[#0a0a0f]">
              <div className="absolute left-1/2 top-3 h-44 w-44 -translate-x-1/2 rounded-full bg-positive" />
            </div>
          </Link>
        </div>
      </Section>

      {/* FAQ - live answers, problem-first order */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>FAQ</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Frequently asked questions</h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={SMV1_FAQ} />
        </div>
      </Section>

      {/* Final CTA - one CTA set */}
      <section className="bg-brand py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{SMV1_FINAL.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">{SMV1_FINAL.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink
              href={SMV1_CTA.primary.href}
              ctaId="smv1-final-primary"
              kind="primary"
              className="bg-white px-8 py-3 text-base !text-brand hover:!bg-white/90"
            >
              {SMV1_CTA.primary.label} →
            </CtaLink>
            <CtaLink
              href={SMV1_CTA.secondary.href}
              ctaId="smv1-final-secondary"
              kind="secondary"
              className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              {SMV1_CTA.secondary.label}
            </CtaLink>
          </div>
          <p className="mt-5">
            <Link href={SMV1_CTA.demo.href} className="text-sm font-semibold text-white/85 underline-offset-2 hover:underline">
              {SMV1_CTA.demo.label} →
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
