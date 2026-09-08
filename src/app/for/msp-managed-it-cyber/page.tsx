import type { Metadata } from "next";
import Link from "next/link";
import { COPY } from "@/content/copy";
import { ENTITY_LINE, absoluteUrl, marketingShareMetadata } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RelatedGuides } from "@/components/RelatedGuides";

/**
 * Vertical hub for MSPs / managed IT / cybersecurity providers (W1 batch).
 * Single URL — a separate cyber-only page is on hold; do not add a second route.
 *
 * Draft state until the publish gate: noindex (follow) and excluded from
 * SITEMAP_ROUTES / llms.txt. To publish, flip `robots` to index:true and add
 * PAGE_PATH to SITEMAP_ROUTES (plus the committed sitemap.xml / sitemap.php).
 */
const PAGE_PATH = "/for/msp-managed-it-cyber/";

const PAGE_TITLE = "AI Marketing Team for MSPs & Cybersecurity";
const PAGE_DESCRIPTION =
  "Teamulate runs the recurring marketing work for MSPs, managed IT and cybersecurity providers — research, content, SEO/GEO, campaigns, CRM and reporting — with your approval on strategy, spend and sensitive claims.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: absoluteUrl(PAGE_PATH) },
  robots: { index: false, follow: true },
  ...marketingShareMetadata,
  openGraph: {
    ...marketingShareMetadata.openGraph,
    url: absoluteUrl(PAGE_PATH),
    title: `${PAGE_TITLE} | Teamulate`,
    description: PAGE_DESCRIPTION,
  },
};

const FIT_SIGNALS = [
  {
    title: "Managed service providers",
    body: "You sell managed IT, helpdesk, cloud or Microsoft 365 services on recurring contracts, and marketing tends to happen between tickets and renewals.",
  },
  {
    title: "Managed IT and IT consultancies",
    body: "Your technical people are the product. They should not also be the ones writing service pages, newsletters and LinkedIn posts at 9pm.",
  },
  {
    title: "Cybersecurity and MSSP firms",
    body: "You need consistent, accurate education for buyers who are cautious about vendors, and every claim about your security services has to be checked before it goes out.",
  },
] as const;

const RECURRING_WORK = [
  {
    title: "Service-line pages and answers",
    body: "Keep managed IT, backup, cloud and security service pages accurate, findable and written for the questions buyers actually ask — in search and in AI answers.",
  },
  {
    title: "Educational content for cautious buyers",
    body: "Plain-language explainers, checklists and updates that help a business owner or IT lead understand what you do and why it matters, drafted from your approved positioning.",
  },
  {
    title: "Client communication that keeps going",
    body: "Newsletters, service updates and follow-ups to existing clients so renewals, reviews and add-on services are not left to memory.",
  },
  {
    title: "Search, AI-search and competitor watch",
    body: "Keyword and question research, on-page work, AI-search citation monitoring and a watch on how competing providers position and price.",
  },
  {
    title: "Social presence with a queue",
    body: "A planned LinkedIn and social calendar that is produced, checked and published on schedule, with comments and messages triaged for you.",
  },
  {
    title: "Reporting you can read in five minutes",
    body: "A weekly summary of what ran, what changed and what happens next, drawn from what your tools actually recorded — never invented numbers.",
  },
] as const;

