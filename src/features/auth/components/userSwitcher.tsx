"use client";

import * as React from "react";
import { Eye, ChevronUp, ShieldCheck, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserSwitcher() {
  const { role, setRole, name } = useAuthStore();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-muted/80  transition-all border border-transparent hover:border-border/40  group outline-none">
          <div className="flex  items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                <UserCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              {/* Role Indicator Dot */}
              <div className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background shadow-sm transition-colors",
                role === "admin" ? "bg-emerald-500" : "bg-slate-400"
              )} />
            </div>
            <div className="flex flex-col items-start leading-none gap-1">
              <span className="text-sm font-bold truncate max-w-[120px]">{name}</span>
              <span className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-widest">
                {role} Mode
              </span>
            </div>
          </div>
          <ChevronUp className="h-4 w-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        side="top" 
        align="start" 
        className=" p-2 mb-2 rounded-2xl backdrop-blur-xl bg-background/80 border-border/50 shadow-2xl animate-in slide-in-from-bottom-2"
      >
        <div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Account Settings
        </div>
        
        <DropdownMenuItem 
          onClick={() => setRole("admin")} 
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors",
            role === "admin" ? "bg-emerald-500/10 text-emerald-600" : "focus:bg-emerald-500/5"
          )}
        >
          <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-600">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Admin Access</span>
            <span className="text-[10px] opacity-70 font-medium">Full CRUD Permissions</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setRole("viewer")} 
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl cursor-pointer mt-1 transition-colors",
            role === "viewer" ? "bg-slate-500/10 text-slate-600" : "focus:bg-slate-500/5"
          )}
        >
          <div className="p-1.5 bg-slate-500/10 rounded-lg text-slate-600">
            <Eye className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Viewer Mode</span>
            <span className="text-[10px] opacity-70 font-medium">Read-only Access</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}