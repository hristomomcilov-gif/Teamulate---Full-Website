import Link from "next/link";
import { Container } from "@/components/ui";

const GUIDES: { href: string; label: string }[] = [
  { href: "/autonomous-ai-marketing-department/", label: "The autonomous marketing department" },
  { href: "/ai-marketing-team/", label: "What is an AI marketing team?" },
  { href: "/workflows/", label: "Workflow library" },
  { href: "/ai-marketing-automation/", label: "AI vs marketing automation" },
  { href: "/research/marketing-team-cost-2026/", label: "Marketing team cost 2026" },
  { href: "/compare/ai-vs-agency-vs-fractional-vs-inhouse/", label: "Compare your options" },
];

/** Cross-links between the six SEO guide pages. Pass the current route to omit it. */
export function RelatedGuides({ current }: { current: string }) {
  const items = GUIDES.filter((guide) => guide.href !== current);
  return (
    <section className="border-t border-line bg-surface-muted py-10">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">Keep reading</p>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="flex min-h-11 items-center justify-between gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {guide.label}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
