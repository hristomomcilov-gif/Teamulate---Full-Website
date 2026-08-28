import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { flags } from "@/lib/flags";
import { Container, Eyebrow } from "@/components/ui";
import { DemoDashboard } from "@/components/demo/DemoDashboard";

export const metadata: Metadata = {
  title: "Interactive Dashboard Demo",
  description:
    "Explore the Teamulate Marketing Dashboard with the demo-profile sample for 24–30 Aug 2026. Labelled sample data, not a customer account.",
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
            This is the Teamulate Marketing Dashboard using the demo-profile sample filled 27 Aug 2026
            (week of Aug 24–30). Every number is labelled sample. Nothing here is a live customer account.
          </p>
        </div>
        <DemoDashboard />
      </Container>
    </div>
  );
}
