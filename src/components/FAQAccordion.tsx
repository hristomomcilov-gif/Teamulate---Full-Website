export type FaqItem = { question: string; answer: string };

/**
 * Accessible disclosure list using native semantics. Items are OPEN by
 * default (founder decision 2026-08-27): answers must be immediately visible
 * to readers, crawlers and LLMs, while users keep the option to collapse.
 */
export function FAQAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-(--tm-radius-md) border border-line bg-surface">
      {items.map((item) => (
        <details key={item.question} open className="group px-5 py-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <span aria-hidden className="text-ink-muted transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