const HONEST_FIT = [
  {
    title: "Client incidents may take priority",
    body: "When a client is down, marketing waits — and it should. The department keeps routine work moving inside your guardrails, but approvals on strategy, spend and sensitive claims still need a named person on your side. If that person is regularly pulled into delivery, decisions may sit longer than either of us would like.",
  },
  {
    title: "It may limit your available time — a little",
    body: "Teamulate removes most of the doing, not all of the deciding. Expect a short, regular review of approvals and a monthly look at direction. If even that time is not realistically available right now, the department may ship less than it could, and it is better to say so up front.",
  },
  {
    title: "It may not solve an ownership problem",
    body: "If nobody in your business owns the marketing outcome, an AI department does not create that owner. It gives an owner far more capacity. If you have someone — a founder, a general manager, a sales lead — who wants marketing to move and can approve the direction, this fits. If not, that is the first conversation to have.",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Does Teamulate understand MSP and cybersecurity services?",
    answer:
      "The department works from an approved knowledge base built with you during onboarding: your services, stack, audience, positioning and the claims you are willing to make. It does not guess at your service catalogue or invent capabilities. Anything technical or security-related that is not in the approved base is flagged for your review rather than published.",
  },
  {
    question: "Will it make security or compliance claims on our behalf?",
    answer:
      "No. Brand, sensitive claims and anything with legal or compliance weight are human-gated. Drafts that touch certifications, frameworks, guarantees or incident language wait for your sign-off. Guardian, the independent QA seat, checks every output against your approved-claims list before you see it.",
  },
  {
    question: "What do we need to provide?",
    answer:
      "One named owner who can approve direction and spend, access to the tools you already use (website, CRM, email, social, analytics) under permissions you control, and a short recurring review cadence. Third-party subscriptions and ad spend stay client-owned and billed to you.",
  },
  {
    question: "How is this different from hiring an agency or a marketing coordinator?",
    answer:
      "It runs inside your accounts, on your data, with a visible operating cadence and an audit trail, and the assets and learning stay yours. It is not a replacement for someone who owns the outcome — it is the capacity that person has been missing. The comparison guide walks through agency, fractional and in-house options side by side.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function MspManagedItCyberPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>For MSPs, managed IT and cybersecurity providers</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            An AI marketing team for MSPs and cybersecurity providers
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink">
            Teamulate runs the recurring marketing work — research, content, SEO and AI-search visibility, campaigns,
            CRM and reporting — for managed IT and cyber businesses whose technical team is busy with clients. Routine
            work keeps moving inside your guardrails. Strategy, spend and anything sensitive wait for you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/request-demo/" ctaId="msp-hero-demo" kind="primary">
              See how it would run for your business
            </CtaLink>
            <CtaLink href="/contact/" ctaId="msp-hero-contact" kind="secondary">
              Ask a question first
            </CtaLink>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Who this is for"
          title="Built for businesses where the technical team is the product"
          lede="If marketing is the thing that always slips when a client needs you, the fit is usually good. Three kinds of business tend to recognise themselves here."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {FIT_SIGNALS.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What the department runs"
          title="The recurring work an MSP rarely has time for"
          lede="Every item below is a recurring workflow with an owner seat, independent QA and a human approval step where it matters — not a one-off task."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECURRING_WORK.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted">
          Which workflows run for you is decided together at onboarding from{" "}
          <Link href="/workflows/" className="font-semibold text-brand underline">
            the public workflow library
          </Link>
          . {COPY.stackDisclaimer}
        </p>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="An honest fit check"
          title="Where this may not be the right answer"
          lede="Three things worth saying before a demo, not after."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {HONEST_FIT.map((item) => (
            <Card key={item.title} className="border-l-4 border-l-brand">
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Control and security"
          title="Autonomous where safe. Gated where it matters."
          lede="Cyber and managed IT buyers ask hard questions about who touches what. The same standard applies to your marketing department."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-base font-bold text-ink">What stays with you</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
              <li>Strategy, positioning and material spend decisions.</li>
              <li>Any claim about security services, certifications, frameworks or guarantees.</li>
              <li>Permissions: the department works inside accounts you own, under access you grant and can revoke.</li>
              <li>Your assets, systems and learning — nothing leaves with a vendor.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-base font-bold text-ink">What you can see</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
              <li>What is running, what is waiting for approval and what changed — in one dashboard.</li>
              <li>Independent QA on brand, claims and quality before anything reaches you.</li>
              <li>Reports built from what your tools recorded; an empty report is allowed, an invented one is not.</li>
              <li>
                The operating model and its limits, described in{" "}
                <Link href="/security-governance/" className="font-semibold text-brand underline">
                  Security &amp; Governance
                </Link>
                .
              </li>
            </ul>
          </Card>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted">{COPY.securityDisclaimer}</p>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="FAQ" title="Questions MSP and cyber owners ask first" />
        <div className="max-w-3xl">
          <FAQAccordion items={[...FAQ_ITEMS]} />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">See whether it fits before anyone commits</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              A demonstration is a focused look at your services, current stack and the recurring work you want off
              your plate — with straight answers on scope, control and ownership.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/request-demo/" ctaId="msp-final-demo" kind="primary">
              Request a demonstration
            </CtaLink>
            <CtaLink href="/contact/" ctaId="msp-final-contact" kind="secondary">
              Contact Teamulate
            </CtaLink>
          </div>
        </div>
      </Section>
      <RelatedGuides current={PAGE_PATH} />
    </>
  );
}
