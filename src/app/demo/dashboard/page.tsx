import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { flags } from "@/lib/flags";
import { DemoDashboard } from "@/components/demo/DemoDashboard";

export const metadata: Metadata = {
  title: "Interactive Dashboard Demo",
  description:
    "Explore the Teamulate Marketing Dashboard with the demo-profile data for 24–30 Aug 2026.",
  robots: { index: false, follow: false },
};

export default function DemoDashboardPage() {
  if (!flags.demoDashboardEnabled) notFound();

  return <DemoDashboard />;
}
