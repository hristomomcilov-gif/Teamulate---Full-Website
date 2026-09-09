import type { ReactNode } from "react";
import type { Plan } from "@/content/plans";

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CoreGlyph() {
  return (
    <>
      <path d="M12 3.4 18.4 7.6 12 11.8 5.6 7.6Z" />
      <path d="M5.6 11.1 12 15.3 18.4 11.1" />
      <path d="M5.6 14.7 12 18.9 18.4 14.7" />
    </>
  );
}

function GrowthGlyph() {
  return (
    <>
      <path d="M4.8 18.5V13.2" />
      <path d="M9.1 18.5V9.4" />
      <path d="M13.4 18.5V6.2" />
      <path d="M16.2 10.4V4.6H22" />
      <path d="M22 4.6 16.6 10" />
    </>
  );
}

function ScaleGlyph() {
  return (
    <>
      <path d="M12 10.2V4.4" />
      <path d="m10 6.4 2-2 2 2" />
      <path d="M13.8 12h5.8" />
      <path d="m17.6 10 2 2-2 2" />
      <path d="M12 13.8v5.8" />
      <path d="m10 17.6 2 2 2-2" />
      <path d="M10.2 12H4.4" />
      <path d="m6.4 10-2 2 2 2" />
    </>
  );
}

const GLYPHS: Record<Plan["key"], () => ReactNode> = {
  core: CoreGlyph,
  growth: GrowthGlyph,
  scale: ScaleGlyph,
};

/** Purple line-art in a circular outline. Same mark on homepage and /pricing/. */
export function PlanIcon({ planKey }: { planKey: Plan["key"] }) {
  const Glyph = GLYPHS[planKey];
  return (
    <span
      aria-hidden
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand text-brand"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" {...STROKE}>
        <Glyph />
      </svg>
    </span>
  );
}
