"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const toastVariants = cva(
  "fixed bottom-4 right-4 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg",
  {
    variants: {
      variant: {
        default:
          "border-amber-500/30 bg-stone-900 text-amber-400",
        success:
          "border-emerald-500/30 bg-stone-900 text-emerald-400",
        warning:
          "border-yellow-500/30 bg-stone-900 text-yellow-400",
        error: "border-red-500/30 bg-stone-900 text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends VariantProps<typeof toastVariants> {
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, onClose, title, description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="flex-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className="text-xs opacity-90">{description}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
);
Toast.displayName = "Toast";

export { Toast, toastVariants };
