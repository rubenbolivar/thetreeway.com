import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Filesystem-backed MDX content (REFACTOR §4/§7, Sprint 4).
// Layout: src/content/{type}/{locale}/{slug}.mdx with frontmatter.

const ROOT = path.join(process.cwd(), "src", "content");

export type ContentType = "cases" | "insights";

export interface ContentMeta {
  slug: string;
  title: string;
  label?: string;
  status?: string;
  stack?: string;
  summary?: string;
  date?: string;
  order?: number;
  [key: string]: unknown;
}

export interface ContentDoc {
  meta: ContentMeta;
  body: string;
}

function dir(type: ContentType, locale: string) {
  return path.join(ROOT, type, locale);
}

export function getSlugs(type: ContentType, locale: string): string[] {
  const d = dir(type, locale);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDoc(
  type: ContentType,
  locale: string,
  slug: string,
): ContentDoc | null {
  const file = path.join(dir(type, locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  // gray-matter frontmatter is untyped; assert to our shape. Required
  // fields (title) are guaranteed by the .mdx authoring convention.
  const meta = { slug, ...data } as ContentMeta;
  return { meta, body: content };
}

export function getAll(type: ContentType, locale: string): ContentMeta[] {
  return getSlugs(type, locale)
    .map((slug) => getDoc(type, locale, slug)?.meta)
    .filter((m): m is ContentMeta => Boolean(m))
    .sort((a, b) => {
      // order asc, then date desc as fallback.
      if (a.order != null && b.order != null) return a.order - b.order;
      return String(b.date ?? "").localeCompare(String(a.date ?? ""));
    });
}

// All {locale, slug} pairs for generateStaticParams.
export function getStaticPairs(type: ContentType, locales: string[]) {
  return locales.flatMap((locale) =>
    getSlugs(type, locale).map((slug) => ({ locale, slug })),
  );
}
