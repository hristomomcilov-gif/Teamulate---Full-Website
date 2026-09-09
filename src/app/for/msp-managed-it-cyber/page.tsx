import type { Metadata } from "next";
import Link from "next/link";
import { AGENTS } from "@/content/agents";
import {
  MSP_HUB_BYLINE,
  MSP_HUB_CTAS,
  MSP_HUB_DECISION_MODELS,
  MSP_HUB_DEK,
  MSP_HUB_EYEBROW,
  MSP_HUB_FIT,
  MSP_HUB_H1,
  MSP_HUB_META_DESCRIPTION,
  MSP_HUB_NOT_FIT,
  MSP_HUB_PATH,
  MSP_HUB_PROOF_CARDS,
  MSP_HUB_PULLQUOTE,
  MSP_HUB_SEAT_MAP,
  MSP_HUB_SEO_TITLE,
  MSP_HUB_SOURCES,
  MSP_HUB_TAKEAWAYS,
  MSP_HUB_UNFINISHED_WORK,
  MSP_HUB_WALL_SIGNALS,
} from "@/content/msp-hub";
import { PullQuote } from "@/components/blog/PullQuote";
import { ScrollTable } from "@/components/blog/ScrollTable";
import { CtaLink } from "@/components/CtaLink";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { absoluteUrl, marketingShareMetadata } from "@/lib/site";

/**
 * Preview / staging build (Gate A). The route stays noindex,nofollow and out of
 * the public sitemap until Chris gives an explicit publish yes.
 */
export const metadata: Metadata = {
  title: MSP_HUB_SEO_TITLE,
  description: MSP_HUB_META_DESCRIPTION,
  alternates: { canonical: absoluteUrl(MSP_HUB_PATH) },
  robots: { index: false, follow: false },
  ...marketingShareMetadata,
  openGraph: {
    ...marketingShareMetadata.openGraph,
    url: absoluteUrl(MSP_HUB_PATH),
    title: `${MSP_HUB_SEO_TITLE} | Teamulate`,
    description: MSP_HUB_META_DESCRIPTION,
  },
};

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-brand hover:underline">
      {children}
    </Link>
  );
}

