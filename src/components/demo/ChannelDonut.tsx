import { DEMO_CHANNEL_MIX } from "@/lib/demo/fixtures";

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Channel mix donut from the live /app/ sample (38 / 24 / 16 / 12 / 10).
 */
export function ChannelDonut() {
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
      <svg
        viewBox="0 0 100 100"
        className="h-36 w-36 shrink-0"
        role="img"
        aria-label={DEMO_CHANNEL_MIX.map((row) => `${row.channel} ${row.percent}%`).join(", ")}
      >
        <g transform="rotate(-90 50 50)">
          {DEMO_CHANNEL_MIX.map((row) => {
            const length = (row.percent / 100) * CIRCUMFERENCE;
            const dashOffset = -offset;
            offset += length;
            return (
              <circle
                key={row.channel}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={row.color}
                strokeWidth="14"
                strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </g>
        <circle cx="50" cy="50" r="24" fill="var(--tm-surface)" />
      </svg>
      <ul className="w-full min-w-[11rem] space-y-1.5 text-xs">
        {DEMO_CHANNEL_MIX.map((row) => (
          <li key={row.channel} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-ink">
              <span aria-hidden className="h-2.5 w-2.5 rounded-sm" style={{ background: row.color }} />
              {row.channel}
            </span>
            <span className="tabular-nums font-semibold text-ink">{row.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
