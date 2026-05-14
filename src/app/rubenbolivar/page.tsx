import type { Metadata } from 'next';
import RubenBolivarCard from './RubenBolivarCard';

export const metadata: Metadata = {
  title: 'Ruben Bolivar - Software Developer | TheTreeWay',
  description:
    'Contacto profesional de Ruben Bolivar. Full-stack developer especializado en desarrollo web y aplicaciones móviles.',
  authors: [{ name: 'Ruben Bolivar' }],
  keywords: [
    'Ruben Bolivar',
    'Software Developer',
    'Full-stack',
    'Web Developer',
    'Mobile Apps',
    'TheTreeWay',
  ],
  creator: 'Ruben Bolivar',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Ruben Bolivar - Software Developer',
    description:
      'Contacto profesional de Ruben Bolivar. Full-stack developer especializado en desarrollo web y aplicaciones móviles.',
    url: 'https://thetreeway.com/rubenbolivar/',
    siteName: 'TheTreeWay',
    locale: 'es_ES',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@RubenBolivar',
    title: 'Ruben Bolivar - Software Developer',
    description: 'Contacto profesional de Ruben Bolivar',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon', sizes: '16x16' }],
  },
};

export default function Page() {
  return <RubenBolivarCard />;
}
