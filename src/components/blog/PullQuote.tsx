import type { ReactNode } from "react";

export function PullQuote({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <blockquote className="rounded-(--tm-radius-md) border border-line border-l-4 border-l-brand bg-lavender px-6 py-5">
      {label ? (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">{label}</p>
      ) : null}
      <p className="text-base leading-relaxed text-ink">{children}</p>
    </blockquote>
  );
}
