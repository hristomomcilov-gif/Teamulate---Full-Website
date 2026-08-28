const PERSON = {
  fill: "var(--tm-lavender-100)",
  stroke: "var(--tm-violet-600)",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Seat({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-4.6" r="3.1" {...PERSON} />
      <path d="M-5.8 8.2c.15-4.1 2.5-6.2 5.8-6.2s5.65 2.1 5.8 6.2" {...PERSON} />
    </g>
  );
}

function AgentNode({ x, y }: { x: number; y: number }) {
  return <rect x={x} y={y} width="6" height="6" rx="1.4" fill="var(--tm-violet-600)" opacity="0.55" />;
}

/**
 * People-cost contrast for the glance "Up to 90%" card.
 * Left: 10-seat in-house department. Right: one human + the agent system.
 * No photos, no letter tiles, no new savings figure.
 */
export function GlanceCostContrast() {
  const inHouse = Array.from({ length: 10 }, (_, i) => ({
    x: 18 + (i % 5) * 18,
    y: 38 + Math.floor(i / 5) * 24,
  }));

  const agents = [
    [168, 46],
    [177, 46],
    [186, 46],
    [195, 46],
    [168, 55],
    [177, 55],
    [186, 55],
    [195, 55],
    [173, 64],
    [182, 64],
    [191, 64],
  ] as const;

  return (
    <svg
      viewBox="0 0 220 86"
      className="h-auto w-full max-w-[17rem] shrink-0 text-brand sm:max-w-[13.75rem]"
      role="img"
      aria-label="Ten-person in-house marketing department versus one human plus the Teamulate agent system"
    >
      <text x="52" y="14" textAnchor="middle" fill="var(--tm-text-muted)" fontSize="8" fontWeight="700">
        In-house
      </text>
      <text x="176" y="14" textAnchor="middle" fill="var(--tm-text-muted)" fontSize="8" fontWeight="700">
        Teamulate
      </text>
      <line x1="112" y1="22" x2="112" y2="80" stroke="var(--tm-violet-600)" strokeOpacity="0.22" strokeWidth="1.25" />
      {inHouse.map((seat) => (
        <Seat key={`${seat.x}-${seat.y}`} x={seat.x} y={seat.y} />
      ))}
      <Seat x={148} y={48} scale={1.35} />
      {agents.map(([x, y]) => (
        <AgentNode key={`${x}-${y}`} x={x} y={y} />
      ))}
    </svg>
  );
}
