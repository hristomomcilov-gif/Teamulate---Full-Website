import type { Metadata } from "next";
import { Card, Eyebrow, Section } from "@/components/ui";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Sign in to the Teamulate client dashboard.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Section className="pt-16">
      <div className="mx-auto max-w-md">
        <Eyebrow>Client login</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Sign in to your dashboard</h1>
        <Card className="mt-6">
          <LoginForm />
        </Card>
      </div>
    </Section>
  );
}
