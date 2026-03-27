"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-stone-300">{label}</label>}
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/30 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/30",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
