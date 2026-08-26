import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  muted = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`py-14 sm:py-20 lg:py-24 ${muted ? "bg-surface-muted" : ""} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {lede ? <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{lede}</p> : null}
    </div>
  );
}

export function Card({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`rounded-(--tm-radius-md) border border-line bg-surface p-6 shadow-card ${className}`}>
      {children}
    </div>
  );
}

type StatusTone = "neutral" | "info" | "positive" | "attention" | "critical";

const TONE_CLASSES: Record<StatusTone, string> = {
  neutral: "border-line bg-surface-muted text-ink-muted",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  positive: "border-green-200 bg-green-50 text-green-800",
  attention: "border-amber-200 bg-amber-50 text-amber-800",
  critical: "border-red-200 bg-red-50 text-red-800",
};

/** Status is never conveyed by color alone (spec §7.6): text label always present. */
export function StatusChip({ tone, label }: { tone: StatusTone; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      <span aria-hidden className="text-[10px] leading-none">
        {tone === "positive" ? "✓" : tone === "critical" ? "✕" : tone === "attention" ? "!" : "•"}
      </span>
      {label}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-(--tm-radius-sm) px-5 py-2.5 text-sm font-semibold transition-colors duration-200";
  const variants = {
    primary: "bg-brand text-white hover:bg-[#2f5ad0]",
    secondary: "border border-line bg-surface text-ink hover:border-brand hover:text-brand",
    ghost: "text-brand hover:underline",
  } as const;
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
      <span aria-hidden>◈</span> Sample data - product illustration, not a customer account
    </span>
  );
}
