import type { Metadata } from 'next';
import RubenBolivarCard from './RubenBolivarCard';

const TITLE = 'Rubén Bolívar — Fundador y arquitecto principal · TheTreeWay';
const DESCRIPTION =
  'Rubén Bolívar, fundador y arquitecto principal de TheTreeWay: firma boutique de arquitectura digital e IA aplicada para grupos empresariales en Latinoamérica. Datos de contacto directos y agenda.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: 'Rubén Bolívar' }],
  keywords: [
    'Rubén Bolívar',
    'TheTreeWay',
    'arquitectura digital',
    'IA aplicada',
    'transformación digital',
    'grupos empresariales',
    'LatAm',
  ],
  creator: 'Rubén Bolívar',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://thetreeway.com/rubenbolivar' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://thetreeway.com/rubenbolivar',
    siteName: 'TheTreeWay',
    locale: 'es_ES',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@RubenBolivar',
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon', sizes: '16x16' }],
  },
};

export default function Page() {
  return <RubenBolivarCard />;
}