export default function MspManagedItCyberPage() {
  const seatRows = AGENTS.map((agent) => [
    agent.name,
    agent.role,
    MSP_HUB_SEAT_MAP[agent.slug] ?? agent.mission,
    agent.approvalRequiredActions.join("; "),
  ]);

  return (
    <>
      {/* Hook */}
      <Section className="pt-16">
        <div className="mx-auto max-w-[820px]">
          <Eyebrow>{MSP_HUB_EYEBROW}</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{MSP_HUB_H1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{MSP_HUB_DEK}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{MSP_HUB_BYLINE}</p>
        </div>
      </Section>

      {/* Proof cards */}
      <Section muted className="pt-4">
        <div className="mx-auto grid max-w-[1000px] gap-4 sm:grid-cols-3">
          {MSP_HUB_PROOF_CARDS.map((card) => (
            <Card key={card.value}>
              <p className="text-3xl font-bold tracking-tight text-brand">{card.value}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{card.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{card.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Direct answer */}
      <Section>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading eyebrow="Direct answer" title="What Teamulate is for a managed IT or cybersecurity firm" />
          <p className="text-base leading-relaxed text-ink">
            Teamulate is a managed AI marketing department: eleven named seats — a Head of Marketing (Strategos), eight
            execution specialists, and two independent assurance seats (Guardian and Metric) — working inside the tools
            your firm already uses, with human approvals on strategy, spend, brand, and sensitive claims.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            For an MSP, managed IT, or cybersecurity firm, that may mean the service pages, case studies, lifecycle
            emails, and partner assets that keep slipping behind client work get drafted, independently checked, and
            queued for your approval — without adding payroll, and with your team holding every approval.
          </p>
          <div className="mt-8">
            <PullQuote label="The operating idea">{MSP_HUB_PULLQUOTE}</PullQuote>
          </div>
        </div>
      </Section>

      {/* Why you can hit the wall */}
      <Section muted>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading
            eyebrow="Why the wall shows up"
            title="Why an MSP or cyber firm can hit the marketing wall"
            lede="Not every firm hits it. If several of these are true, marketing may be the workstream that keeps losing to delivery."
          />
          <ul className="space-y-3">
            {MSP_HUB_WALL_SIGNALS.map((signal) => (
              <li key={signal} className="flex gap-3 text-base leading-relaxed text-ink-muted">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Unfinished work inventory */}
      <Section>
        <div className="mx-auto max-w-[1000px]">
          <SectionHeading
            eyebrow="Unfinished work inventory"
            title="The work that may be waiting — and who may pick it up"
            lede="A way to check the fit against your own backlog. Every row ends with what stays with your team."
          />
          <ScrollTable
            caption="Marketing work that may stall at an MSP or cybersecurity firm, why it stalls, which Teamulate seats may pick it up, and what stays with the client"
            headers={["Work that may stall", "Why it may stall", "Seats that may pick it up", "What stays with you"]}
            rows={MSP_HUB_UNFINISHED_WORK.map((row) => [row.work, row.why, row.seats, row.yours])}
          />
        </div>
      </Section>

      {/* Seat map */}
      <Section muted>
        <div className="mx-auto max-w-[1000px]">
          <SectionHeading
            eyebrow="Seat map"
            title="Eleven named seats, read for a managed IT or cyber practice"
            lede="Same roster as the Team page. The last column is what each seat may never do without your approval."
          />
          <ScrollTable
            caption="Teamulate seat map for MSPs: seat, role, what it may do for a managed IT or cybersecurity firm, and what requires client approval"
            headers={["Seat", "Role", "What it may do for you", "Waits for your approver"]}
            rows={seatRows}
          />
          <p className="mt-4 text-sm text-ink-muted">
            Full profiles, inputs, outputs and boundaries for every seat are on <TextLink href="/team/">the Team page</TextLink>.
          </p>
        </div>
      </Section>

      {/* Fit / not fit */}
      <Section>
        <div className="mx-auto max-w-[1000px]">
          <SectionHeading eyebrow="Honest fit" title="When this is a fit — and when it is not" />
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-bold text-ink">Likely a fit if</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
                {MSP_HUB_FIT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-bold text-ink">Probably not a fit if</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
                {MSP_HUB_NOT_FIT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* Governance teaser */}
      <Section muted>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading
            eyebrow="Governance"
            title="Approvals that feel like change control"
            lede="If your firm already runs tickets, SLAs, and change windows, the approval model will look familiar."
          />
          <Card>
            <ul className="space-y-2.5 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="text-ink">P0–P4 tiers:</strong> the model decides what may run inside policy and what
                waits for a human. New strategy, new audiences or offers, and meaningful budget or production changes
                wait.
              </li>
              <li>
                <strong className="text-ink">Approval packets:</strong> what, why now, risk tier, preview, evidence, QA
                result, impact of approve / reject / delay, rollback plan, and an expiry.
              </li>
              <li>
                <strong className="text-ink">Action-bound and expiring:</strong> an approval authorizes exactly one
                action. Change the payload and the approval is invalid.
              </li>
              <li>
                <strong className="text-ink">Client-owned environment, least privilege, audit trail:</strong> your
                accounts, minimum scopes, and an append-only record of who acted, on what, under which approval.
              </li>
              <li>
                <strong className="text-ink">Rollback and kill switch:</strong> pause per workflow, per integration, per
                tenant — and a global stop on external writes.
              </li>
            </ul>
          </Card>
          <p className="mt-4 text-sm text-ink-muted">
            The full model is on <TextLink href="/security-governance/">Security &amp; Governance</TextLink>.
          </p>
        </div>
      </Section>

      {/* Decision models */}
      <Section>
        <div className="mx-auto max-w-[1000px]">
          <SectionHeading
            eyebrow="Decision models"
            title="Four ways to staff marketing, and where a managed AI department sits"
            lede="None of these is wrong. The question is which trade-off your firm can live with this year."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {MSP_HUB_DECISION_MODELS.map((model) => (
              <Card key={model.title}>
                <h3 className="text-base font-bold text-ink">{model.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{model.body}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            The side-by-side is on{" "}
            <TextLink href="/compare/ai-vs-agency-vs-fractional-vs-inhouse/">Compare your options</TextLink>.
          </p>
        </div>
      </Section>

      {/* Economics teaser */}
      <Section muted>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading eyebrow="Economics" title="What the 90% figure does and does not mean" />
          <p className="text-base leading-relaxed text-ink-muted">
            Teamulate’s public comparison is <strong className="text-ink">90% lower people-cost</strong> than a modeled
            10-role in-house marketing department. It compares people-cost only — software subscriptions and advertising
            spend are excluded on both sides — and it is a modeled cost structure, not a guarantee of leads, pipeline, or
            revenue. The methodology and its limits are on the{" "}
            <TextLink href="/research/marketing-team-cost-2026/">research page</TextLink>.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Plans are priced monthly in CAD with a one-time setup fee. Current plan details are on{" "}
            <TextLink href="/pricing/">Pricing</TextLink>.
          </p>
        </div>
      </Section>

      {/* Soft CTAs */}
      <Section>
        <div className="mx-auto max-w-[820px]">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-ink">See how the seats would work inside your stack</h2>
            <p className="mt-2 text-base leading-relaxed text-ink-muted">
              A demonstration walks through your stack, the approval configuration, and the first workstreams the seats
              would pick up. No commitment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaLink href={MSP_HUB_CTAS.primary.href} ctaId={MSP_HUB_CTAS.primary.ctaId} kind="primary">
                {MSP_HUB_CTAS.primary.label}
              </CtaLink>
              {MSP_HUB_CTAS.secondary.map((cta) => (
                <CtaLink key={cta.ctaId} href={cta.href} ctaId={cta.ctaId} kind="secondary">
                  {cta.label}
                </CtaLink>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Sources */}
      <Section muted>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading eyebrow="Sources" title="Where every claim on this page comes from" />
          <ul className="space-y-2 text-sm leading-relaxed text-ink-muted">
            {MSP_HUB_SOURCES.map((source) => (
              <li key={source.href}>
                <TextLink href={source.href}>{source.label}</TextLink>{" "}
                <span className="text-ink-muted">— teamulate.ca{source.href}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Takeaways */}
      <Section>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading eyebrow="Takeaways" title="If you only read this section" />
          <ol className="list-decimal space-y-3 pl-5 text-base leading-relaxed text-ink-muted">
            {MSP_HUB_TAKEAWAYS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
