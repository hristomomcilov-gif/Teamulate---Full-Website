import type { Metadata } from "next";
import { PullQuote } from "@/components/blog/PullQuote";
import { CtaLink } from "@/components/CtaLink";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { ORGANIZATION_JSON_LD, SITE, absoluteUrl, marketingShareMetadata } from "@/lib/site";

const PAGE_PATH = "/about-chris/";
const SINGULARITY_DRIVE_URL = "https://www.youtube.com/@SingularityDrive";

export const metadata: Metadata = {
  title: "About Chris Momchilov",
  description:
    "Meet Chris Momchilov — marketing leader behind Teamulate’s multi-agent system, with a track record across SaaS, enterprise tech, fintech, and ecommerce.",
  alternates: { canonical: absoluteUrl(PAGE_PATH) },
  ...marketingShareMetadata,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: absoluteUrl(PAGE_PATH),
  mainEntity: {
    "@type": "Person",
    name: "Chris Momchilov",
    jobTitle: "Founder & Operator",
    worksFor: { "@id": ORGANIZATION_JSON_LD["@id"], name: SITE.name },
    url: absoluteUrl(PAGE_PATH),
    sameAs: [SINGULARITY_DRIVE_URL],
  },
};

const PROOF_STATS = [
  { value: "10+", label: "Years leading marketing across SaaS, enterprise tech, fintech & ecommerce" },
  { value: "11", label: "Specialized AI agents in the Teamulate department he designed and operates" },
  { value: "28×", label: "Organic traffic lift at MioCommerce" },
] as const;

const TRUST_CARDS = [
  {
    icon: "operator",
    title: "Operator, not spectator",
    body: "Designs, configures, and monitors agent workflows with clear human gates for strategy, spend, and brand.",
  },
  {
    icon: "depth",
    title: "Marketing depth first",
    body: "Acquisition, SEO/GEO, content, CRO, paid, analytics — then AI systems that scale the same work.",
  },
  {
    icon: "proof",
    title: "Open proof",
    body: "Teamulate.ca is live. Singularity Drive shows how he thinks out loud.",
  },
] as const;

const TIMELINE: readonly {
  company: string;
  years: string;
  role: string;
  detail: string;
  current?: boolean;
}[] = [
  {
    company: "Teamulate",
    years: "2026–Present",
    role: "Founder & Operator",
    detail: "Multi-agent AI marketing systems",
    current: true,
  },
  {
    company: "VistaVu",
    years: "2025–2026",
    role: "Content & campaign marketing for SAP Cloud ERP",
    detail: "AI-assisted workflows",
  },
  {
    company: "MioCommerce",
    years: "2023–2024",
    role: "Growth marketing for B2B SaaS",
    detail: "28× organic, 2× lower CPA, 3× conversion",
  },
  {
    company: "Cosmetic World",
    years: "2022–2023",
    role: "Full-funnel digital growth",
    detail: "Major YoY organic & revenue lifts",
  },
  {
    company: "Green Leads",
    years: "2020–2022",
    role: "Performance marketing",
    detail: "Fintech, crypto, SaaS clients",
  },
  {
    company: "TeMax",
    years: "2014–2020",
    role: "Senior marketing specialist",
    detail: "Acquisition & retention at scale",
  },
];

const AI_TILES = [
  { icon: "orchestration", title: "Multi-agent orchestration", body: "Eleven specialists, one plan, one dashboard." },
  { icon: "governance", title: "Human-in-the-loop governance", body: "Strategy, spend, and brand stay behind human gates." },
  { icon: "geo", title: "GEO / AI-search visibility work", body: "Content built to be found by people and AI." },
  { icon: "abm", title: "ABM research → personalized outreach ops", body: "Account research turned into tailored outreach." },
] as const;

