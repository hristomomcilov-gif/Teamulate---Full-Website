import { TeamulateIcon } from "@/components/BrandLogo";
import { DEMO_FUNNEL, DEMO_KPIS, DEMO_NAV, DEMO_PROFILE } from "@/lib/demo/fixtures";

/**
 * Hero illustration of the live /app/ Marketing Dashboard chrome, driven by
 * the same demo-profile sample as /demo/dashboard/. Missing series stay
 * omitted — no invented campaigns, deltas, or ROI.
 */
export function DashboardMockup() {
  const traffic = DEMO_KPIS.find((k) => k.id === "traffic")!;
  const maxFunnel = DEMO_FUNNEL[0].value;

  return (
    <figure>
      <div className="overflow-hidden rounded-(--tm-radius-lg) border border-line bg-surface shadow-card">
        <p className="bg-amber-100 px-3 py-1.5 text-center text-[10px] font-semibold text-amber-900">
          Sample — {DEMO_PROFILE.period.label} demo profile, not a customer account
        </p>
        <div className="flex">
          <div className="hidden w-32 shrink-0 bg-navy-950 p-2.5 sm:block">
            <p className="flex items-center gap-1.5 px-1.5 pb-2.5 text-[11px] font-bold text-white">
              <TeamulateIcon className="h-4 w-4" /> Teamulate
            </p>
            <ul className="space-y-0.5">
              {DEMO_NAV.map((item, i) => (
                <li
                  key={item}
                  className={`rounded-md px-2 py-1.5 text-[10px] font-medium ${
                    i === 0 ? "bg-brand text-white" : "text-white/60"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 flex-1 bg-surface-muted p-3 sm:p-3.5">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-ink">{DEMO_PROFILE.productTitle}</p>
                <p className="text-[10px] text-ink-muted">{DEMO_PROFILE.period.label}</p>
              </div>
              <p className="flex items-center gap-1.5 text-[10px] font-medium text-ink-muted">
                <span
                  aria-hidden
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[8px] font-bold text-white"
                >
                  {DEMO_PROFILE.user.initials}
                </span>
                {DEMO_PROFILE.user.name}
              </p>
            </div>

            <div className="mb-2.5 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
              {DEMO_KPIS.map((kpi) => (
                <div key={kpi.id} className="rounded-md border border-line bg-surface p-2">
                  <p className="truncate text-[9px] font-medium text-ink-muted">{kpi.label}</p>
                  <p className="mt-0.5 text-sm font-bold tabular-nums text-ink">{kpi.display}</p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1">
                    {kpi.note ? <p className="text-[8px] text-ink-muted">{kpi.note}</p> : null}
                    {kpi.sample ? (
                      <span className="rounded-full bg-amber-100 px-1 py-px text-[8px] font-bold uppercase text-amber-900">
                        {DEMO_PROFILE.sampleLabel}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-md border border-line bg-surface p-2.5">
                <div className="mb-1.5 flex items-center justify-between gap-1">
                  <p className="text-[10px] font-semibold text-ink">Performance Overview</p>
                  <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-bold uppercase text-amber-900">
                    {DEMO_PROFILE.sampleLabel}
                  </span>
                </div>
                <svg
                  viewBox="0 0 220 56"
                  className="h-12 w-full"
                  role="img"
                  aria-label={`${traffic.label} ${traffic.display} ${traffic.note}`}
                >
                  <line x1="4" y1="8" x2="4" y2="44" stroke="var(--tm-border)" strokeWidth="1" />
                  <line x1="4" y1="44" x2="216" y2="44" stroke="var(--tm-border)" strokeWidth="1" />
                  <text x="8" y="10" fill="var(--tm-text-muted)" fontSize="8">
                    {traffic.display}
                  </text>
                  <line x1="4" y1="14" x2="216" y2="14" stroke="var(--tm-violet-600)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="110" cy="14" r="3" fill="var(--tm-violet-600)" />
                </svg>
                <p className="mt-1 text-[8px] text-ink-muted">Week total only. Daily series omitted.</p>
              </div>

              <div className="rounded-md border border-line bg-surface p-2.5">
                <p className="mb-1.5 text-[10px] font-semibold text-ink">Lead Funnel</p>
                <ul className="space-y-1.5">
                  {DEMO_FUNNEL.map((row) => (
                    <li key={row.stage}>
                      <div className="mb-0.5 flex items-baseline justify-between gap-1">
                        <span className="text-[8px] font-semibold text-ink">{row.stage}</span>
                        <span className="text-[8px] font-bold tabular-nums text-ink">{row.display}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-lavender">
                        <div
                          className="h-full rounded-full bg-brand"
                          style={{ width: `${Math.max(3, (row.value / maxFunnel) * 100)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-ink-muted">
        Teamulate Marketing Dashboard with demo-profile sample for {DEMO_PROFILE.period.label}. Not live customer
        numbers.
      </figcaption>
    </figure>
  );
}
