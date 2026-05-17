// Root passthrough. With next-intl v4, <html>/<body> live in
// [locale]/layout.tsx (locale-aware) and rubenbolivar/layout.tsx (legacy).
// See REFACTOR-STRATEGY.md §4.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
