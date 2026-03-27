"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  unit?: string;
  className?: string;
}

export function StatCard({
  icon,
  title,
  value,
  change,
  trend,
  unit,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-stone-400 mb-2">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-stone-100">
                {value}
              </span>
              {unit && (
                <span className="text-sm text-stone-400">{unit}</span>
              )}
            </div>
            {change !== undefined && (
              <div className="mt-3">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend === "up" ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {trend === "up" ? "+" : "-"}
                  {Math.abs(change)}% from last period
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
