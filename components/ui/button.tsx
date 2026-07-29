import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-rose text-white hover:-translate-y-0.5 hover:bg-plum hover:shadow-rose-glow",
        secondary:
          "border-2 border-plum bg-transparent text-plum hover:bg-plum hover:text-white",
        outline:
          "border border-cream-300 bg-transparent text-text hover:bg-rose-pale",
        ghost: "text-muted hover:bg-rose-pale hover:text-text",
        white:
          "bg-white text-plum hover:-translate-y-0.5 hover:bg-gold-light hover:text-plum",
        outlineWhite:
          "border-2 border-white/80 bg-transparent text-white hover:bg-white/10",
        gold: "bg-gold text-white hover:bg-gold-deep",
      },
      size: {
        default: "h-11 min-h-[44px] px-6 py-2",
        sm: "h-9 min-h-[44px] px-4 text-xs",
        lg: "h-12 min-h-[44px] px-8 text-base",
        icon: "h-10 w-10 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
