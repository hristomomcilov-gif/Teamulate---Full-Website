import Image from "next/image";

function SparkleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l1.8 5.2c.2.6.7 1.1 1.3 1.3L20 10l-4.9 1.5c-.6.2-1.1.7-1.3 1.3L12 18l-1.8-5.2c-.2-.6-.7-1.1-1.3-1.3L4 10l4.9-1.5c.6-.2 1.1-.7 1.3-1.3L12 2z" />
      <path d="M19 15l.8 2.2c.1.3.3.5.6.6L22.5 18.5l-2.1.7c-.3.1-.5.3-.6.6L19 22l-.8-2.2c-.1-.3-.3-.5-.6-.6l-2.1-.7 2.1-.7c.3-.1.5-.3.6-.6L19 15z" />
    </svg>
  );
}

function PersonIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  );
}

function GroupIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19c0-2.8 2.4-4.7 5.5-4.7s5.5 1.9 5.5 4.7" />
      <circle cx="16.5" cy="10" r="2.4" />
      <path d="M16.5 15.1c2.4.2 4 1.8 4 3.9" />
    </svg>
  );
}

function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l7 2.8v5.4c0 4.5-3 8.1-7 9.8-4-1.7-7-5.3-7-9.8V5.8L12 3z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

const STEPS = [
  {
    icon: PersonIcon,
    title: "A Human (Chris)",
    caption: "Researches your company dynamics/goals; configures your AI setup",
  },
  { icon: SparkleIcon, title: "AI Agents", caption: "Routines and campaigns execution" },
  { icon: GroupIcon, title: "Outcome for AI Visibility", caption: "The new marketing medium" },
];

export function FounderCard() {
  return (
    <div className="mx-auto max-w-5xl rounded-[28px] border border-line bg-surface p-5 shadow-card sm:p-8 lg:p-10">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
        {/* Photo + name */}
        <div>
          <div className="relative overflow-hidden rounded-(--tm-radius-lg)">
            <Image
              src="/founder/chris-founder-2026.webp"
              alt="Chris Momchilov, founder of Teamulate"
              width={800}
              height={1000}
              className="h-auto w-full object-cover"
            />
            <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/95 text-brand shadow-card">
              <SparkleIcon className="h-4.5 w-4.5" />
            </span>
          </div>
          <p className="mt-4 text-center text-xl font-bold text-ink">Chris Momchilov</p>
          <p className="mt-1 flex items-center justify-center gap-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">
            Founder <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          </p>
        </div>

        {/* Story */}
        <div className="text-center lg:pt-2">
          <p className="flex justify-center text-brand">
            <SparkleIcon className="h-7 w-7" />
          </p>
          <h3 className="mx-auto mt-3 max-w-md text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Building the marketing department of the future.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            Twelve years as a marketing manager - VistaVu, MioCommerce, Cosmetic World, B2B and ecommerce.
            Strategos prepares the strategy; Chris approves it and monitors execution, with his sign-off on the
            decisions that matter.
          </p>

          {/* Steps */}
          <div className="mt-7 grid grid-cols-3 gap-3 lg:flex lg:items-start lg:justify-center lg:gap-2">
            {STEPS.map((step, i) => (
              <div key={step.title} className="contents lg:flex lg:items-start lg:gap-2">
                <div className="flex flex-col items-center rounded-(--tm-radius-md) border border-line bg-surface p-3 lg:w-36 lg:border-0 lg:bg-transparent lg:p-0">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender text-brand">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-2.5 text-sm font-bold leading-tight text-ink">{step.title}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-muted">{step.caption}</p>
                </div>
                {i < STEPS.length - 1 ? (
                  <span aria-hidden className="hidden pt-6 text-lg text-ink-muted/60 lg:block">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          {/* Tenant 0 callout */}
          <div className="mx-auto mt-7 flex max-w-md flex-row items-center gap-3 rounded-(--tm-radius-md) bg-lavender/60 p-4 text-left sm:p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-brand shadow-sm">
              <ShieldIcon className="h-5.5 w-5.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">We are our own first customer.</p>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                To prove you our work is worth it.
              </p>
            </div>
          </div>

          {/* Quote */}
          <figure className="mt-7">
            <blockquote className="flex items-start justify-center gap-3">
              <span aria-hidden className="text-3xl font-black leading-none text-brand">
                &ldquo;
              </span>
              <p className="max-w-sm text-left text-base font-semibold leading-relaxed text-ink sm:text-center">
                One-man success has never been more accessible. I&apos;m here to help you grow.
              </p>
            </blockquote>
            <figcaption className="mt-2 text-sm font-bold text-brand">— Chris</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
