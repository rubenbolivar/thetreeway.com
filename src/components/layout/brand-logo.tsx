// Brand logo rendered as a CSS mask filled with currentColor, so it
// inherits the text color and adapts to light/dark/hover with a single
// monochrome asset (REFACTOR §3 — coherent with the editorial system).
// Source assets are the white-on-transparent PNGs in /public.

const ASSET = {
  // Wordmark only (no symbol) — used in nav/footer at a larger size.
  wordmark: { src: "/brand-wordmark.png", ratio: 1405 / 300 },
  lockup: { src: "/brand-lockup.png", ratio: 1373 / 320 },
  mark: { src: "/brand-mark.png", ratio: 1 },
} as const;

export function BrandLogo({
  variant = "wordmark",
  className,
  label,
}: {
  variant?: "wordmark" | "lockup" | "mark";
  className?: string;
  // When set, the logo is exposed to AT as an image with this name.
  // Omit when a parent element already provides the accessible name.
  label?: string;
}) {
  const { src, ratio } = ASSET[variant];
  return (
    <span
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: "inline-block",
        aspectRatio: String(ratio),
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
