import { Caveat } from "next/font/google";
import type { ReactNode } from "react";
import { AGENTS, type AgentProfile } from "@/content/agents";
import {
  ASSURANCE_NOTE,
  CALLOUTS,
  DEPARTMENT_EYEBROW,
  DEPARTMENT_FOOTER_LINE,
  DEPARTMENT_FOOTER_TITLE,
  DEPARTMENT_HEADLINE_LINE_1,
  DEPARTMENT_HEADLINE_LINE_2,
  DEPARTMENT_SUBHEAD,
  SEAT_STYLES,
  STRATEGOS_CHART_BADGE,
  STRATEGOS_CHART_LINE,
} from "@/content/team-chart";

/**
 * Glassmorphism "department organization" section (preview redesign, 8 Sep 2026).
 *
 * Hierarchy mirrors the live /team/ structure diagram: Strategos on top, the
 * eight execution specialists below, Metric + Guardian as the independent
 * assurance layer at the bottom. Names and role lines come from the AGENTS
 * roster so the seats can never drift from the rest of the site; copy and seat
 * colours live in content/team-chart.ts.
 */

const handwriting = Caveat({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });

const ICON_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

function SeatIcon({ slug, className = "" }: { slug: string; className?: string }) {
  switch (slug) {
    case "strategos":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M4 17h16" />
          <path d="M5 17 3 7l5 4 4-6 4 6 5-4-2 10Z" />
        </svg>
      );
    case "scout":
      return (
        <svg {...ICON_PROPS} className={className}>
          <circle cx="7" cy="15" r="3.5" />
          <circle cx="17" cy="15" r="3.5" />
          <path d="M10.5 15h3M8 11.5 9.5 5h5L16 11.5" />
        </svg>
      );
    case "wordsmith":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M7 3h7l4 4v14H7Z" />
          <path d="M14 3v4h4M10 12h5M10 16h5" />
        </svg>
      );
    case "seeker":
      return (
        <svg {...ICON_PROPS} className={className}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4.5-4.5" />
        </svg>
      );
    case "growthtrack":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M4 20h16" />
          <path d="M6 16v-4M11 16V8M16 16V5" />
        </svg>
      );
    case "pixel":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="m14 5 5 5-9 9H5v-5Z" />
          <path d="m12 7 5 5" />
        </svg>
      );
    case "flow":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M13 3 5 14h6l-1 7 8-11h-6Z" />
        </svg>
      );
    case "socialite":
      return (
        <svg {...ICON_PROPS} className={className}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16.5" cy="9.5" r="2.5" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0M15 19a4 4 0 0 1 5.5-3.7" />
        </svg>
      );
    case "nexus":
      return (
        <svg {...ICON_PROPS} className={className}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
        </svg>
      );
    case "metric":
      return (
        <svg {...ICON_PROPS} className={className}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 16v-3M12 16V9M16 16v-5" />
        </svg>
      );
    case "guardian":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M12 3 5 6v6c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6Z" />
          <path d="m9.5 12 1.8 1.8L15 10" />
        </svg>
      );
    default:
      return (
        <svg {...ICON_PROPS} className={className}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

function Callout({
  children,
  className = "",
  arrow = "down-right",
}: {
  children: ReactNode;
  className?: string;
  arrow?: "down-right" | "down-left" | "right";
}) {
  return (
    <div aria-hidden className={`${handwriting.className} pointer-events-none absolute z-10 hidden text-[22px] leading-[1.05] text-[#6a56e8] lg:block ${className}`}>
      {children}
      <svg
        viewBox="0 0 48 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`mt-1 h-7 w-10 ${arrow === "down-left" ? "-scale-x-100" : ""} ${arrow === "right" ? "-rotate-45" : ""}`}
      >
        <path d="M4 4c6 16 18 24 40 22" />
        <path d="m36 20 8 6-4 4" />
      </svg>
    </div>
  );
}

function GlassPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[28px] border border-white/70 bg-white/45 p-4 shadow-[0_24px_70px_rgba(84,72,200,0.10)] backdrop-blur-xl sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function SpecialistCard({ agent, href }: { agent: AgentProfile; href: string }) {
  const style = SEAT_STYLES[agent.slug];
  return (
    <a
      href={href}
      className="group relative flex flex-col items-center rounded-2xl border border-white bg-white px-2 pb-4 pt-6 text-center shadow-[0_10px_30px_rgba(11,22,49,0.06)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(84,72,200,0.16)] focus-visible:outline-brand"
    >
      <span
        aria-hidden
        className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-2 ring-white"
        style={{ backgroundColor: style.accent }}
      />
      <span
        aria-hidden
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: style.tint, color: style.accent }}
      >
        <SeatIcon slug={agent.slug} className="h-6 w-6" />
      </span>
      <span className="mt-3 text-[15px] font-bold leading-tight text-ink">{agent.name}</span>
      <span className="mt-1 min-h-[2.6em] text-[11px] leading-snug text-ink-muted">{agent.role}</span>
      <span
        className="mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
        style={{ backgroundColor: style.chipBg, color: style.chipText }}
      >
        {style.verb}
      </span>
    </a>
  );
}

