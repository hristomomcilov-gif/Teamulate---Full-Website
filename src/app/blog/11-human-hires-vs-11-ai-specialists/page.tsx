import type { Metadata } from "next";
import Link from "next/link";
import { AGENTS } from "@/content/agents";
import {
  ELEVEN_ROLE_SALARIES,
  ELEVEN_VS_ELEVEN_FIGURES as F,
  FEATURED_BLOG_POST,
} from "@/content/blog";
import { PdfDownloadLink } from "@/components/blog/PdfDownloadLink";
import { PullQuote } from "@/components/blog/PullQuote";
import { ScrollTable } from "@/components/blog/ScrollTable";
import { YouTubeEmbed } from "@/components/blog/YouTubeEmbed";
import { CtaLink } from "@/components/CtaLink";
import { SiteImage } from "@/components/SiteImage";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { ENTITY_LINE, SITE, absoluteUrl } from "@/lib/site";

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
  author: {
    "@type": "Person",
    name: post.author,
    address: { "@type": "PostalAddress", addressLocality: post.authorLocality, addressCountry: "CA" },
  },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.domain },
  datePublished: post.datePublished,
  dateModified: post.datePublished,
  image: shareImage.url,
  mainEntityOfPage: absoluteUrl(post.href),
};

const SHORT_COMPARISON = [
  [
    "Fixed cost",
    "High. Eleven full-time salaries plus employer costs.",
    "Subscription-based and materially lower than full headcount.",
  ],
  [
    "Availability",
    "Primarily business hours; true 24/7 coverage requires shifts or more people.",
    "Agents can run scheduled and approved workflows around the clock.",
  ],
  [
    "Alignment",
    "Requires meetings, briefs, handoffs and repeated re-synchronization.",
    "Shared objectives and operating context can update multiple agents together.",
  ],
  [
    "Scale",
    "Usually requires hiring, onboarding and management capacity.",
    "Parallel workloads can expand faster, subject to tool, model and platform limits.",
  ],
  [
    "Consistency",
    "Depends on each person, manager, process and handoff quality.",
    "Style guides, checklists and shared rules can be applied repeatedly.",
  ],
  [
    "Human judgment",
    "Excellent for nuance, taste, relationships and ambiguous decisions.",
    "Useful for analysis and execution, but needs human ownership for high-stakes judgment.",
  ],
  [
    "Failure mode",
    "Absence, turnover, silos, miscommunication, uneven process.",
    "Hallucination, stale context, bad instructions, tool failure or over-automation.",
  ],
] as const;

const LATER_COMPARISON = [
  [
    "Creative diversity",
    "Different people bring different taste, dissent and unexpected angles.",
    "Shared models and briefs can converge. Diversity has to be asked for — alternative directions, not one default draft.",
  ],
  [
    "Brand consistency",
    "Varies by person, manager, and how tightly the brand system is enforced.",
    "A style guide and shared rules can be applied on every pass. Consistency is a strength only when the guide is good.",
  ],
  [
    "Institutional memory",
    "Lives in people. It walks out with turnover, vacation and undocumented decisions.",
    "Shared operating context can persist. It still goes stale if nobody updates the knowledge the agents work from.",
  ],
  [
    "Scaling volume",
    "Usually means hiring, onboarding and another management load.",
    "Parallel workloads can expand faster, inside tool, model and platform limits — not an unlimited factory.",
  ],
  [
    "Absence risk",
    "Vacation, sick leave, parental leave and resignations open holes in coverage.",
    "Agents do not take PTO. The humans who approve strategy, spend and sensitive work still do.",
  ],
  [
    "Quality control",
    "Depends on managers, process and whether anyone had time to review.",
    "Independent QA can run on every draft. High-stakes work still needs a human owner.",
  ],
  [
    "Accountability",
    "Named employees, managers and employment law.",
    "Humans remain accountable. Agents are operating resources, not employees.",
  ],
  [
    "Customer relationships",
    "Strong for nuance, trust and conversations that are not a script.",
    "Useful for preparation and follow-up drafts. Humans stay closest to the relationship.",
  ],
  [
    "Optimization speed",
    "Limited by meeting cadence, handoffs and whoever is in the office.",
    "Monitoring and iteration can run continuously inside approved limits.",
  ],
] as const;

