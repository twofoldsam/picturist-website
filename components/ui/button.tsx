import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#1E4A52] text-primary-foreground hover:bg-[#154145] hover:translate-y-[-1px]",
        destructive:
          "bg-[#DC2626] text-destructive-foreground hover:bg-[#B91C1C] hover:translate-y-[-1px]",
        outline:
          "border border-[#1E4A52] text-[#1E4A52] bg-transparent hover:bg-[#E6F2F3] hover:translate-y-[-1px]",
        secondary:
          "bg-[#F7F6F4] text-[#292D31] hover:bg-[#E9E7E2] hover:translate-y-[-1px]",
        ghost: "text-[#1E4A52] hover:bg-[#E6F2F3] hover:translate-y-[-1px]",
        link: "text-[#1E4A52] underline-offset-4 hover:underline hover:text-[#154145]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-6",
        icon: "h-10 w-10 rounded-lg",
      },
      transform: {
        default: "hover:scale-[1.02]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      transform: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, transform, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, transform, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }