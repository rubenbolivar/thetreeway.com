import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// REFACTOR §3: primary CTA black, secondary CTA hairline outline.
// No shadows, no gradients, sentence case, 0.5px borders.
export const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:opacity-90 px-5 py-3",
        secondary:
          "border-hairline text-foreground hover:text-accent hover:border-accent px-5 py-3 bg-transparent",
        ghost: "text-accent hover:underline underline-offset-4 px-0 py-0",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function Button({
  children,
  className,
  variant,
  href,
  external,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
