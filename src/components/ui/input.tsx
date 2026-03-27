"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-stone-300">{label}</label>}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/30 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/30",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
);
Input.displayName = "Input";

export { Input };
