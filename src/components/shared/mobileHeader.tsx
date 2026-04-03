"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { ThemeToggle } from "./themeToggle";

export function MobileHeader() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration Safe Logo Logic
  // Jab tak mounted nahi hai, tab tak light logo ya placeholder dikhao
  const logoSrc = (mounted && resolvedTheme === "dark")
    ? "https://companyasset.blob.core.windows.net/assets/zorvynfulllogodark.png"
    : "https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png";

  // AGAR MOUNTED NAHI HAI, TOH RADIX COMPONENTS (SHEET) RENDER MAT KARO
  // Isse ID mismatch aur attributes mismatch khatam ho jayenge
  if (!mounted) {
    return (
      <header className="lg:hidden flex items-center justify-between p-4 border-b bg-card h-16">
        <div className="flex items-center gap-2">
          <img src="https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png" alt="logo" className="h-9 opacity-50" />
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          <div className="w-8 h-8 rounded-md bg-muted animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="lg:hidden flex items-center justify-between p-4 border-b bg-background ">
      <div className="flex items-center gap-2">
        <img src={logoSrc} alt="Zorvyn Logo" className="h-9 w-auto" />
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-none bg-background">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Zorvyn Menu</SheetDescription>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}