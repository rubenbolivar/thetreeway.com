import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing } from "../../../../i18n/routing";
import { getAll, getDoc, getStaticPairs } from "../../../../lib/content";
import { Tag } from "../../../../components/ui/tag";
import { Link } from "../../../../i18n/navigation";
import { JsonLd } from "../../../../components/seo/json-ld";
import { articleSchema } from "../../../../lib/schema";
import { SITE_URL, buildMetadata } from "../../../../lib/metadata";
import { ShareLinks } from "../../../../components/share/share-links";

export function generateStaticParams() {
  return getStaticPairs("cases", [...routing.locales]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = getDoc("cases", locale, slug);
  if (!doc) return {};
  return buildMetadata({
    locale,
    path: `casos/${slug}`,
    title: `${doc.meta.title} · TheTreeWay`,
    description: doc.meta.summary ?? doc.meta.title,
    type: "article",
  });
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const doc = getDoc("cases", locale, slug);
  if (!doc) notFound();

  const tags = (doc.meta.stack ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Next case (wraps around) for end-of-article navigation.
  const all = getAll("cases", locale);
  const idx = all.findIndex((m) => m.slug === slug);
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;

  const pageUrl = `${SITE_URL}/${locale}/casos/${slug}`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <JsonLd
        data={articleSchema({
          headline: doc.meta.title,
          description: doc.meta.summary,
          url: pageUrl,
          image: `${pageUrl}/opengraph-image`,
          datePublished: doc.meta.date,
          section: "Case Study",
        })}
      />
      <Link
        href="/casos"
        className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle hover:text-foreground"
      >
        ← {locale === "es" ? "Casos" : "Cases"}
      </Link>

      <p className="mt-10 text-xs leading-relaxed text-muted">
        {doc.meta.label}
      </p>
      <h1 className="mt-3 font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
        {doc.meta.title}
      </h1>

      <div className="mt-10 [&>h2]:mt-12 [&>h2]:font-display [&>h2]:text-xl [&>h2]:font-medium [&>h2]:text-foreground [&>p]:mt-5 [&>p]:text-[17px] [&>p]:leading-[1.7] [&>p]:text-muted [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-1.5 [&>ul]:pl-5 [&>ul>li]:text-[17px] [&>ul>li]:leading-[1.7] [&>ul>li]:text-muted [&_strong]:font-medium [&_strong]:text-foreground">
        <MDXRemote source={doc.body} />
      </div>

      <div className="mt-12 flex flex-wrap gap-1.5">
        {tags.map((tg) => (
          <Tag key={tg}>{tg}</Tag>
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
        {doc.meta.status}
      </p>

      <ShareLinks url={pageUrl} title={doc.meta.title} />

      <nav className="mt-16 flex flex-col gap-3 border-hairline border-x-0 border-b-0 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/casos"
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle hover:text-foreground"
        >
          ← {locale === "es" ? "Todos los casos" : "All cases"}
        </Link>
        {next ? (
          <Link
            href={`/casos/${next.slug}`}
            className="group text-sm text-muted transition-colors hover:text-foreground"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
              {locale === "es" ? "Siguiente caso" : "Next case"} →
            </span>
            <span className="mt-1 block font-display text-base font-medium text-foreground">
              {next.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
