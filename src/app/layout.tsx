import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TheTreeWay - Convertimos ideas en tecnologías",
  description: "Desarrollamos soluciones digitales completas que impulsan tu negocio. Desde el concepto hasta la implementación.",
  keywords: ["desarrollo web", "aplicaciones móviles", "software", "tecnología", "desarrollo full-stack"],
  authors: [{ name: "TheTreeWay" }],
  creator: "TheTreeWay",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://thetreeway.com",
    title: "TheTreeWay - Convertimos ideas en tecnologías",
    description: "Desarrollamos soluciones digitales completas que impulsan tu negocio",
    siteName: "TheTreeWay",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheTreeWay - Convertimos ideas en tecnologías",
    description: "Desarrollamos soluciones digitales completas que impulsan tu negocio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
