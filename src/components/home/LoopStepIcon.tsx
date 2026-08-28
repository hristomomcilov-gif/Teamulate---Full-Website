import type { ReactNode } from "react";

export const LOOP_ICON_NAMES = [
  "learn",
  "research",
  "plan",
  "build",
  "launch",
  "measure",
  "improve",
] as const;

export type LoopIconName = (typeof LOOP_ICON_NAMES)[number];

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden {...STROKE}>
      {children}
    </svg>
  );
}

function LearnGlyph() {
  return (
    <Icon>
      <path d="M12 6.5v12.5" />
      <path d="M4 6.25c2.6.15 4.35 1.4 8 1.4s5.4-1.25 8-1.4v11.3c-2.6.2-4.5 1.45-8 1.45s-5.4-1.25-8-1.45V6.25Z" />
    </Icon>
  );
}

function ResearchGlyph() {
  return (
    <Icon>
      <circle cx="10.75" cy="10.75" r="6.25" />
      <path d="m15.5 15.5 5 5" />
    </Icon>
  );
}

function PlanGlyph() {
  return (
    <Icon>
      <circle cx="7.25" cy="8" r="2.35" />
      <path d="m14.25 6.25 5 5M19.25 6.25l-5 5" />
      <path d="M7.25 11.75c.2 4.1 4.1 6.35 9.1 6.1" />
      <path d="m14.35 15.6 2.15 2.25 2.15-2.25" />
    </Icon>
  );
}

function BuildGlyph() {
  return (
    <Icon>
      <path d="M7.5 16.5 16.5 7.5" />
      <path d="m14.75 5.75 3.5 3.5" />
      <path d="m5.75 14.75 3.5 3.5" />
      <path d="M8.5 20.25 3.75 15.5l1.7-1.15 4.2 4.2Z" />
      <path d="m15.5 3.75 4.75 4.75-1.7 1.15-4.2-4.2Z" />
      <path d="M9.25 14.75 14.75 9.25" />
    </Icon>
  );
}

function LaunchGlyph() {
  return (
    <Icon>
      <path d="M13.4 4.2c2.4 1.15 5.15 3.9 6.4 6.4-2.15 2.15-6.55 3.35-9.15 3.55L7.4 17.4 6.6 16.6l3.25-3.25C10.05 10.75 11.25 6.35 13.4 4.2Z" />
      <path d="M13.15 8.85h.01" />
      <path d="M6.4 13.15c-1.35.35-2.55 1.15-3.4 2.35.2.85.7 1.55 1.4 2.05 1.2-.85 2-2.05 2.35-3.4Z" />
      <path d="m10.85 17.6-.85 2.55" />
      <path d="m6.4 13.15-2.55.85" />
    </Icon>
  );
}

function MeasureGlyph() {
  return (
    <Icon>
      <path d="M4.5 19.5h15" />
      <path d="M7 19.5v-4.25" />
      <path d="M11 19.5V11" />
      <path d="M15 19.5v-6.5" />
      <path d="m6.25 10.25 4.1-3.35 3.15 2.2 4.25-4.1" />
      <path d="M15.25 5h2.5v2.5" />
    </Icon>
  );
}

function ImproveGlyph() {
  return (
    <Icon>
      <path d="M20 12a8 8 0 1 1-2.2-5.5" />
      <path d="M20 4.75V8.5h-3.75" />
    </Icon>
  );
}

const GLYPHS: Record<LoopIconName, () => ReactNode> = {
  learn: LearnGlyph,
  research: ResearchGlyph,
  plan: PlanGlyph,
  build: BuildGlyph,
  launch: LaunchGlyph,
  measure: MeasureGlyph,
  improve: ImproveGlyph,
};

/** Solid squircle + white line glyph. Same 44×44 size on every viewport. */
export function LoopStepIcon({ name }: { name: LoopIconName }) {
  const Glyph = GLYPHS[name];
  return <Glyph />;
}
