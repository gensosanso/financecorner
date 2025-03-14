import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-medium text-white hover:bg-blue-medium/90",
        destructive: "bg-coral text-white hover:bg-coral/90",
        outline:
          "border border-input bg-transparent hover:bg-accent/10 hover:text-accent-foreground",
        secondary: "bg-blue-light text-almost-black hover:bg-blue-light/80",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-blue-medium underline-offset-4 hover:underline",
        success: "bg-turquoise text-white hover:bg-turquoise/90",
        warning: "bg-gold text-almost-black hover:bg-gold/90",
        info: "bg-sky text-white hover:bg-sky/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
