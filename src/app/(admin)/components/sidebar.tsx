"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./sidebar-nav";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-0 h-screen bg-stone-950 border-r border-stone-800/50 transition-all duration-300 z-40",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Branding */}
        <div className={cn(
          "flex items-center justify-between p-4 border-b border-stone-800/50",
          isCollapsed && "flex-col"
        )}>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-stone-950 font-bold text-sm">
              2R
            </div>
            {!isCollapsed && (
              <span className="font-heading font-bold text-gold-500">FUSION</span>
            )}
          </Link>
          <button
            onClick={toggleCollapse}
            className="p-1 hover:bg-stone-800 rounded-lg transition-colors text-stone-400 hover:text-gold-500"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-2">
          <SidebarNav isCollapsed={isCollapsed} />
        </nav>

        {/* Footer */}
        <div className={cn(
          "p-4 border-t border-stone-800/50 text-xs text-stone-500",
          isCollapsed && "text-center"
        )}>
          {!isCollapsed && "2R Fusion © 2026"}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="md:hidden fixed inset-0 z-30">
        <aside className="w-64 h-full bg-stone-950 border-r border-stone-800/50 overflow-y-auto">
          {/* Branding */}
          <div className="flex items-center gap-2 p-4 border-b border-stone-800/50">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-stone-950 font-bold text-sm">
              2R
            </div>
            <span className="font-heading font-bold text-gold-500">FUSION</span>
          </div>

          {/* Navigation */}
          <nav className="py-6 px-2">
            <SidebarNav isCollapsed={false} />
          </nav>
        </aside>
      </div>
    </>
  );
}
