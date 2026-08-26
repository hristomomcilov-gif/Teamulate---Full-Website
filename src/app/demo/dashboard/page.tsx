import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { flags } from "@/lib/flags";
import { Container, Eyebrow } from "@/components/ui";
import { DemoDashboard } from "@/components/demo/DemoDashboard";

export const metadata: Metadata = {
  title: "Interactive Dashboard Demo",
  description:
    "Explore the Teamulate client dashboard with clearly labelled sample data: one complete workflow, one approval decision, one measured result.",
  robots: { index: false, follow: false },
};

export default function DemoDashboardPage() {
  if (!flags.demoDashboardEnabled) notFound();

  return (
    <div className="bg-surface-muted py-10 sm:py-14">
      <Container>
        <div className="mb-8 max-w-3xl">
          <Eyebrow>Interactive demo</Eyebrow>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            The dashboard, with sample data
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            This is a guided sample for a fictional company, Northstar Technical Services. In 2-4 minutes you can see a
            goal at risk, the work that unblocked it, make an approval decision yourself and watch the system react.
            Nothing here touches any real account.
          </p>
        </div>
        <DemoDashboard />
      </Container>
    </div>
  );
}
