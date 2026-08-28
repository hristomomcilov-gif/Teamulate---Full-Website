import Link from "next/link";
import { ENTITY_LINE, FOOTER_GROUPS } from "@/lib/site";
import { Container } from "@/components/ui";
import { NewsletterForm } from "@/components/NewsletterForm";
import { TeamulateLogo } from "@/components/BrandLogo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface-muted">
      <Container className="py-14">
        <div className="mb-10">
          <TeamulateLogo className="h-12 w-auto sm:h-14" />
          <p className="mt-4 text-base text-ink">A full marketing department. Without building one.</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {FOOTER_GROUPS.filter((g) => g.label !== "Legal").map((group) => (
            <nav key={group.label} aria-label={`Footer ${group.label}`}>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink">{group.label}</p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    {item.href.endsWith(".html") ? (
                      // Plain anchor: the login form is a full page load, never client-routed or prefetched.
                      <a href={item.href} className="text-sm text-ink-muted hover:text-brand hover:underline">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="text-sm text-ink-muted hover:text-brand hover:underline">
                        {item.label}
                      </Link>
                    )}
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
            © {year} Teamulate · Autonomous marketing department
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
