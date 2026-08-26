import type { Metadata } from "next";
import { Card, Eyebrow, Section } from "@/components/ui";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Sign in to the Teamulate client portal.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Section className="pt-16">
      <div className="mx-auto max-w-md">
        <Eyebrow>Client portal</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Sign in</h1>
        <Card className="mt-6">
          <p className="text-sm leading-relaxed text-ink-muted">
            Client portal access is provisioned during onboarding. There is no self-service sign-up: client users
            receive a time-limited invitation after a signed scope, with role-based access and MFA for privileged
            roles.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Sign-in will be enabled here for invited users when the client portal opens. If you expected access and do
            not have an invitation, contact your Teamulate representative.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <ButtonLink href="/contact/" variant="secondary">
              Contact us
            </ButtonLink>
            <ButtonLink href="/demo/dashboard/" variant="ghost">
              Explore the interactive demo →
            </ButtonLink>
          </div>
        </Card>
      </div>
    </Section>
  );
}