type IconName = (typeof TRUST_CARDS)[number]["icon"] | (typeof AI_TILES)[number]["icon"] | "play" | "external";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "operator":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
        </svg>
      );
    case "depth":
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M6 16V10M10 16V6M14 16v-4M18 16V8" />
        </svg>
      );
    case "proof":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.6 2.6 3.8 5.4 3.8 8.5s-1.2 5.9-3.8 8.5c-2.6-2.6-3.8-5.4-3.8-8.5s1.2-5.9 3.8-8.5z" />
        </svg>
      );
    case "orchestration":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.2" />
          <circle cx="5" cy="18" r="2.2" />
          <circle cx="12" cy="18" r="2.2" />
          <circle cx="19" cy="18" r="2.2" />
          <path d="M12 7.2V12M12 12l-7 3.8M12 12v3.8M12 12l7 3.8" />
        </svg>
      );
    case "governance":
      return (
        <svg {...common}>
          <path d="M12 3l7 2.8v5.4c0 4.5-3 8.1-7 9.8-4-1.7-7-5.3-7-9.8V5.8L12 3z" />
          <path d="M9 12l2 2 4-4.5" />
        </svg>
      );
    case "geo":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.2-4.2" />
          <path d="M8.5 11h5M11 8.5v5" />
        </svg>
      );
    case "abm":
      return (
        <svg {...common}>
          <circle cx="8" cy="9" r="3" />
          <path d="M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
          <path d="M15 8h6M15 12h6M17 16h4" />
        </svg>
      );
    case "play":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M8 5.5v13l10-6.5-10-6.5z" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M14 4h6v6M20 4l-9 9" />
          <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
      );
  }
}

const EXTERNAL_BUTTON =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200";

/**
 * Interim hero art (gradient + dashboard-still silhouette) until final
 * portrait / hero art is supplied. Not a face photo — no photo is invented.
 */
