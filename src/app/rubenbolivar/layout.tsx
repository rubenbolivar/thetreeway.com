import "../globals.css";

// Legacy route outside the [locale] system (REFACTOR-STRATEGY.md §10
// decision: keep /rubenbolivar/ as-is). Provides its own html/body
// since the root layout is a passthrough.
export default function RubenBolivarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
