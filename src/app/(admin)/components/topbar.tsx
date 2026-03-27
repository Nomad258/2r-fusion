"use client";

import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopbarProps {
  sidebarCollapsed?: boolean;
}

export function Topbar({ sidebarCollapsed = false }: TopbarProps) {
  const userRole = "Gestionnaire"; // This would come from auth context in real app
  const userName = "Utilisateur Admin";
  const notificationCount = 3;

  return (
    <header
      className={`fixed top-0 right-0 h-20 bg-stone-950 border-b border-stone-800/50 flex items-center justify-between px-6 transition-all duration-300 z-30 ${
        sidebarCollapsed ? "left-20" : "left-64 md:left-64"
      }`}
    >
      <div className="hidden md:flex items-center gap-4 text-sm">
        <div className="px-3 py-1 rounded-full bg-stone-800/50 text-stone-400 text-xs font-medium uppercase tracking-wide">
          {userRole}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 text-stone-400 hover:text-gold-500 transition-colors hover:bg-stone-800/50 rounded-lg">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-stone-800/50">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-medium text-stone-100">{userName}</p>
            <p className="text-xs text-stone-500">{userRole}</p>
          </div>

          <button className="flex items-center gap-2 p-1.5 hover:bg-stone-800/50 rounded-lg transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
              <AvatarFallback className="bg-gold-500 text-stone-950 font-bold">
                AU
              </AvatarFallback>
            </Avatar>
            <ChevronDown size={16} className="text-stone-400" />
          </button>
        </div>
      </div>
    </header>
  );
}