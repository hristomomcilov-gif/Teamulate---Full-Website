export type FaqItem = { question: string; answer: string };

/** Accessible accordion using native disclosure semantics. */
export function FAQAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-(--tm-radius-md) border border-line bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4">
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
