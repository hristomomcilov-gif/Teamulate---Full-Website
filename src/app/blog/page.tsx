import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/content/blog";
import { CtaLink } from "@/components/CtaLink";
import { SiteImage } from "@/components/SiteImage";
import { Card, Section } from "@/components/ui";
import { absoluteUrl, marketingShareMetadata } from "@/lib/site";

const BLOG_DEK =
  "Marketing end to end — demand, conversion, customers — and where the work is going.";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DEK,
  alternates: { canonical: absoluteUrl("/blog/") },
  ...marketingShareMetadata,
  openGraph: {
    ...marketingShareMetadata.openGraph,
    url: absoluteUrl("/blog/"),
    title: "Blog | Teamulate",
    description: BLOG_DEK,
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="mx-auto max-w-[820px]">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">Blog</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{BLOG_DEK}</p>
        </div>
      </Section>

      <Section muted className="pt-4">
        <div className="mx-auto max-w-[820px] space-y-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug}>
              <Card className="overflow-hidden p-0">
                <Link href={post.href} className="block">
                  <SiteImage
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    width={1200}
                    height={630}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </Link>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                    {post.dateLabel} · {post.author}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    <Link href={post.href} className="hover:text-brand">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">{post.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
                  <div className="mt-6">
                    <CtaLink href={post.href} ctaId="blog-index-read" kind="primary">
                      Read the article
                    </CtaLink>
                  </div>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
