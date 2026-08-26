import { TeamulateIcon } from "@/components/BrandLogo";

const KPIS = ["Website Traffic", "Leads Generated", "Conversion Rate", "Meetings Booked", "Content Published"];

const SIDEBAR = ["Dashboard", "Campaigns", "Content", "Leads", "SEO", "Social", "Reports", "Settings"];

/**
 * Illustrative dashboard layout for the homepage hero. Honest by design:
 * a "Demo data" ribbon, em-dash values (no invented numbers) and a caption.
 */
export function DashboardMockup() {
  return (
    <figure>
      <div className="overflow-hidden rounded-(--tm-radius-lg) border border-line bg-surface shadow-card">
        <p className="bg-amber-300 py-1 text-center text-[10px] font-bold uppercase tracking-wide text-amber-950">
          Demo data
        </p>
        <div className="flex">
          <div className="hidden w-36 shrink-0 bg-navy-950 p-3 sm:block">
            <p className="flex items-center gap-1.5 px-2 pb-3 text-xs font-bold text-white">
              <TeamulateIcon className="h-4 w-4" /> Teamulate
            </p>
            <ul className="space-y-0.5">
              {SIDEBAR.map((item, i) => (
                <li
                  key={item}
                  className={`rounded-md px-2 py-1.5 text-[11px] font-medium ${
                    i === 0 ? "bg-brand text-white" : "text-white/60"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 flex-1 bg-surface p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-ink">Marketing Dashboard</p>
              <p className="flex items-center gap-1.5 text-[10px] font-medium text-ink-muted">
                <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[8px] font-bold text-white">
                  CM
                </span>
                Chris Momchilov
              </p>
            </div>
            <div className="mb-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
              {KPIS.map((kpi) => (
                <div key={kpi} className="rounded-md border border-line bg-surface-muted p-2">
                  <p className="truncate text-[9px] font-medium text-ink-muted">{kpi}</p>
                  <p className="mt-0.5 text-sm font-bold text-ink">—</p>
                  <p className="text-[8px] text-ink-muted">vs last 30 days —</p>
                </div>
              ))}
            </div>
            <div className="mb-3 rounded-md border border-line p-2.5">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[10px] font-semibold text-ink">Performance Overview</p>
                <p className="rounded border border-line px-1.5 py-0.5 text-[8px] text-ink-muted">Last 30 days</p>
              </div>
              <svg viewBox="0 0 300 60" className="h-14 w-full" role="img" aria-label="Illustrative line chart with sample shape, no real values">
                <polyline
                  points="0,48 25,42 50,45 75,30 100,36 125,26 150,33 175,22 200,30 225,18 250,24 275,14 300,18"
                  fill="none"
                  stroke="var(--tm-violet-600)"
                  strokeWidth="2"
                />
                {[0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300].map((x, i) => {
                  const ys = [48, 42, 45, 30, 36, 26, 33, 22, 30, 18, 24, 14, 18];
                  return <circle key={x} cx={x} cy={ys[i]} r="2" fill="var(--tm-violet-600)" />;
                })}
              </svg>
            </div>
            <div className="rounded-md border border-line p-2.5">
              <p className="mb-1.5 text-[10px] font-semibold text-ink">Active Campaigns</p>
              <div className="grid grid-cols-4 gap-1 border-b border-line pb-1 text-[8px] font-semibold text-ink-muted">
                <span>Campaign</span>
                <span>Status</span>
                <span>Channel</span>
                <span>Leads</span>
              </div>
              <div className="grid grid-cols-4 gap-1 pt-1.5 text-[9px] text-ink">
                <span className="truncate font-medium text-brand">Q3 Demand Generation</span>
                <span>
                  <span className="rounded-full bg-lavender px-1.5 py-0.5 text-[8px] font-semibold text-brand">In Progress</span>
                </span>
                <span className="truncate">LinkedIn, Email</span>
                <span>—</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-ink-muted">
        Demo layout of the Teamulate dashboard. Not live customer numbers.
      </figcaption>
    </figure>
  );
}
