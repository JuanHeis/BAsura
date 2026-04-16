import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        success:
          "border-transparent bg-emerald-600 text-white shadow hover:bg-emerald-600/80",
        pending:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-600/80",
        outline: "text-foreground",
        comuna1: "border-transparent bg-[#39B5E6]/20 text-[#39B5E6]",
        comuna3: "border-transparent bg-[#EFB041]/20 text-[#EFB041]",
        comuna7: "border-transparent bg-[#AD3559]/20 text-[#AD3559]",
        comuna13: "border-transparent bg-[#B23C8E]/20 text-[#B23C8E]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }

