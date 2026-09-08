/**
 * Copy + visual treatment for the glassmorphism department chart
 * (src/components/team/DepartmentOrgChart.tsx). Kept free of Next-only
 * imports so the lock tests can read it directly.
 *
 * The roster itself (names, role lines) is content/agents.ts - never duplicate
 * seats here.
 *
 * Copy locks: Strategos *prepares* the strategy (Chris approves it) and the
 * agents work under human oversight - see src/tests/preview-team.test.ts.
 */

export const DEPARTMENT_EYEBROW = "The team";
export const DEPARTMENT_HEADLINE_LINE_1 = "A complete marketing department.";
export const DEPARTMENT_HEADLINE_LINE_2 = "Built for results.";
export const DEPARTMENT_SUBHEAD =
  "Specialized AI agents, working together under human oversight, to grow your brand faster and smarter.";
export const STRATEGOS_CHART_LINE = "Prepares the strategy, aligns the team, drives results.";
export const STRATEGOS_CHART_BADGE = "Human + AI";
export const ASSURANCE_NOTE =
  "Metric and Guardian are an independent assurance layer - they do not report to any execution specialist.";
export const DEPARTMENT_FOOTER_LINE = "Different expertise. A shared goal.";
export const DEPARTMENT_FOOTER_TITLE = "Your growth";

export const CALLOUTS = {
  vision: ["One vision.", "A stronger team."],
  specialists: ["Specialized agents.", "Real impact."],
  oversight: ["Independent", "oversight."],
} as const;

export type SeatStyle = {
  /** Uppercase verb chip under the seat name. */
  verb: string;
  /** Solid accent for the connector dot and the icon stroke. */
  accent: string;
  /** Tinted disc behind the icon. */
  tint: string;
  /** Chip background + text. */
  chipBg: string;
  chipText: string;
};

/** Visual treatment per seat slug. */
export const SEAT_STYLES: Record<string, SeatStyle> = {
  scout: { verb: "Discover", accent: "#3b6ef5", tint: "#e4ecff", chipBg: "#e4ecff", chipText: "#2b57d0" },
  wordsmith: { verb: "Create", accent: "#f49a16", tint: "#fdeedc", chipBg: "#fdeedc", chipText: "#b96a05" },
  seeker: { verb: "Optimize", accent: "#1f9d86", tint: "#dcf5ee", chipBg: "#dcf5ee", chipText: "#137a67" },
  growthtrack: { verb: "Scale", accent: "#e3459b", tint: "#fce4f0", chipBg: "#fce4f0", chipText: "#b62d78" },
  pixel: { verb: "Design", accent: "#6437f5", tint: "#ebe6ff", chipBg: "#ebe6ff", chipText: "#4d2ac9" },
  flow: { verb: "Convert", accent: "#e0a800", tint: "#fff4d1", chipBg: "#fff4d1", chipText: "#9c7300" },
  socialite: { verb: "Engage", accent: "#19a9b8", tint: "#dcf4f7", chipBg: "#dcf4f7", chipText: "#0f7f8b" },
  nexus: { verb: "Operate", accent: "#5b6b86", tint: "#e8ecf3", chipBg: "#e8ecf3", chipText: "#40506a" },
  metric: { verb: "Measure", accent: "#2da65a", tint: "#dff5e6", chipBg: "#dff5e6", chipText: "#1f7f43" },
  guardian: { verb: "Assure", accent: "#3b6ef5", tint: "#e4ecff", chipBg: "#e4ecff", chipText: "#2b57d0" },
};
