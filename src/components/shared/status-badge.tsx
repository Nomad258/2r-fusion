"use client";

import { Badge } from "@/components/ui/badge";

type BadgeVariant = "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "premium";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { variant: BadgeVariant; label: string }> = {
  pending: { variant: "warning", label: "Pending" },
  confirmed: { variant: "success", label: "Confirmed" },
  completed: { variant: "success", label: "Completed" },
  cancelled: { variant: "danger", label: "Cancelled" },
  paid: { variant: "success", label: "Paid" },
  unpaid: { variant: "warning", label: "Unpaid" },
  overdue: { variant: "danger", label: "Overdue" },
  active: { variant: "success", label: "Active" },
  inactive: { variant: "secondary", label: "Inactive" },
  success: { variant: "success", label: "Success" },
  warning: { variant: "warning", label: "Warning" },
  error: { variant: "danger", label: "Error" },
  new: { variant: "warning", label: "New" },
  open: { variant: "warning", label: "Open" },
  closed: { variant: "secondary", label: "Closed" },
  resolved: { variant: "success", label: "Resolved" },
  dismissed: { variant: "secondary", label: "Dismissed" },
  investigating: { variant: "warning", label: "Investigating" },
  draft: { variant: "secondary", label: "Draft" },
  submitted: { variant: "default", label: "Submitted" },
  approved: { variant: "success", label: "Approved" },
  rejected: { variant: "danger", label: "Rejected" },
  received: { variant: "success", label: "Received" },
  partial: { variant: "warning", label: "Partial" },
  generated: { variant: "default", label: "Generated" },
  high: { variant: "danger", label: "High" },
  medium: { variant: "warning", label: "Medium" },
  low: { variant: "secondary", label: "Low" },
  critical: { variant: "danger", label: "Critical" },
  vip: { variant: "premium", label: "VIP" },
  regular: { variant: "default", label: "Regular" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  const config = statusConfig[normalizedStatus] || { variant: "secondary" as BadgeVariant, label: status };

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