function HeroPlaceholderArt() {
  const bars = [46, 68, 58, 82, 74, 96];
  return (
    <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="relative aspect-[4/5] overflow-hidden rounded-(--tm-radius-lg) border border-line shadow-card sm:aspect-[5/6] lg:aspect-[4/5]"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 0%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 45%), linear-gradient(160deg, var(--tm-violet-600) 0%, var(--tm-purple-600) 42%, var(--tm-navy-900) 100%)",
        }}
      >
        {/* Founder silhouette */}
        <div className="absolute left-1/2 top-[14%] h-[26%] w-[32%] -translate-x-1/2 rounded-full bg-white/12 ring-1 ring-white/20" />
        <div className="absolute left-1/2 top-[42%] h-[40%] w-[64%] -translate-x-1/2 rounded-t-[45%] bg-white/10 ring-1 ring-white/15" />

        {/* Dashboard still */}
        <div className="absolute inset-x-[10%] bottom-[7%] rounded-(--tm-radius-md) border border-white/25 bg-navy-950/70 p-3 backdrop-blur-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="h-2 w-16 rounded-full bg-white/60" />
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
            </span>
          </div>
          <div className="mb-2 grid grid-cols-3 gap-1.5">
            {["10+", "11", "28×"].map((v) => (
              <span key={v} className="rounded-md bg-white/10 px-2 py-1.5 text-center text-xs font-extrabold tabular-nums text-white">
                {v}
              </span>
            ))}
          </div>
          <div className="flex h-12 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-sm bg-white/70"
                style={{ height: `${h}%`, opacity: 0.45 + i * 0.09 }}
              />
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function AboutChrisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* 1. Hero */}
      <Section muted className="pt-14 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="max-w-2xl">
            <Eyebrow>Founder · Operator · Marketer</Eyebrow>
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">Chris Momchilov</h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ink-muted sm:text-xl">
              10+ years in B2B marketing. Builder of a live multi-agent AI marketing system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <CtaLink href="/request-demo/" ctaId="about-chris-hero-demo" kind="primary" className="px-6 py-3 sm:text-base">
                See the department
              </CtaLink>
              <a
                href={SINGULARITY_DRIVE_URL}
                target="_blank"
                rel="noopener"
                className={`${EXTERNAL_BUTTON} border border-line bg-surface text-ink hover:border-brand hover:text-brand sm:text-base`}
              >
                <Icon name="play" className="h-4 w-4 text-brand" />
                Singularity Drive on YouTube
              </a>
            </div>
          </div>
          <HeroPlaceholderArt />
        </div>
      </Section>

      {/* 2. Proof cards */}
      <Section className="pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {PROOF_STATS.map((stat, i) => (
            <div
              key={stat.value}
              className={`rounded-(--tm-radius-md) px-6 py-6 ${
                i === 0 ? "bg-surface-muted" : i === 1 ? "bg-lavender" : "border border-line bg-surface shadow-card"
              }`}
            >
              <p className="text-4xl font-extrabold tabular-nums tracking-tight text-brand sm:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm leading-snug text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Pullquote */}
      <Section className="pt-0 pb-12 sm:pt-0 sm:pb-16 lg:pt-0 lg:pb-20">
        <div className="mx-auto max-w-3xl">
          <PullQuote label="The thesis">
            <span className="text-lg font-semibold leading-relaxed text-ink sm:text-xl">
              “I don’t just use AI — I built a live multi-agent marketing system and run it with human oversight.”
            </span>
          </PullQuote>
        </div>
      </Section>

      {/* 4. Trust cards */}
      <Section muted>
        <SectionHeading eyebrow="How he works" title="Hands on the system, eyes on the outcome" />
        <div className="grid gap-4 md:grid-cols-3">
          {TRUST_CARDS.map((card) => (
            <Card key={card.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lavender text-brand">
                <Icon name={card.icon} className="h-5.5 w-5.5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5. Timeline */}
      <Section>
        <SectionHeading eyebrow="Track record" title="Roles, newest first" />
        <div className="relative mx-auto max-w-3xl">
          <div aria-hidden className="absolute bottom-6 left-[19px] top-6 border-l-2 border-dashed border-line" />
          <ol className="space-y-3">
            {TIMELINE.map((item) => (
              <li key={item.company} className="flex items-start gap-4">
                <span
                  className={`z-10 mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                    item.current ? "border-brand bg-brand text-white" : "border-line bg-surface text-brand"
                  }`}
                >
                  <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-current" />
                </span>
                <div className="min-w-0 flex-1 rounded-(--tm-radius-lg) border border-line bg-surface p-4 shadow-card sm:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-base font-bold text-ink">{item.company}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{item.years}</p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink">{item.role}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 6. AI systems tiles */}
      <Section muted>
        <SectionHeading
          eyebrow="AI systems"
          title="What he builds and runs"
          lede="Human decisions stay with Chris. Agents draft, research, produce, and check — inside guardrails."
        />

        {/* Chip flow stands in for a diagram until final art is supplied. */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span className="rounded-full bg-brand px-4 py-2 text-white">Chris decides</span>
          <span aria-hidden className="hidden text-ink-muted sm:inline">→</span>
          <span className="rounded-full border border-line bg-surface px-4 py-2 text-ink">Agents draft · research · produce · check</span>
          <span aria-hidden className="hidden text-ink-muted sm:inline">→</span>
          <span className="rounded-full bg-lavender px-4 py-2 text-brand">Guardrails hold</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AI_TILES.map((tile) => (
            <Card key={tile.title} className="p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender text-brand">
                <Icon name={tile.icon} />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug text-ink">{tile.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{tile.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 7. Singularity Drive card */}
      <Section>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-(--tm-radius-lg) border border-line bg-surface shadow-card">
          <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <a
              href={SINGULARITY_DRIVE_URL}
              target="_blank"
              rel="noopener"
              aria-label="Open Singularity Drive on YouTube"
              className="group relative flex min-h-48 items-center justify-center bg-navy-950 md:min-h-full"
              style={{
                background:
                  "linear-gradient(150deg, var(--tm-navy-900) 0%, var(--tm-navy-950) 60%, var(--tm-violet-600) 140%)",
              }}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand shadow-card transition-transform group-hover:scale-105">
                <Icon name="play" className="h-7 w-7" />
              </span>
              <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                YouTube channel
              </span>
            </a>
            <div className="p-6 sm:p-8">
              <Eyebrow>On YouTube</Eyebrow>
              <h2 className="text-2xl font-bold tracking-tight text-ink">Singularity Drive</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                Conversations on AI, autonomy, and where the world is going — from the driver’s seat.
              </p>
              <a
                href={SINGULARITY_DRIVE_URL}
                target="_blank"
                rel="noopener"
                className={`${EXTERNAL_BUTTON} mt-6 bg-brand text-white hover:bg-[#4a38d8]`}
              >
                Watch on YouTube
                <Icon name="external" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Soft CTAs */}
      <Section muted>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">See the department Chris runs</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Meet the eleven agents, watch a goal move through the system, or start a conversation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href="/request-demo/" ctaId="about-chris-final-demo" kind="primary">
              Request a demo
            </CtaLink>
            <CtaLink href="/team/" ctaId="about-chris-final-team" kind="secondary">
              Meet the agents
            </CtaLink>
            <CtaLink href="/contact/" ctaId="about-chris-final-contact" kind="secondary" variant="ghost">
              Contact
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}
