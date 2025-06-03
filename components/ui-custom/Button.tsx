import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../ui/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        primary: "bg-[#1E4A52] text-white hover:bg-[#154145] hover:translate-y-[-1px]",
        secondary: "bg-[#F7F6F4] text-[#292D31] hover:bg-[#E9E7E2] hover:translate-y-[-1px]",
        outline: "border border-[#1E4A52] text-[#1E4A52] bg-transparent hover:bg-[#E6F2F3] hover:translate-y-[-1px]",
        ghost: "text-[#1E4A52] hover:bg-[#E6F2F3] hover:translate-y-[-1px]",
        link: "text-[#1E4A52] underline-offset-4 hover:underline hover:text-[#154145]",
        destructive: "bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:translate-y-[-1px]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
      weight: {
        default: "font-medium",
        bold: "font-bold",
      },
      transform: {
        default: "hover:scale-[1.02]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      weight: "default",
      transform: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, weight, transform, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, weight, transform, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };