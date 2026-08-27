/**
 * The 18 named workflows (locked 27 Aug). Six groups mapped to the 11 seats.
 * These are workflow titles, not headcount - the roster stays 11.
 */
export type WorkflowGroup = {
  group: string;
  seats: string[];
  titles: string[];
  description: string;
};

export const WORKFLOW_GROUPS: WorkflowGroup[] = [
  {
    group: "Research",
    seats: ["Scout", "Seeker"],
    titles: ["Audience brief", "Topic pass", "Competitor notes", "Message map"],
    description: "The context that everything else drafts from - who the audience is, what to say, and what the field looks like.",
  },
  {
    group: "Pages",
    seats: ["Wordsmith", "Flow"],
    titles: ["Site page draft", "Landing draft", "CRO note", "Publish checklist"],
    description: "Site and landing pages drafted from approved briefs, with conversion notes and a release checklist.",
  },
  {
    group: "Social",
    seats: ["Socialite", "Pixel", "Guardian"],
    titles: ["Cut-down from a brief", "Batch QA", "Schedule queue", "Brand check"],
    description: "Social output cut from source material in batches - checked for quality and brand before it queues.",
  },
  {
    group: "Video",
    seats: ["Pixel"],
    titles: ["Short-cut draft"],
    description: "Short-form video cuts drafted from existing material.",
  },
  {
    group: "Outreach",
    seats: ["GrowthTrack", "Socialite"],
    titles: ["Asset-backed sequence draft", "Send gate"],
    description: "Outbound sequences drafted around real assets, with a human gate before anything sends.",
  },
  {
    group: "Measure",
    seats: ["Metric"],
    titles: ["Tool report", "Empty-report allowed", "Next-pass note"],
    description: "What your tools actually recorded - an empty report is allowed, invented numbers are not - plus what the next pass should use.",
  },
];

export const WORKFLOW_TITLE_COUNT = WORKFLOW_GROUPS.reduce((sum, g) => sum + g.titles.length, 0); // 18
