import * as React from "react"

import { cn } from "./utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl bg-[#F7F6F4] border border-[#F7F6F4] px-3 py-2 text-sm ring-offset-background placeholder:text-[#6B7280]/70 focus-visible:outline-none focus-visible:border-[#1E4A52] focus-visible:ring-2 focus-visible:ring-[#1E4A52]/20 focus-visible:ring-offset-0 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }