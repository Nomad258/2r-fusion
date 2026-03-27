"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calendar,
  BookOpen,
  Users,
  Package,
  Truck,
  FileText,
  Users2,
  TrendingUp,
  Shield,
  Bell,
  Settings,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  isCollapsed: boolean;
}

const navSections = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Orders", href: "/orders", icon: UtensilsCrossed },
      { label: "Reservations", href: "/reservations", icon: Calendar },
      { label: "Guests / CRM", href: "/guests", icon: Users },
    ],
  },
  {
    title: "Menu & Kitchen",
    items: [
      { label: "Menu Management", href: "/menu-management", icon: BookOpen },
      { label: "QR Codes", href: "/menu-management/qr-codes", icon: QrCode },
    ],
  },
  {
    title: "Supply Chain",
    items: [
      { label: "Inventory", href: "/inventory", icon: Package },
      { label: "Suppliers", href: "/suppliers", icon: Truck },
      { label: "Invoices", href: "/invoices", icon: FileText },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Forecasts", href: "/forecasts", icon: TrendingUp },
      { label: "Anomalies", href: "/anomalies", icon: Shield },
      { label: "Alerts", href: "/alerts", icon: Bell },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Employees", href: "/employees", icon: Users2 },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function SidebarNav({ isCollapsed }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {navSections.map((section) => (
        <div key={section.title}>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold tracking-wider text-stone-600 uppercase">
              {section.title}
            </p>
          )}
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href) && item.href !== "/menu-management/qr-codes");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={18} className={cn("flex-shrink-0", isActive && "text-amber-400")} />
                  {!isCollapsed && <span>{item.label}</span>}
                  {isActive && !isCollapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
