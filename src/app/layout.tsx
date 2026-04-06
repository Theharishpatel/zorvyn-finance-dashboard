import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import { Sidebar } from "../components/shared/sidebar";
import { MobileHeader } from "@/components/shared/mobileHeader";
import { ThemeProvider } from "@/components/themeProvider";
import { DashboardHeader } from "@/components/shared/headerDashboard";
import { Toaster } from "@/components/ui/sonner";

// 1. FONTS CONFIGURATION
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// 2. METADATA (Better Branding)
export const metadata: Metadata = {
  title: "Zorvyn | Finance Dashboard",
  description: "A modern finance management dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        suppressHydrationWarning
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          font-sans antialiased 
          h-full bg-background text-foreground
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* APP SHELL STRUCTURE */}
          <div className="relative flex h-screen overflow-hidden">
            
            {/* DESKTOP SIDEBAR: Sticky & Fixed width */}
            <aside className="hidden lg:flex w-64 flex-col border-r bg-card/50 backdrop-blur-sm">
              <Sidebar />
            </aside>

            {/* MAIN VIEWPORT */}
            <main className="flex flex-1 flex-col min-w-0 overflow-hidden">
              
              {/* MOBILE HEADER: Top navigation for small screens */}
              <MobileHeader />

              {/* CONTENT AREA: Scrollable with proper padding */}
              <section className="flex-1 overflow-y-auto outline-none scroll-smooth p-4 md:p-8 lg:p-10">
                <div className="mx-auto max-w-7xl w-full">
                  <DashboardHeader />
                  {children}
                  <Toaster position="top-center" richColors closeButton />
                </div>
              </section>
              
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}