function AssuranceCard({ agent, href }: { agent: AgentProfile; href: string }) {
  const style = SEAT_STYLES[agent.slug];
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-white bg-white px-5 py-4 shadow-[0_10px_30px_rgba(11,22,49,0.06)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(84,72,200,0.16)] focus-visible:outline-brand"
    >
      <span
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: style.tint, color: style.accent }}
      >
        <SeatIcon slug={agent.slug} className="h-6 w-6" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-bold leading-tight text-ink">{agent.name}</span>
        <span className="mt-0.5 block text-xs text-ink-muted">{agent.role}</span>
        <span className="mt-1 block text-[11px] leading-snug text-ink-muted">{agent.blurb}</span>
      </span>
    </a>
  );
}

/** Fan-out connectors from Strategos to the eight specialists (desktop only). */
function FanConnectors({ agents }: { agents: AgentProfile[] }) {
  const width = 1000;
  const height = 72;
  const columnWidth = width / agents.length;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="hidden h-[72px] w-full lg:block"
    >
      {agents.map((agent, index) => {
        const x = columnWidth * index + columnWidth / 2;
        const style = SEAT_STYLES[agent.slug];
        return (
          <path
            key={agent.slug}
            d={`M ${width / 2} 0 C ${width / 2} ${height * 0.55}, ${x} ${height * 0.35}, ${x} ${height}`}
            fill="none"
            stroke={style.accent}
            strokeOpacity="0.55"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

export function DepartmentOrgChart({
  /** Where seat cards link. Live /team/ passes "" so the cards anchor to on-page profiles. */
  profileHrefBase = "",
  id,
}: {
  profileHrefBase?: string;
  id?: string;
}) {
  const strategos = AGENTS.find((a) => a.slug === "strategos")!;
  const specialists = AGENTS.filter((a) => a.type === "specialist");
  const assurance = AGENTS.filter((a) => a.type === "assurance");
  const hrefFor = (slug: string) => `${profileHrefBase}#${slug}`;

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        background:
          "linear-gradient(180deg, #f7f6fd 0%, #ffffff 38%, #f4f2fc 100%)",
      }}
    >
      {/* Soft blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-24 -top-16 h-72 w-72 rounded-full opacity-80 blur-3xl"
          style={{ background: "radial-gradient(circle at 30% 30%, #c8bdff 0%, rgba(200,189,255,0) 70%)" }}
        />
        <div
          className="absolute -right-32 top-1/3 h-96 w-96 rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle at 60% 40%, #bcd3ff 0%, rgba(188,211,255,0) 70%)" }}
        />
        <div
          className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 50%, #f5c6e6 0%, rgba(245,198,230,0) 70%)" }}
        />
        <div
          className="absolute -left-10 bottom-10 h-56 w-56 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 50%, #cbe8ff 0%, rgba(203,232,255,0) 70%)" }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">{DEPARTMENT_EYEBROW}</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            {DEPARTMENT_HEADLINE_LINE_1}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #3b6ef5 0%, #6437f5 55%, #c04cc2 100%)" }}
            >
              {DEPARTMENT_HEADLINE_LINE_2}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{DEPARTMENT_SUBHEAD}</p>
        </div>

        {/* Chart */}
        <div className="relative mt-12 sm:mt-14">
          <Callout className="right-0 top-[-8px] -rotate-6 xl:right-6" arrow="down-left">
            {CALLOUTS.vision[0]}
            <br />
            {CALLOUTS.vision[1]}
          </Callout>

          {/* Strategos */}
          <div className="relative mx-auto max-w-md">
            <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-[0_18px_50px_rgba(84,72,200,0.14)] backdrop-blur-xl sm:p-5">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full p-[3px]"
                  style={{ background: "linear-gradient(135deg, #7f5cff, #e56ad0)" }}
                >
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-navy-950 text-white">
                    <SeatIcon slug="strategos" className="h-6 w-6" />
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-lg font-bold leading-tight text-ink">{strategos.name}</p>
                    <span className="inline-flex rounded-full border border-[#d9d2ff] bg-[#f1eeff] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
                      {STRATEGOS_CHART_BADGE}
                    </span>
                  </div>
                  <p className="text-sm text-ink-muted">{strategos.role}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-muted">{STRATEGOS_CHART_LINE}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connectors: fan on desktop, labelled stem on smaller screens */}
          <div className="relative mt-1">
            <div className="flex flex-col items-center py-3 lg:hidden">
              <span aria-hidden className="h-6 w-px bg-linear-to-b from-[#a89bff] to-transparent" />
              <p className="text-xs font-medium text-ink-muted">Delegates and coordinates</p>
              <span aria-hidden className="h-6 w-px bg-linear-to-b from-transparent to-[#a89bff]" />
            </div>
            {/* Overlaps the glass panel padding (p-5) so each line ends on its seat dot. */}
            <div className="relative z-10 hidden lg:-mb-5 lg:block">
              <div className="mx-auto h-4 w-px bg-linear-to-b from-[#a89bff] to-[#8fb0ff]" aria-hidden />
              <div className="px-5">
                <FanConnectors agents={specialists} />
              </div>
            </div>
          </div>

          {/* Specialists */}
          <div className="relative">
            <Callout className="left-0 top-[-84px] -rotate-6 xl:left-2" arrow="down-right">
              {CALLOUTS.specialists[0]}
              <br />
              {CALLOUTS.specialists[1]}
            </Callout>
            <GlassPanel>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-3">
                {specialists.map((agent) => (
                  <li key={agent.slug} className="min-w-0">
                    <SpecialistCard agent={agent} href={hrefFor(agent.slug)} />
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </div>

          {/* Independent assurance */}
          <div className="relative mx-auto mt-2 max-w-3xl">
            <Callout className="left-[-140px] top-6 -rotate-12" arrow="right">
              {CALLOUTS.oversight[0]}
              <br />
              {CALLOUTS.oversight[1]}
            </Callout>
            <div className="grid grid-cols-2" aria-hidden>
              <span className="mx-auto h-8 w-px bg-linear-to-b from-[#a89bff] to-[#8fb0ff]" />
              <span className="mx-auto h-8 w-px bg-linear-to-b from-[#a89bff] to-[#8fb0ff]" />
            </div>
            <GlassPanel>
              <ul className="grid gap-3 sm:grid-cols-2">
                {assurance.map((agent) => (
                  <li key={agent.slug} className="min-w-0">
                    <AssuranceCard agent={agent} href={hrefFor(agent.slug)} />
                  </li>
                ))}
              </ul>
            </GlassPanel>
            <p className="mt-3 text-center text-xs text-ink-muted">{ASSURANCE_NOTE}</p>
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-14 text-center">
          <div className="mx-auto flex max-w-md items-center gap-4">
            <span aria-hidden className="h-px flex-1 bg-linear-to-r from-transparent to-[#b9b0ff]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">{DEPARTMENT_FOOTER_LINE}</p>
            <span aria-hidden className="h-px flex-1 bg-linear-to-l from-transparent to-[#b9b0ff]" />
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {DEPARTMENT_FOOTER_TITLE}
            <span className="text-brand">.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
