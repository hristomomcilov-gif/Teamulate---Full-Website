import Link from "next/link";
import { AGENTS, TEAM_STRUCTURE_SENTENCE } from "@/content/agents";
import {
  SMV1_ASSETS,
  SMV1_ASSURANCE_CHECKS,
  SMV1_BUILD_LOG,
  SMV1_BUILD_LOG_ENTRIES,
  SMV1_CHOOSER,
  SMV1_CONTROL,
  SMV1_HUMAN_GATES,
  SMV1_OUTCOMES,
  SMV1_PROBLEMS,
  SMV1_SYSTEMS,
  SMV1_WORKFLOW,
  seatsFor,
} from "@/content/site-message-v1";
import { FounderCard } from "@/components/home/FounderCard";
import { SiteImage } from "@/components/SiteImage";
import { Section, StatusChip } from "@/components/ui";

/**
 * The four new sections of the /preview/site-message-v1/ draft (audit deltas
 * 2, 3, 4 and 5). Everything else on that page is the shipped homepage markup.
 * Copy lives in src/content/site-message-v1.ts; the roster comes from AGENTS.
 */

export function EyebrowPill({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex justify-center">
      <span className="rounded-full bg-lavender px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand">
        {children}
      </span>
    </p>
  );
}

function SectionIntro({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <EyebrowPill>{eyebrow}</EyebrowPill>
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {lede ? <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{lede}</p> : null}
    </div>
  );
}

/* 2. Buyer-problem chooser -------------------------------------------------- */

