import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">This page does not exist</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-muted">
        The page you are looking for may not be published yet. Routes go live only when their content is final.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Back to homepage</ButtonLink>
        <ButtonLink href="/contact/" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
