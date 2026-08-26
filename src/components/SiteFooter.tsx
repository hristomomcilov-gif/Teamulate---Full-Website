import Link from "next/link";
import { FOOTER_GROUPS, SITE } from "@/lib/site";
import { COPY } from "@/content/copy";
import { ButtonLink, Container } from "@/components/ui";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-navy-950 text-white">
      <Container className="py-14">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-lg font-bold">
              <span aria-hidden className="inline-block h-5 w-5 rounded bg-gradient-to-br from-brand to-brand-purple" />
              Teamulate
            </p>
            <p className="mt-2 text-sm text-white/70">{COPY.category}</p>
          </div>
          <ButtonLink href="/request-demo/" variant="primary">
            See the team in action
          </ButtonLink>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.label} aria-label={`Footer ${group.label}`}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">{group.label}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-white/80 hover:text-white hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>
            © {year} Teamulate · {SITE.domain.replace("https://", "")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