const CAMPAIGN_STAGES = [
  [
    "1. Brief and priorities",
    "Director and strategist write the brief, then re-explain it in standups as the week moves.",
    "Strategos drafts the brief from the same priorities the rest of the department will use. A human approves the direction before work fans out.",
  ],
  [
    "2. Research",
    "A research analyst gathers competitors, audience notes and proof — then emails a deck that may already be out of date.",
    "Scout prepares the research pack from the approved scope. Humans still decide which claims are safe to use.",
  ],
  [
    "3. Messaging and content",
    "Writer, social specialist and lifecycle specialist each interpret the brief. Tone drifts unless someone re-syncs them.",
    "Wordsmith and Socialite work from the same message map. Guardian checks claims before anything is offered for publish.",
  ],
  [
    "4. Creative production",
    "Designer and editor wait on copy, then wait on feedback. One absence slips the whole sequence.",
    "Pixel produces the design and motion variants from the approved brief. Brand-system changes still wait for a human.",
  ],
  [
    "5. Search, site and demand setup",
    "SEO, web and paid specialists configure in parallel and often discover the landing page does not match the ad.",
    "Seeker, Flow and GrowthTrack can prepare the search, page and demand work against the same brief. Launches and budget changes stay on an approval gate.",
  ],
  [
    "6. Operations, tracking and QA",
    "Ops wires the forms. Someone else notices the UTM is wrong after the first send.",
    "Nexus prepares routing and tracking. Guardian and Metric check readiness and measurement before the work is treated as live.",
  ],
  [
    "7. Readout and next decision",
    "A manager pulls numbers from three tools, writes a recap, and books another meeting to decide what to do next.",
    "Metric prepares the readout with limitations stated. A human decides whether to scale, hold or stop.",
  ],
] as const;

const BUYER_QUESTIONS = [
  {
    question: "Is this a claim that one AI agent equals one employee?",
    answer:
      "No. This is a comparison of functional coverage, not employee-equivalence. Humans and AI are different operating resources. Teamulate is intended to cover specialized marketing functions with coordinated agents. Human leadership remains essential for business judgment, brand taste, sensitive approvals and accountability.",
  },
  {
    question: "What do the salary and loaded-cost figures actually describe?",
    answer:
      `They describe an illustrative eleven-role in-house department using U.S. BLS median annual wages and Canada Job Bank wages annualized at 2,080 hours (August 2026). Salary-only totals about ${F.salaryUsRound} (US $${F.salaryUsExact.toLocaleString("en-US")}) and ${F.salaryCaRound} (C$${F.salaryCaExact.toLocaleString("en-CA")}). Modeled employer compensation is about ${F.loadedUsRound} and ${F.loadedCaRound} before recruiting, equipment, software, office costs, provincial payroll taxes, workers compensation, severance or turnover. They are research benchmarks, not a quote for your market.`,
  },
  {
    question: "What does “up to 90% lower” mean?",
    answer:
      "It is the live public people-cost positioning against building the equivalent department — modeled, not a guarantee. Software and advertising spend sit outside the percentage on both sides. The right baseline for you may be eleven roles, a leaner team, or an agency mix; the percentage moves with that baseline and with the Teamulate plan you actually buy (Core C$7,500 setup + C$5,000/mo; Growth C$12,500 + C$7,500/mo; Scale C$20,000 + C$12,000/mo).",
  },
  {
    question: "Do I still need a human marketing lead?",
    answer:
      "You still need humans closest to strategy, taste, relationships, risk and accountability. Strategos prepares the plan; a human approves it. The practical difference is not “AI works while humans do nothing.” Humans spend less time moving information between specialists and more time deciding what to do next.",
  },
  {
    question: "Which plan is this article selling?",
    answer:
      "None of them, specifically. The article is a coverage and cost comparison. If you want plan scope, see Pricing. Core, Growth and Scale differ in capacity — not in a promise that output will match eleven specialists hour for hour.",
  },
];

