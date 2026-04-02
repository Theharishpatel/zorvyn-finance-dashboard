"use client";


import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils"
import { Receipt } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({className}:{className?: string}){
    const pathname = usePathname();

    return (
        <div className={cn("flex h-full w-full flex-col bg-sidebar text-sidebar-foreground", className)}>
            <div className="p-6 flex items-center gap-2">
                
                {/* <span className="text-xl font-bold tracking-tight">Zorvyn</span> */}
                <img src="https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png" alt="logo" className="h-10"  />
            </div>

            <nav className="flex-1  px-4 space-y-1 ">
                {NAV_ITEMS.map((item)=> {
                    const isActive = pathname === item.href;
                    return (
                       <Link 
                       key={item.href}
                       href={item.href}
                       className={cn(
                        "flex items-center  gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                         ? "bg-sidebar-accent text-sidebar-accent-foreground"
                         : "hover: bg-sidebar-accent/50 opacity-70 hover:opacity-100"
                       )}
                       >
                        <item.Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                       </Link>
                    );
                })}

            </nav>
                <div className="p-4 border-t borader-sidebar-border">
                    {/* Role Switcher placeholder add later */}
                    <div className="text-xs opacity-50 px-3">Role : Viewer</div>
                </div>

        </div>
    )
}