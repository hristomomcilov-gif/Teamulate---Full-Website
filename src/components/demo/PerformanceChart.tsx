import { DEMO_PERFORMANCE_CHART, DEMO_PROFILE } from "@/lib/demo/fixtures";

const X_TICKS = [48, 140, 232, 324, 416, 508, 600];
const Y_TICKS = [40, 90, 140];

/**
 * Exact /app/ Performance Overview curves. Same path on the homepage hero
 * and /demo/dashboard/ — only the rendered size changes.
 */
export function PerformanceChart({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { trafficPath, leadsPath, trafficColor, leadsColor, leftAxis, rightAxis, xLabels } =
    DEMO_PERFORMANCE_CHART;

  return (
    <svg
      viewBox="0 0 648 168"
      className={compact ? "h-28 w-full" : "h-52 w-full"}
      role="img"
      aria-label={`${DEMO_PERFORMANCE_CHART.trafficLabel} and ${DEMO_PERFORMANCE_CHART.leadsLabel}, ${DEMO_PROFILE.period.label}`}
    >
      {Y_TICKS.map((y) => (
        <line key={y} x1="48" y1={y} x2="600" y2={y} stroke="var(--tm-border)" strokeWidth="1" />
      ))}
      {leftAxis.map((label, i) => (
        <text key={`l-${label}`} x="42" y={Y_TICKS[i] + 3} textAnchor="end" fill="var(--tm-text-muted)" fontSize="10">
          {label}
        </text>
      ))}
      {rightAxis.map((label, i) => (
        <text key={`r-${label}`} x="606" y={Y_TICKS[i] + 3} fill="var(--tm-text-muted)" fontSize="10">
          {label}
        </text>
      ))}
      <path d={trafficPath} fill="none" stroke={trafficColor} strokeWidth="2.25" strokeLinecap="round" />
      <path
        d={leadsPath}
        fill="none"
        stroke={leadsColor}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeDasharray="5 4"
      />
      {xLabels.map((label, i) => (
        <text
          key={label}
          x={X_TICKS[i]}
          y="160"
          textAnchor="middle"
          fill="var(--tm-text-muted)"
          fontSize="10"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export function PerformanceLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-ink-muted">
      <li className="flex items-center gap-1.5">
        <span aria-hidden className="h-0.5 w-4 rounded-full" style={{ background: DEMO_PERFORMANCE_CHART.trafficColor }} />
        {DEMO_PERFORMANCE_CHART.trafficLabel}
      </li>
      <li className="flex items-center gap-1.5">
        <span
          aria-hidden
          className="h-px w-4 border-t-2 border-dashed"
          style={{ borderColor: DEMO_PERFORMANCE_CHART.leadsColor }}
        />
        {DEMO_PERFORMANCE_CHART.leadsLabel}
      </li>
    </ul>
  );
}
