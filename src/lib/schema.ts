import type { Organization, Person, Article, WithContext } from "schema-dts";
import { SITE_URL } from "./metadata";
import { social } from "../content/config/social";

const SAME_AS = [
  social.linkedin,
  social.github,
  social.x,
  social.instagram,
];

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TheTreeWay",
    url: SITE_URL,
    logo: `${SITE_URL}/images/tree-logo.png`,
    description:
      "Firma boutique de arquitectura digital e IA aplicada para grupos empresariales en Latinoamérica.",
    areaServed: ["Latin America", "Venezuela", "United States"],
    sameAs: SAME_AS,
    founder: { "@type": "Person", name: "Rubén Bolívar" },
  };
}

export function personSchema(
  jobTitle: string,
  description: string,
): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rubén Bolívar",
    jobTitle,
    description,
    worksFor: {
      "@type": "Organization",
      name: "TheTreeWay",
      url: SITE_URL,
    },
    sameAs: SAME_AS,
    knowsAbout: [
      "Enterprise architecture",
      "Applied AI",
      "Fintech",
      "Digital transformation",
      "Data ecosystems",
    ],
  };
}

export function articleSchema(opts: {
  headline: string;
  description?: string;
  url: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  section: "Case Study" | "Insight";
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    image: opts.image,
    articleSection: opts.section,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Person", name: "Rubén Bolívar" },
    publisher: {
      "@type": "Organization",
      name: "TheTreeWay",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/tree-logo.png`,
      },
    },
  };
}
