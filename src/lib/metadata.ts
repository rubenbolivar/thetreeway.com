import type { Metadata } from 'next';

interface LocalizedMetadata {
  title: string;
  description: string;
  keywords: string[];
}

const metadata: Record<string, LocalizedMetadata> = {
  es: {
    title: 'TheTreeWay - Convertimos ideas en tecnologías que funcionan',
    description: 'Desarrollamos soluciones digitales completas que impulsan tu negocio. Desde el concepto hasta la implementación. Frontend, Backend, UX/UI, Apps móviles.',
    keywords: [
      'desarrollo web',
      'aplicaciones móviles',
      'software a medida',
      'tecnología',
      'desarrollo full-stack',
      'UX/UI design',
      'apps móviles',
      'cloud solutions',
      'México',
      'desarrollo de software'
    ]
  },
  en: {
    title: 'TheTreeWay - We turn ideas into working technologies',
    description: 'We develop complete digital solutions that propel your business. From concept to implementation. Frontend, Backend, UX/UI, Mobile Apps.',
    keywords: [
      'web development',
      'mobile applications',
      'custom software',
      'technology',
      'full-stack development',
      'UX/UI design',
      'mobile apps',
      'cloud solutions',
      'Mexico',
      'software development'
    ]
  }
};

export function generateMetadata(locale: string): Metadata {
  const localeData = metadata[locale] || metadata.es;
  const baseUrl = process.env.SITE_URL || 'https://thetreeway.com';
  const canonicalUrl = locale === 'es' ? baseUrl : `${baseUrl}/en`;

  return {
    title: localeData.title,
    description: localeData.description,
    keywords: localeData.keywords,
    authors: [{ name: 'TheTreeWay' }],
    creator: 'TheTreeWay',
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: canonicalUrl,
      title: localeData.title,
      description: localeData.description,
      siteName: 'TheTreeWay',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: localeData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localeData.title,
      description: localeData.description,
      images: [`${baseUrl}/images/twitter-image.jpg`],
      creator: '@thetreeway',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es': baseUrl,
        'en': `${baseUrl}/en`,
        'x-default': baseUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}