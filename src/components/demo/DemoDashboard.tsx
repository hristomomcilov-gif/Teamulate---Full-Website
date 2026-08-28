"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TeamulateIcon } from "@/components/BrandLogo";
import { trackEvent } from "@/lib/analytics";
import {
  DEMO_AGENTS,
  DEMO_FUNNEL,
  DEMO_KPIS,
  DEMO_NAV,
  DEMO_OMITTED,
  DEMO_PROFILE,
  type DemoNavItem,
} from "@/lib/demo/fixtures";

function SampleChip() {
  return (
    <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-900">
      {DEMO_PROFILE.sampleLabel}
    </span>
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-(--tm-radius-md) border border-line bg-surface p-4 shadow-card sm:p-5 ${className}`}>
      <h3 className="mb-3 text-sm font-bold text-ink">{title}</h3>
      {children}
    </section>
  );
}

function KpiGrid({ ids }: { ids?: Array<(typeof DEMO_KPIS)[number]["id"]> }) {
  const cards = ids ? DEMO_KPIS.filter((kpi) => ids.includes(kpi.id)) : DEMO_KPIS;
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {cards.map((kpi) => (
        <div key={kpi.id} className="rounded-(--tm-radius-md) border border-line bg-surface p-3 sm:p-4">
          <p className="truncate text-[11px] font-medium text-ink-muted">{kpi.label}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-ink">{kpi.display}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {kpi.note ? <p className="text-[11px] text-ink-muted">{kpi.note}</p> : null}
            {kpi.sample ? <SampleChip /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function PerformanceOverview() {
  const traffic = DEMO_KPIS.find((k) => k.id === "traffic")!;
  return (
    <Panel title="Performance Overview">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-ink-muted">{DEMO_PROFILE.period.label}</p>
        <SampleChip />
      </div>
      <div className="relative h-40 rounded-md border border-line bg-surface-muted px-3 py-3">
        <svg viewBox="0 0 320 120" className="h-full w-full" role="img" aria-label={`${traffic.label} ${traffic.display} ${traffic.note}`}>
          <line x1="8" y1="12" x2="8" y2="96" stroke="var(--tm-border)" strokeWidth="1" />
          <line x1="8" y1="96" x2="312" y2="96" stroke="var(--tm-border)" strokeWidth="1" />
          <text x="14" y="16" fill="var(--tm-text-muted)" fontSize="10">
            {traffic.display}
          </text>
          <line x1="8" y1="20" x2="312" y2="20" stroke="var(--tm-violet-600)" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="160" cy="20" r="5" fill="var(--tm-violet-600)" />
          <text x="160" y="114" textAnchor="middle" fill="var(--tm-text-muted)" fontSize="10">
            {DEMO_PROFILE.period.label}
          </text>
        </svg>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">{DEMO_OMITTED.dailySeries}</p>
    </Panel>
  );
}

function ChannelPerformance() {
  return (
    <Panel title="Channel Performance">
      <div className="flex flex-col items-center justify-center gap-3 py-4">
        <svg viewBox="0 0 120 120" className="h-28 w-28" role="img" aria-label="Channel performance unavailable in this sample">
          <circle cx="60" cy="60" r="40" fill="none" stroke="var(--tm-border)" strokeWidth="16" />
          <circle cx="60" cy="60" r="22" fill="var(--tm-lavender-50)" />
        </svg>
        <p className="max-w-[16rem] text-center text-xs leading-relaxed text-ink-muted">{DEMO_OMITTED.channelMix}</p>
      </div>
    </Panel>
  );
}

function LeadFunnel() {
  const max = DEMO_FUNNEL[0].value;
  return (
    <Panel title="Lead Funnel">
      <ul className="space-y-3">
        {DEMO_FUNNEL.map((row) => {
          const width = Math.max(2, (row.value / max) * 100);
          return (
            <li key={row.stage}>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="text-xs font-semibold text-ink">{row.stage}</span>
                <span className="text-xs font-bold tabular-nums text-ink">{row.display}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-lavender">
                <div className="h-full rounded-full bg-brand" style={{ width: `${width}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

function ActiveCampaigns() {
  return (
    <Panel title="Active Campaigns">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-xs">
          <thead>
            <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              <th className="pb-2 pr-3 font-semibold">Campaign</th>
              <th className="pb-2 pr-3 font-semibold">Status</th>
              <th className="pb-2 pr-3 font-semibold">Channel</th>
              <th className="pb-2 font-semibold">Leads</th>
            </tr>
          </thead>
        </table>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-muted">{DEMO_OMITTED.campaigns}</p>
    </Panel>
  );
}

function AiRecommendations() {
  return (
    <Panel title="AI Recommendations">
      <p className="text-xs leading-relaxed text-ink-muted">{DEMO_OMITTED.recommendations}</p>
    </Panel>
  );
}

function AgentActivity() {
  return (
    <Panel title="Agent Activity">
      <ul className="grid gap-2 sm:grid-cols-2">
        {DEMO_AGENTS.map((agent) => (
          <li
            key={agent.name}
            className="flex items-start justify-between gap-3 rounded-md border border-line bg-surface-muted px-3 py-2.5"
          >
            <div>
              <p className="text-sm font-semibold text-ink">{agent.name}</p>
              <p className="text-[11px] text-ink-muted">{agent.role}</p>
            </div>
            <span className="shrink-0 rounded-full bg-lavender px-2 py-0.5 text-[10px] font-bold tracking-wide text-brand">
              {agent.code}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function OmittedNote({ text }: { text: string }) {
  return (
    <Panel title="This view">
      <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
    </Panel>
  );
}

function ViewBody({ nav }: { nav: DemoNavItem }) {
  switch (nav) {
    case "Dashboard":
      return (
        <div className="space-y-4">
          <KpiGrid />
          <div className="grid gap-4 lg:grid-cols-2">
            <PerformanceOverview />
            <ChannelPerformance />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <LeadFunnel />
            <ActiveCampaigns />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <AiRecommendations />
            <AgentActivity />
          </div>
        </div>
      );
    case "Campaigns":
      return <ActiveCampaigns />;
    case "Content":
      return (
        <div className="space-y-4">
          <KpiGrid ids={["content"]} />
        </div>
      );
    case "Leads":
      return (
        <div className="space-y-4">
          <KpiGrid ids={["leads", "conversion", "meetings"]} />
          <LeadFunnel />
        </div>
      );
    case "SEO":
      return (
        <div className="space-y-4">
          <KpiGrid ids={["traffic"]} />
          <OmittedNote text={DEMO_OMITTED.seoExtra} />
        </div>
      );
    case "Social":
      return <OmittedNote text={DEMO_OMITTED.social} />;
    case "Reports":
      return (
        <div className="space-y-4">
          <KpiGrid />
          <PerformanceOverview />
        </div>
      );
    case "Settings":
      return <OmittedNote text={DEMO_OMITTED.settings} />;
    default:
      return null;
  }
}

export function DemoDashboard() {
  const [nav, setNav] = useState<DemoNavItem>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    trackEvent("dashboard_demo_opened", { surface: "demo", route: "/demo/dashboard/" });
  }, []);

  const interact = (ctaId: string) => trackEvent("dashboard_demo_interaction", { surface: "demo", ctaId });

  const go = (next: DemoNavItem) => {
    setNav(next);
    setSidebarOpen(false);
    interact(`nav:${next}`);
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-navy-950 p-4">
      <p className="mb-5 flex items-center gap-2 px-2 text-sm font-bold text-white">
        <TeamulateIcon className="h-6 w-6" />
        Teamulate
      </p>
      <nav aria-label="Dashboard" className="space-y-0.5">
        {DEMO_NAV.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            className={`flex w-full min-h-10 items-center rounded-md px-3 text-left text-sm font-medium ${
              nav === item ? "bg-brand text-white" : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-(--tm-radius-lg) border border-line bg-surface-muted shadow-card">
      <p className="flex items-center justify-center gap-2 bg-amber-100 px-4 py-2 text-center text-xs font-semibold text-amber-900">
        <span aria-hidden>◈</span> Interactive product demo — sample data, not a customer account.
      </p>

      <div className="flex min-h-[36rem]">
        <aside className="hidden w-52 shrink-0 sm:block">{sidebar}</aside>

        <div className="min-w-0 flex-1 bg-surface-muted">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-line text-ink sm:hidden"
                aria-expanded={sidebarOpen}
                aria-controls="demo-mobile-sidebar"
                onClick={() => {
                  setSidebarOpen((open) => !open);
                  interact("toggle-sidebar");
                }}
              >
                <span className="sr-only">{sidebarOpen ? "Close menu" : "Open menu"}</span>
                <span aria-hidden className="text-lg leading-none">
                  {sidebarOpen ? "✕" : "☰"}
                </span>
              </button>
              <div>
                <p className="text-base font-bold text-ink">{DEMO_PROFILE.productTitle}</p>
                <p className="text-[11px] text-ink-muted">{DEMO_PROFILE.period.label}</p>
              </div>
            </div>
            <p className="flex items-center gap-2 text-xs font-medium text-ink-muted">
              <span
                aria-hidden
                className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white"
              >
                {DEMO_PROFILE.user.initials}
              </span>
              {DEMO_PROFILE.user.name}
            </p>
          </header>

          {sidebarOpen ? (
            <div className="sm:hidden">
              <button
                type="button"
                className="fixed inset-0 z-40 bg-navy-950/40"
                aria-label="Close menu"
                onClick={() => setSidebarOpen(false)}
              />
              <div id="demo-mobile-sidebar" className="fixed inset-y-0 left-0 z-50 w-64 shadow-card">
                {sidebar}
              </div>
            </div>
          ) : null}

          <div className="space-y-4 p-4 sm:p-5">
            <ViewBody nav={nav} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-line bg-surface px-5 py-4 sm:flex-row">
        <p className="text-sm text-ink-muted">
          Demo profile sample filled {DEMO_PROFILE.filledOn.slice(8)} Aug 2026. Missing values are omitted, not shown as zero.
        </p>
        <Link
          href="/request-demo/"
          onClick={() => interact("demo-footer-cta")}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-[#4a38d8]"
        >
          Request a live walkthrough
        </Link>
      </div>
    </div>
  );
}
