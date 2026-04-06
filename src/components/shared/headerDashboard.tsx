"use client";

import * as React from "react";
import { Search, Bell, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MOCK_DATA } from "@/lib/mockData";
import { ThemeToggle } from "@/components/shared/themeToggle";

export function DashboardHeader() {
  // Current Date nikalne ke liye logic
  const [currentDate, setCurrentDate] = React.useState("");

  React.useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    setCurrentDate(now.toLocaleDateString("en-US", options));
  }, []);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-6">
      <div>
        {/* Mock Data se User Name le rahe hain */}
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {MOCK_DATA.user.name.split(" ")[0]} !
        </h1>
        {/* Dynamic Current Date */}
        <p className="text-sm text-muted-foreground">
          {currentDate || "Loading date..."}
        </p>
      </div>

      <div className="hidden  lg:flex items-center gap-4">
        <ThemeToggle />
        {/* Notifications Icon with Badge */}
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
            3
          </span>
        </div>
      </div>
    </div>
  );
}
