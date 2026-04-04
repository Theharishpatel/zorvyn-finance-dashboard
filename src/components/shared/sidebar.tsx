"use client";

import { MOCK_DATA } from "@/lib/mockData";
import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Eye, ChevronUp, ShieldCheck, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { UserSwitcher } from "@/features/auth/components/userSwitcher";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { role, setRole, name } = useAuthStore();

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-background text-sidebar-foreground",
        className,
      )}
    >
      <div className="p-6 flex items-center gap-2">
        {/* <span className="text-xl font-bold tracking-tight">Zorvyn</span> */}
        <img
          src="https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png"
          alt="logo"
          className="h-10"
        />
      </div>

      <nav className="flex-1  px-4 space-y-1 ">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center  gap-3 px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover: bg-sidebar-accent/50 opacity-70 hover:opacity-100",
              )}
            >
              <item.Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/*  Sidebar components ke bottom section mein: */}
      <div className="p-4 mt-auto border-t border-border/50">
        <UserSwitcher />
      </div>
    </div>
  );
}
