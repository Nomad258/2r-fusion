"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-6 mb-8",
        className
      )}
    >
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-stone-100 mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-stone-400">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