export default function ElevenVsElevenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Section className="pt-16 pb-10">
        <div className="mx-auto max-w-[820px]">
          <p className="text-sm text-ink-muted">
            <Link href="/blog/" className="font-semibold text-brand hover:underline">
              Blog
            </Link>
            <span aria-hidden> / </span>
            <span>11 vs. 11</span>
          </p>
          <Eyebrow>Public-facing comparison</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg font-medium leading-relaxed text-ink-muted">{post.subtitle}</p>
          <p className="mt-4 text-sm text-ink-muted">
            By <strong className="text-ink">{post.author}</strong>, {post.authorLocality} · {post.dateLabel} · United
            States + Canada national benchmarks
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-[820px] space-y-8">
          <SiteImage
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            width={1200}
            height={630}
            className="h-auto w-full rounded-(--tm-radius-md) border border-line"
            priority
          />

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

          <p className="text-base leading-relaxed text-ink">
            A practical buyer guide for founders and lean teams deciding whether to build a traditional department,
            deploy an AI department, or combine both.
          </p>

          <PullQuote label="The thesis">
            Most businesses do not actually need eleven additional payrolls. They need the coordinated capabilities
            those eleven specialists provide. Teamulate is designed to deliver broad marketing coverage through a
            coordinated AI agent team that can work from the same priorities, plans and operating context — while
            keeping humans in control of the decisions that genuinely require human judgment.
          </PullQuote>

          <YouTubeEmbed videoId={post.youtubeId} title={post.youtubeTitle} />
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="01 · Executive summary"
            title="What the fully staffed department actually costs"
            lede="A fully staffed marketing department is powerful. It is also expensive in ways that salary lines only partly show."
          />
          <p className="text-base leading-relaxed text-ink">
            Salary is the visible cost. The less visible cost includes employer payroll contributions, benefits,
            recruiting, onboarding, tools, management time, knowledge transfer, coordination, vacation coverage, sick
            leave, turnover, and the need to keep eleven people synchronized.
          </p>
          <p className="text-base leading-relaxed text-ink">
            National wage benchmarks from August 2026 put an eleven-role structure at approximately{" "}
            <strong className="tabular-nums text-ink">
              {F.salaryUsRound} (US ${F.salaryUsExact.toLocaleString("en-US")})
            </strong>{" "}
            in U.S. base annual wages and{" "}
            <strong className="tabular-nums text-ink">
              {F.salaryCaRound} (C${F.salaryCaExact.toLocaleString("en-CA")})
            </strong>{" "}
            in annualized Canadian base wages. After employer-cost relationships — BLS March 2026 ECEC for
            management and professional private-industry workers, and Canadian employer CPP/EI plus an illustrative
            15% benefits-plan premium — the modeled total employer compensation level is about{" "}
            <strong className="tabular-nums text-ink">
              {F.loadedUsRound} (US ${F.loadedUsExact.toLocaleString("en-US")}, ~${F.loadedUsMonthly.toLocaleString("en-US")}/month)
            </strong>{" "}
            and{" "}
            <strong className="tabular-nums text-ink">
              {F.loadedCaRound} (C${F.loadedCaExact.toLocaleString("en-CA")}, ~C${F.loadedCaMonthly.toLocaleString("en-CA")}/month)
            </strong>
            . That is before recruiting, equipment, software, office costs, provincial payroll taxes, workers
            compensation, severance or turnover.
          </p>
          <PullQuote label="Important comparison rule">
            This is a comparison of functional coverage, not a claim that one AI agent is a human employee equivalent.
            Humans and AI are different operating resources. Teamulate is intended to cover specialized marketing
            functions with coordinated agents, while human leadership remains essential for business judgment, brand
            taste, sensitive approvals and accountability.
          </PullQuote>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="02 · Economics"
            title="What an 11-person marketing department actually costs"
            lede="The “eleven-person” figure is a set of essential functions — strategy, research, content, search, social, lifecycle, demand, design, video and operations — not a claim that every company staffs them as eleven separate hires."
          />
          <p className="text-sm leading-relaxed text-ink-muted">
            United States figures are BLS median annual wages. Canada figures are Government of Canada Job Bank wages
            annualized at 2,080 hours.
          </p>
          <ScrollTable
            caption="Illustrative eleven-role salary benchmarks, United States and Canada"
            headers={["Illustrative role", "United States / median annual (USD)", "Canada / annualized median (CAD)"]}
            rows={ELEVEN_ROLE_SALARIES.map((row) => [row.role, row.us, row.ca])}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Salary-only</p>
              <p className="mt-2 text-xl font-extrabold tabular-nums text-ink">{F.salaryUsRound}</p>
              <p className="text-sm tabular-nums text-ink-muted">US ${F.salaryUsExact.toLocaleString("en-US")}</p>
              <p className="mt-3 text-xl font-extrabold tabular-nums text-ink">{F.salaryCaRound}</p>
              <p className="text-sm tabular-nums text-ink-muted">C${F.salaryCaExact.toLocaleString("en-CA")}</p>
            </Card>
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
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">
            U.S. load uses BLS ECEC March 2026 for management and professional private-industry workers: wages
            $53.50/hour plus $24.59/hour in benefits — about 46% above wages. Canada adds 2026 employer CPP/EI
            outside Quebec (about C$63,700 on this wage base) plus an illustrative 15% benefits-plan premium (about
            C$130,000), or roughly 22% above Canadian wages. Job Bank reports that 95.5% of marketing managers receive
            at least one non-wage benefit. Those are research facts, not a savings headline.
          </p>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="03 · Hidden operating cost"
            title="The cost that never appears on a salary line"
            lede="Payroll is the invoice you can see. Coordination is the invoice you feel."
          />
          <ul className="space-y-3 text-base leading-relaxed text-ink">
            <li>
              <strong className="text-ink">Time off is coverage you still pay for.</strong> Vacation, sick leave and
              parental leave do not pause the calendar. Someone else absorbs the work, or the work waits.
            </li>
            <li>
              <strong className="text-ink">Knowledge lives in people.</strong> When a specialist leaves, the brief,
              the brand instincts and the “we already tried that” history often leave with them.
            </li>
            <li>
              <strong className="text-ink">Recruiting is a bottleneck, not a weekend task.</strong> Replacing one of
              eleven roles is a search, an onboarding quarter and a management load before the seat is productive
              again.
            </li>
            <li>
              <strong className="text-ink">Coordination is a hidden headcount.</strong> Meetings, briefs, handoffs and
              re-syncs are how eleven specialists stay pointed at the same priority — and they consume the week.
            </li>
          </ul>
          <PullQuote label="The alignment paradox">
            Disagreement can surface better ideas. A human team that argues in good faith sometimes finds the sharper
            angle. AI alignment — every seat working from the same brief — is an advantage only when the direction is
            good. If the brief is wrong, aligned agents will be wrong together.
          </PullQuote>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="04 · Capabilities, not seats"
            title="What changes with an AI marketing department"
            lede="Teamulate is eleven named seats under one operating context — not eleven chatbots and not a claim that each seat is a person."
          />
          <p className="text-base leading-relaxed text-ink">
            The useful question is not “which employee does this replace?” It is “which capability do we need, and
            who owns the judgment on top of it?” The live roster is{" "}
            {AGENTS.map((agent) => agent.name).join(", ")}.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {AGENTS.map((agent) => (
              <li
                key={agent.slug}
                className="rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3"
              >
                <p className="text-sm font-bold text-ink">{agent.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">{agent.tag}</p>
                <p className="mt-1 text-sm text-ink-muted">{agent.role}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-ink-muted">
            The mapping to the eleven human functions is coverage, not a one-to-one swap. Wordsmith covers content and
            a large share of social; Pixel covers design and motion; Flow has no separate salary line in the
            eleven-role table; Guardian and Metric are assurance seats a typical org chart often buries inside a
            manager. That is why this article refuses the “eleven chatbots = eleven employees” framing.
          </p>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-8">
          <SectionHeading
            eyebrow="05 · Operating comparison"
            title="Human team vs. Teamulate"
            lede="The short version first, then the dimensions that show up after you have lived with either model."
          />
          <ScrollTable
            caption="Short operating comparison of an 11-person human department and Teamulate"
            headers={["Dimension", "11-person human department", "Teamulate AI department"]}
            rows={SHORT_COMPARISON.map((row) => [...row])}
          />
          <ScrollTable
            caption="Further operating dimensions for a human department versus Teamulate"
            headers={["Dimension", "11-person human department", "Teamulate AI department"]}
            rows={LATER_COMPARISON.map((row) => [...row])}
          />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="06 · Judgment"
            title="Where humans are still better — and where AI is stronger"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Humans still better</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
                <li>Strategy that depends on taste, politics or an incomplete brief</li>
                <li>Brand judgment when the “right” answer is not in the guide</li>
                <li>Relationships — customers, partners, the room you cannot script</li>
                <li>Risk calls and anything you would not want to explain as “the model said so”</li>
                <li>Accountability: a name that can stand behind the work</li>
              </ul>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">AI is stronger</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
                <li>Research assembly and first-pass analysis</li>
                <li>Preparation: briefs, variants, checklists, documentation</li>
                <li>Production and repetition at a volume a lean team cannot staff</li>
                <li>Monitoring, reporting and cross-channel execution from one context</li>
                <li>Keeping the same rules in force at 11 p.m. and on a long weekend</li>
              </ul>
            </Card>
          </div>
          <PullQuote label="The hybrid principle">
            Keep humans closest to strategy, taste, relationships, risk and accountability. Keep AI closest to
            research, preparation, production, repetition, monitoring, reporting, documentation and cross-channel
            execution.
          </PullQuote>
          <p className="text-base leading-relaxed text-ink">
            The practical difference is not “AI works while humans do nothing.” Humans spend less time moving
            information between specialists and more time deciding what to do next.
          </p>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="07 · The alignment risk"
            title="When consistency becomes a weakness"
            lede="Perfect alignment is a feature of a coordinated department. It is also a way to scale a bad assumption."
          />
          <p className="text-base leading-relaxed text-ink">
            A human team leaks. People disagree, forget, or quietly ignore a brief they do not believe. That waste is
            real — and so is the accident that a dissent surfaces the better idea. An AI department will not give you
            that accident for free.
          </p>
          <p className="text-base leading-relaxed text-ink">
            Compensation has to be designed in: a human who can reject the strategy; an explicit request for
            alternative creative directions; Guardian on claims and release readiness; Metric measuring independently
            of the specialist who produced the work; and a rule that stale context is a stop, not a push-through.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="08 · A realistic campaign"
            title="Seven stages, same campaign"
            lede="A product launch or demand program does not change its stages. Who carries each stage does."
          />
          <ScrollTable
            caption="Seven-stage campaign scenario comparing a human department and Teamulate"
            headers={["Stage", "11-person human department", "Teamulate AI department"]}
            rows={CAMPAIGN_STAGES.map((row) => [...row])}
          />
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading
            eyebrow="09 · The public claim"
            title={'What “up to 90% lower” means'}
            lede="The live public people-cost claim is up to 90% lower — modeled, not a guarantee. Software and ads are excluded from people-cost percentages on both sides."
          />
          <p className="text-base leading-relaxed text-ink">
            The baseline in this article is the eleven-role national wage set above, then the modeled employer load.
            Your baseline may be smaller (a founder plus two generalists), larger (agency retainers stacked on
            payroll), or different by city. The percentage moves with that baseline and with the Teamulate plan in
            front of you.
          </p>
          <p className="text-base leading-relaxed text-ink">
            Public prices, in CAD: Core C$7,500 setup + C$5,000/mo; Growth C$12,500 + C$7,500/mo; Scale C$20,000 +
            C$12,000/mo. Those are retainers for a coordinated department, not a promise that output will match eleven
            specialists hour for hour, and not a USD sticker.
          </p>
          <PullQuote label="Credible positioning">
            The honest claim is not “AI equals eleven employees.” It is coordinated access to eleven specialties
            without an eleven-person payroll.
          </PullQuote>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading eyebrow="10 · Fit" title="Who should choose which model" />
          <div className="grid gap-4">
            <Card>
              <p className="text-sm font-bold text-ink">Choose Teamulate when</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                You need broad marketing coverage and you will stay in the loop on judgment, but you do not want
                eleven additional payrolls. Founders and lean teams who will approve strategy, spend and sensitive
                work are the intended buyer.
              </p>
            </Card>
            <Card>
              <p className="text-sm font-bold text-ink">Choose a hybrid when</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                You already have — or will keep — a human closest to strategy, taste and customer relationships, and
                you want research, production, repetition and monitoring carried by the department. Hybrid is the
                default honest shape, not a consolation prize.
              </p>
            </Card>
            <Card>
              <p className="text-sm font-bold text-ink">Stay human-team-first when</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                The work is the relationship (on-the-ground sales-assisted marketing), the product is highly original
                creative direction, or the risk profile requires every material decision to stay inside a fully human
                chain of employment. An AI department does not remove that need.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading eyebrow="11 · Buyer questions" title="Ask these before you pick a model" />
          <FAQAccordion items={BUYER_QUESTIONS} />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px] space-y-6">
          <SectionHeading eyebrow="12 · Decision" title="Build the capability before you build the payroll" />
          <p className="text-lg leading-relaxed text-ink">
            If the capability is what you need — research, content, search, demand, creative, lifecycle, ops,
            measurement, QA — build that capability first. Hire the payroll when the work has proven it needs a named
            human in the seat.
          </p>
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
          <p className="text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px] space-y-4">
          <SectionHeading eyebrow="13 · Sources" title="Sources and methodology" />
          <Card>
            <ul className="space-y-2.5 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="text-ink">U.S. Bureau of Labor Statistics</strong> — Occupational Employment and
                Wage Statistics, national median annual wages for the illustrative roles (August 2026 pull).
              </li>
              <li>
                <strong className="text-ink">BLS Employer Costs for Employee Compensation</strong> — March 2026,
                management and professional workers in private industry: $53.50/hour wages + $24.59/hour benefits
                (~46% above wages).
              </li>
              <li>
                <strong className="text-ink">Government of Canada Job Bank</strong> — median wages annualized at 2,080
                hours; 95.5% of marketing managers reported to receive at least one non-wage benefit.
              </li>
              <li>
                <strong className="text-ink">Canada Revenue Agency</strong> — 2026 employer CPP and EI contributions
                outside Quebec, applied as about C$63,700 on this wage base.
              </li>
              <li>
                <strong className="text-ink">Canada Life / typical benefits-plan context</strong> — an illustrative 15%
                benefits-plan premium (~C$130,000 on this wage base), used to model employer load rather than to quote
                a specific carrier plan.
              </li>
              <li>
                <strong className="text-ink">What this is not:</strong> a quote for your city, a guarantee of savings,
                or a claim of one-to-one output. Software and advertising spend are excluded from people-cost
                percentages. Related research on a 10-role Robert Half model lives on{" "}
                <Link href="/research/marketing-team-cost-2026/" className="font-semibold text-brand underline">
                  Marketing team cost 2026
                </Link>
                . That page uses a different source set and role count; do not mix the totals.
              </li>
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
