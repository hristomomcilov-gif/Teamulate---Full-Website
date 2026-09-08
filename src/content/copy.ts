/**
 * Approved directional copy from spec §56. Core message, pricing and claims
 * cannot be changed without an explicit decision from Chris
 * (docs/CONTENT_MODEL.md).
 */
export const COPY = {
  category: "Autonomous marketing department for growing B2B companies.",
  hero: {
    headline: "A full marketing department. Without building one.",
    subheadline:
      "Your dedicated marketing system works inside the tools you already use to plan, create, launch, measure and improve - continuously, with human oversight for the decisions that matter.",
    primaryCta: "See the team in action",
    secondaryCta: "See how it works",
  },
  benefits: [
    {
      title: "More capacity, less overhead",
      body: "Get research, content, SEO/GEO, campaigns, CRM, creative and analytics capacity without hiring a full specialist team.",
    },
    {
      title: "Works where you already work",
      body: "Connect the system to your CRM, website, ads, email, social and analytics instead of adding another disconnected platform.",
    },
    {
      title: "Always moving. Always visible.",
      body: "Routine work keeps moving inside your guardrails. See campaigns, approvals, spend, pipeline, performance and next actions in one dashboard.",
    },
  ],
  thirtySecondExplanation:
    "Most growing B2B companies do not need another AI tool. They need the marketing work to actually get done. Teamulate builds a dedicated autonomous marketing department around your business. It works inside the tools you already use, handles research, content, SEO, campaigns, CRM and reporting, and shows you what it is doing from one dashboard. Routine work keeps moving inside approved guardrails, while your team keeps control of strategy, spend and sensitive decisions.",
  controlMessage: "Autonomous where safe. Gated where it matters.",
  dashboardMessage: "See what is running, what changed and what happens next.",
  tenant0Message:
    "Teamulate is building and marketing Teamulate with the same operating system it will deploy for clients.",
  formConfirmation:
    "Thank you. We have received your request. The next step is a focused review of your goals, current stack and the recurring work you want to move forward.",
  stackDisclaimer:
    "Teamulate is configured around an approved stack. Exact integrations and permissions are confirmed during onboarding.",
  securityDisclaimer:
    "Security controls are configured per client, integration, contract and risk profile. This page describes the Teamulate operating model and target architecture; it does not represent a certification or replace a client security review.",
  ownershipDisclaimer:
    "Your martech subscriptions, advertising spend, enrichment/data products and other third-party vendor costs are client-owned and billed directly to you. The GrokBot-powered agent system is included in your Teamulate subscription - there is no separate infrastructure to buy or manage. Teamulate fees cover setup, orchestration, managed execution, maintenance, QA, support and human oversight.",
} as const;