export function BuyerProblemChooser() {
  return (
    <Section id="problems">
      <SectionIntro eyebrow={SMV1_CHOOSER.eyebrow} title={SMV1_CHOOSER.title} lede={SMV1_CHOOSER.lede} />
      <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
        {SMV1_PROBLEMS.map((problem, i) => (
          <li
            key={problem.id}
            className="flex flex-col rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card transition-colors hover:border-brand sm:p-7"
          >
            <p className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lavender text-xs font-extrabold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">Sounds like you?</span>
            </p>
            <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-ink">
              &ldquo;{problem.pain}&rdquo;
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{problem.answer}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold">
              <a href={problem.anchor} className="text-brand hover:underline">
                See how the department takes it on ↓
              </a>
              <Link href={problem.link.href} className="text-ink-muted hover:text-brand hover:underline">
                {problem.link.label} →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* 3. Human control, two layers --------------------------------------------- */

/** Pixel's signature-workflow diagram; wide, so it scrolls sideways on phones instead of shrinking. */
function SignatureWorkflowFigure() {
  const asset = SMV1_ASSETS.signatureWorkflow;
  return (
    <figure className="mx-auto mt-10 max-w-5xl">
      <div className="overflow-x-auto rounded-(--tm-radius-lg) shadow-card">
        <SiteImage
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          unoptimized
          className="h-auto w-full min-w-[840px]"
        />
      </div>
      <figcaption className="mx-auto mt-3 max-w-3xl text-center text-xs leading-relaxed text-ink-muted">
        {SMV1_WORKFLOW.caption}
      </figcaption>
    </figure>
  );
}

const LAYER_LISTS: readonly (readonly string[])[] = [SMV1_HUMAN_GATES, SMV1_ASSURANCE_CHECKS];

export function HumanControlLayers() {
  return (
    <Section id="control" muted>
      <SectionIntro eyebrow={SMV1_CONTROL.eyebrow} title={SMV1_CONTROL.title} lede={SMV1_CONTROL.lede} />
      <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
        {SMV1_CONTROL.layers.map((layer, i) => (
          <div
            key={layer.n}
            className={`rounded-(--tm-radius-lg) border bg-surface p-6 shadow-card sm:p-8 ${
              i === 0 ? "border-2 border-brand" : "border-line"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{layer.n}</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">{layer.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{layer.body}</p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">{layer.listTitle}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {LAYER_LISTS[i].map((item) => (
                <li
                  key={item}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    i === 0 ? "bg-lavender text-brand" : "bg-green-50 text-green-700"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm font-bold">
        <Link href={SMV1_CONTROL.link.href} className="text-brand hover:underline">
          {SMV1_CONTROL.link.label} →
        </Link>
      </p>

      <SignatureWorkflowFigure />

      <div className="mx-auto mt-14 mb-8 max-w-2xl text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">{SMV1_CONTROL.founderEyebrow}</p>
        <h3 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Chris Momchilov runs the department.</h3>
      </div>
      <FounderCard />
    </Section>
  );
}

/* 4. Three outcome systems -------------------------------------------------- */

export function OutcomeSystems() {
  return (
    <Section id="outcomes">
      <SectionIntro eyebrow={SMV1_OUTCOMES.eyebrow} title={SMV1_OUTCOMES.title} lede={SMV1_OUTCOMES.lede} />
      <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-3">
        {SMV1_SYSTEMS.map((system) => {
          const seats = seatsFor(system);
          return (
            <article
              key={system.id}
              id={`outcome-${system.id}`}
              className="flex flex-col rounded-(--tm-radius-lg) border border-line bg-surface p-6 shadow-card sm:p-7"
            >
              <span aria-hidden className={`h-1.5 w-12 rounded-full ${system.accent}`} />
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{system.name}</h3>
              <p className="mt-2 text-sm font-semibold text-ink-muted">
                <span className="text-ink">The problem:</span> {system.problem}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {seats.map((agent) => (
                  <li
                    key={agent.slug}
                    className="flex items-center gap-2 rounded-full border border-line bg-surface-muted py-1 pl-1 pr-3 text-xs font-bold text-ink"
                  >
                    <SiteImage
                      src={agent.image}
                      alt=""
                      width={512}
                      height={512}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    {agent.name}
                    {agent.type === "assurance" ? (
                      <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                        assurance
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">Produces</p>
              <ul className="mt-2 space-y-1.5">
                {system.produces.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink">
                    <span aria-hidden className="mt-0.5 text-sm font-extrabold text-brand">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-(--tm-radius-md) bg-lavender/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">What you see</p>
                <p className="mt-1 text-sm leading-relaxed text-ink">{system.youSee}</p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-muted">
        {SMV1_OUTCOMES.rosterLead} {TEAM_STRUCTURE_SENTENCE} - {AGENTS.length} agents in total.{" "}
        <Link href={SMV1_OUTCOMES.rosterLink.href} className="font-bold text-brand hover:underline">
          {SMV1_OUTCOMES.rosterLink.label} →
        </Link>
      </p>
    </Section>
  );
}

/* 5. Build Log --------------------------------------------------------------- */

const DATE_FORMAT = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export function BuildLogPanel() {
  const live = SMV1_BUILD_LOG_ENTRIES.filter((entry) => entry.status === "live");
  const review = SMV1_BUILD_LOG_ENTRIES.filter((entry) => entry.status === "in review");

  return (
    <Section id="build-log" muted>
      <SectionIntro eyebrow={SMV1_BUILD_LOG.eyebrow} title={SMV1_BUILD_LOG.title} lede={SMV1_BUILD_LOG.lede} />
      <div className="mx-auto mt-10 max-w-3xl rounded-(--tm-radius-lg) border border-line bg-surface shadow-card">
        <ol className="divide-y divide-line">
          {live.map((entry) => (
            <li key={`${entry.date}-${entry.title}`} className="grid gap-2 px-5 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-5 sm:px-6">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                <time dateTime={entry.date}>{DATE_FORMAT.format(new Date(`${entry.date}T00:00:00Z`))}</time>
              </p>
              <div>
                <p className="flex flex-wrap items-center gap-2 text-base font-extrabold text-ink">
                  {entry.href ? (
                    <Link href={entry.href} className="hover:text-brand hover:underline">
                      {entry.title}
                    </Link>
                  ) : (
                    entry.title
                  )}
                  <StatusChip tone="positive" label="Live" />
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{entry.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        {review.length ? (
          <div className="border-t border-line bg-surface-muted px-5 py-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">In review - not live</p>
            <ul className="mt-2 space-y-1.5">
              {review.map((entry) => (
                <li key={entry.title} className="flex flex-wrap items-center gap-2 text-sm text-ink">
                  <StatusChip tone="attention" label="In review" />
                  <span className="font-semibold">{entry.title}</span>
                  <span className="text-ink-muted">- {entry.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-ink-muted">{SMV1_BUILD_LOG.footnote}</p>
    </Section>
  );
}
