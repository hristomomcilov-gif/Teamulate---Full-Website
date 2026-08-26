import Link from "next/link";
import { FOOTER_GROUPS } from "@/lib/site";
import { Container } from "@/components/ui";
import { NewsletterForm } from "@/components/NewsletterForm";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface-muted">
      <Container className="py-14">
        <div className="mb-10">
          <p className="text-4xl font-extrabold uppercase tracking-[0.18em] text-brand sm:text-5xl">Teamulate</p>
          <p className="mt-3 text-base text-ink">A full marketing department. Without building one.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {FOOTER_GROUPS.filter((g) => g.label !== "Legal").map((group) => (
            <nav key={group.label} aria-label={`Footer ${group.label}`}>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink">{group.label}</p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-ink-muted hover:text-brand hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="md:col-span-3 lg:col-span-1">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink">Stay in the loop</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Teamulate · Autonomous marketing department · Client login opens with onboarding.
          </p>
          <p className="flex gap-4">
            {FOOTER_GROUPS.find((g) => g.label === "Legal")!.items.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand hover:underline">
                {item.label}
              </Link>
            ))}
          </p>
        </div>
      </Container>
    </footer>
  );
}
