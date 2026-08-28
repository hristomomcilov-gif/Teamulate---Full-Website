import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AGENTS } from "@/content/agents";
import { PLANS, formatCad } from "@/content/plans";
import { absoluteUrl } from "@/lib/site";
import { Container, Section, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { DashboardMockup } from "@/components/home/DashboardMockup";
import { AssetGallery } from "@/components/home/AssetGallery";
import { FounderCard } from "@/components/home/FounderCard";

export const metadata: Metadata = {
  title: "Teamulate | Your AI Marketing Team",
  description:
    "A complete marketing department built around your business, working continuously from one dashboard - with human oversight for the decisions that matter.",
  alternates: { canonical: absoluteUrl("/") },
};

function EyebrowPill({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex justify-center">
      <span className="rounded-full bg-lavender px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand">
        {children}
      </span>
    </p>
  );
}

const LOOP_STEPS = [
  { n: "01", title: "Learn", body: "Business, brand, and constraints first.", color: "bg-brand" },
  { n: "02", title: "Research", body: "The brief behind the next asset.", color: "bg-brand-blue" },
  { n: "03", title: "Plan", body: "Head of Marketing sets the rails.", color: "bg-positive" },
  { n: "04", title: "Build", body: "Specialists draft inside those rails.", color: "bg-attention" },
  { n: "05", title: "Launch", body: "The department publishes, launches, and spends - inside approvals.", color: "bg-brand" },
  { n: "06", title: "Measure", body: "What your tools recorded. Empty is allowed.", color: "bg-brand-blue" },
  { n: "07", title: "Improve", body: "The next pass uses what we can see.", color: "bg-navy-900" },
];

const OPERATING_TRAITS = [
  { title: "Always on", body: "The department keeps moving." },
  { title: "One goal", body: "One strategy. Aligned seats." },
  { title: "Autonomous", body: "Agents run the routine work." },
  { title: "Built to scale", body: "Add capacity as the plan grows." },
];

const GLANCE_STATS = [
  { value: "11", label: "AI specialists" },
  { value: "Always-on", label: "Operations" },
  { value: "60", label: "Eligible library workflows" },
  { value: "231", label: "Marketing functions mapped" },
];

const PLAN_FEATURES: Record<string, string[]> = {
  core: ["1 brand", "4 integrations", "8 workflows", "2 primary channels + email/site"],
  growth: ["1 brand", "8 integrations", "20 workflows", "Up to 4 active channels"],
  scale: ["1-2 business units", "12 integrations", "35 workflows", "Up to 6 active channels"],
};

const FAQ_ITEMS = [
  {
    question: "Do we need to replace our current tools?",
    answer:
      "No. Teamulate is configured around a defined, client-approved stack - your CRM, website, analytics, advertising, email and social tools. Exact integrations and permissions are confirmed during onboarding.",
  },
  {
    question: "Is the system fully autonomous?",
    answer:
      "No, and by design. Routine, reversible work moves automatically inside approved guardrails. Strategy, material spend, sensitive claims and irreversible actions always require a named human decision owner.",
  },
  {
    question: "Does Teamulate guarantee pipeline or revenue?",
    answer:
      "No. Teamulate provides measurable operating capacity and full visibility into the work and its results. Outcomes depend on your market, offer and inputs, and we report them with attribution models and limitations stated.",
  },
  {
    question: "Who owns the accounts, data and assets?",
    answer:
      "You do. Every client deployment is a separate environment: your marketing accounts, your subscriptions, your data and every asset produced stay yours. The GrokBot agent system that runs the department is included in your subscription and operated by Teamulate, with scoped, revocable access to your tools.",
  },
  {
    question: "What happens if we need more than the plan allows?",
    answer:
      "Nothing changes silently. The dashboard shows workflow and integration usage against your plan; when you approach a limit you can reprioritize or request a scope change. There are no surprise overage charges.",
  },
  {
    question: "Can approval rules be customized?",
    answer:
      "Yes. The P0-P4 approval matrix is configured per client: named approvers, budget thresholds, publishing rights, sensitive claim categories and expiring, action-specific approvals.",
  },
  {
    question: "How does onboarding work?",
    answer:
      "A structured nine-stage process: scope and authority, discovery, environment provisioning, integrations, measurement baseline, policy configuration, staging and QA, go-live, and a hypercare period.",
  },
  {
    question: "How do we access the dashboard?",
    answer:
      "Client users are invited after a signed scope, with time-limited invitations, role-based access and MFA for privileged roles. There is no self-service sign-up.",
  },
];

export default function HomePage() {
  const strategos = AGENTS.find((a) => a.slug === "strategos")!;
  const teamAgents = AGENTS.filter((a) => a.slug !== "strategos");

  return (
    <>
      {/* Hero */}
      <Section muted className="pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center lg:max-w-none lg:text-left">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="whitespace-nowrap text-[clamp(1.55rem,6.9vw,3.1rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
                Your AI Marketing Team
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                A complete marketing department built around your business, working continuously from one dashboard.
              </p>
              <ul className="mt-6 flex flex-nowrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
                {["11 Agents", "1 Dashboard", "24/7"].map((label) => (
                  <li key={label} className="flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-ink sm:text-base">
                    <span aria-hidden className="text-sm font-extrabold text-brand">✓</span>
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-nowrap items-center justify-center gap-2 sm:gap-3 lg:justify-start">
                <CtaLink href="/demo/dashboard/" ctaId="hero-primary" kind="primary" className="px-5 py-3 sm:px-7 sm:text-base">
                  See the team in action →
                </CtaLink>
                <CtaLink href="/request-demo/" ctaId="hero-book-demo" kind="secondary" variant="secondary" className="px-5 py-3 sm:px-7 sm:text-base">
                  Book a Demo
                </CtaLink>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                Teamulate is building and marketing Teamulate with the same AI-operated system it offers to clients.
              </p>
            </div>
            <DashboardMockup />
          </div>
        </div>
      </Section>

      {/* The human above the agents */}
      <Section>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
            The human above the agents
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Chris Momchilov runs the department.
          </h2>
        </div>
        <FounderCard />
      </Section>

      {/* How it works: the loop */}
      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>How it works</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Learn through <span className="text-brand">Improve</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Specialized agents run the work. Chris sets the strategy. The department executes.
          </p>
        </div>
        <div className="relative mx-auto mt-10 max-w-2xl">
          <div aria-hidden className="absolute bottom-6 left-[19px] top-6 border-l-2 border-dashed border-line" />
          <ol className="space-y-3">
            {LOOP_STEPS.map((step) => (
              <li key={step.n} className="flex items-center gap-4">
                <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-line bg-surface text-xs font-extrabold text-brand">
                  {step.n}
                </span>
                <Link
                  href="/how-it-works/"
                  className="group flex min-w-0 flex-1 items-center gap-4 rounded-(--tm-radius-lg) border border-line bg-surface p-4 shadow-card transition-colors hover:border-brand"
                >
                  <span aria-hidden className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${step.color} text-lg font-bold text-white`}>
                    {step.title.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-bold text-ink">{step.title}</span>
                    <span className="block text-sm text-ink-muted">{step.body}</span>
                  </span>
                  <span aria-hidden className="ml-auto text-ink-muted transition-transform group-hover:translate-x-0.5">›</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-full bg-lavender py-3 text-center text-sm font-bold text-brand">
            ↻ Improve feeds the next Learn
          </p>
        </div>
      </Section>

      {/* Meet the team */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>+ Meet the team</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Your autonomous marketing department
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Specialized agents working together under one strategy. Always-on. Aligned. Governed.
          </p>
        </div>

        {/* Team lead */}
        <div className="relative mx-auto mt-10 max-w-3xl rounded-(--tm-radius-lg) border-2 border-brand bg-surface p-6 shadow-card sm:p-8">
          <span className="absolute -top-3.5 left-6 rounded-full bg-brand px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Team lead
          </span>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Image
              src={strategos.image}
              alt="Strategos mascot: a white robot with a golden crown, purple cape and scepter"
              width={512}
              height={512}
              priority
              className="h-40 w-40 shrink-0 rounded-(--tm-radius-md) object-cover sm:h-48 sm:w-48"
            />
            <div className="text-center sm:text-left">
              <p className="text-lg font-extrabold text-ink">
                Strategos <span className="text-ink-muted">·</span> <span className="text-brand">{strategos.tag}</span>
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">{strategos.blurb}</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {strategos.skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-lavender px-3 py-1 text-xs font-bold text-brand">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specialists + assurance */}
        <ul className="mx-auto mt-6 grid max-w-5xl gap-5 sm:grid-cols-2">
          {teamAgents.map((agent) => (
            <li key={agent.slug} className="flex items-center gap-5 rounded-(--tm-radius-lg) border border-line bg-surface p-5 shadow-card">
              <Image
                src={agent.image}
                alt={`${agent.name} mascot robot`}
                width={512}
                height={512}
                className="h-28 w-28 shrink-0 rounded-(--tm-radius-md) object-cover"
              />
              <div className="min-w-0">
                <p className="text-base font-extrabold text-ink">
                  {agent.name} <span className="text-ink-muted">·</span>{" "}
                  <span className="text-brand">{agent.tag}</span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{agent.blurb}</p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {agent.skills.map((skill) => (
                    <li key={skill} className="rounded-full bg-lavender px-2.5 py-0.5 text-xs font-bold text-brand">
                      {skill}
                    </li>
                  ))}
                  {agent.type === "assurance" ? (
                    <li className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-bold text-green-700">
                      Independent assurance
                    </li>
                  ) : null}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* Operating traits */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 rounded-(--tm-radius-lg) border border-line bg-surface-muted p-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {OPERATING_TRAITS.map((trait) => (
            <div key={trait.title}>
              <p className="text-sm font-extrabold uppercase tracking-wide text-brand">{trait.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{trait.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <CtaLink href="/team/" ctaId="home-team" kind="secondary" variant="secondary">
            Meet the full team →
          </CtaLink>
        </div>
      </Section>

      {/* The contrast / system at a glance */}
      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>The contrast</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">The system at a glance</h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex items-center justify-between gap-6 rounded-(--tm-radius-lg) bg-lavender p-6 sm:p-8">
            <div>
              <p className="text-3xl font-extrabold text-brand sm:text-4xl">Up to 90%</p>
              <p className="mt-1 text-sm font-bold text-ink">Lower people-cost than building the department</p>
            </div>
            <svg viewBox="0 0 120 60" className="h-14 w-28 shrink-0 sm:h-16 sm:w-32" aria-hidden>
              <path d="M0,55 L30,45 L60,32 L90,18 L115,6" fill="none" stroke="var(--tm-violet-600)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="115" cy="6" r="4" fill="var(--tm-violet-600)" />
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {GLANCE_STATS.map((stat) => (
              <div key={stat.label} className="rounded-(--tm-radius-lg) border border-line bg-surface p-5 shadow-card">
                <p className="text-2xl font-extrabold tabular-nums text-ink sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-(--tm-radius-lg) border border-line bg-surface p-5 shadow-card">
            <p className="text-2xl font-extrabold text-ink sm:text-3xl">12+ years</p>
            <p className="mt-1 text-sm text-ink-muted">Marketing experience behind the system</p>
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

      {/* What your team creates */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>What your team creates</EyebrowPill>
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
            <CtaLink href="/request-demo/" ctaId="home-assets-cta" kind="primary" className="w-full py-3 text-base sm:w-auto sm:px-8">
              See the team in action →
            </CtaLink>
          </div>
        </div>
      </Section>

      {/* Pricing */}
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
                    <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand text-xs">
                      {plan.name.charAt(0)}
                    </span>
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
                      {plan.monthlyPrefix ? <span className="text-sm font-bold text-ink-muted">from </span> : null}
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
            <CtaLink href="/pricing/" ctaId="home-pricing" kind="secondary" variant="primary" className="px-8 py-3 text-base">
              Compare plans and scope →
            </CtaLink>
          </div>
        </Container>
      </section>

      {/* Resources: what we can actually show */}
      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>Resources</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">What we can actually show</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            No invented articles. Three honest doors - not a magazine of fake proof.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3">
          <div className="rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card">
            <p className="inline-block rounded-full bg-lavender px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink">
              Guides
            </p>
            <h3 className="mt-3 text-lg font-extrabold text-ink">Product, pillars, research hubs</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              One URL per intent. No daily blog slop. No invented proof.
            </p>
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
          <div className="rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card">
            <p className="inline-block rounded-full bg-lavender px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink">
              About
            </p>
            <h3 className="mt-3 text-lg font-extrabold text-ink">Founder-led. Human-accountable.</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              AI-operated seats. You stay on the gates. Chris Momchilov, Barrie.
            </p>
            <p className="mt-4"><StatusChip tone="neutral" label="Publishing soon" /></p>
            <div aria-hidden className="relative mt-5 h-28 overflow-hidden rounded-(--tm-radius-md) bg-[#0a0a0f]">
              <div className="absolute -right-10 top-2 h-40 w-40 rounded-full bg-brand-blue" />
            </div>
          </div>
          <Link
            href="/demo/dashboard/"
            className="group rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card transition-colors hover:border-brand"
          >
            <p className="inline-block rounded-full bg-lavender px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink">
              Demo
            </p>
            <h3 className="mt-3 text-lg font-extrabold text-ink">One sample workflow</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Follow a demo workflow from research through measurement, labeled Demo data. No invented lift.
            </p>
            <p className="mt-4 text-sm font-bold text-brand group-hover:underline">Open the demo →</p>
            <div aria-hidden className="relative mt-5 h-28 overflow-hidden rounded-(--tm-radius-md) bg-[#0a0a0f]">
              <div className="absolute left-1/2 top-3 h-44 w-44 -translate-x-1/2 rounded-full bg-positive" />
            </div>
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <EyebrowPill>FAQ</EyebrowPill>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Frequently asked questions</h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-brand py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            A full marketing department. Without building one.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            The next step is a focused review of your goals, current stack and the recurring work you want to move
            forward.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink
              href="/request-demo/"
              ctaId="home-final-primary"
              kind="primary"
              className="bg-white px-8 py-3 text-base !text-brand hover:!bg-white/90"
            >
              See the team in action →
            </CtaLink>
            <Link
              href="/demo/dashboard/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Try the demo dashboard
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
