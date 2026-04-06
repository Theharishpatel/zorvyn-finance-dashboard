"use client"

import { AnalyticsSection } from "@/features/dashboard/components/analytcsDashboard";
import { InsightsSection } from "@/features/dashboard/components/insightsSection";
import { SummaryCards } from "@/features/dashboard/components/summaryCards";
import { columns } from "@/features/transactions/components/columns";
import { DataTable } from "@/features/transactions/components/dataTable";
import { MOCK_DATA } from "@/lib/mockData";
import { ChevronRight, Loader2 } from "lucide-react"; // Loader add kiya
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Logic tabhi chalega jab mounted true ho (Hydration Safe)
  const allTransactions = (typeof window !== "undefined" && mounted)
    ? JSON.parse(localStorage.getItem("zorvyn_transactions") || JSON.stringify(MOCK_DATA.transactions))
    : []; // Server side par empty array rakho

  const recentTransactions = allTransactions.slice(0, 5);

  // 2. AGAR MOUNTED NAHI HAI TOH SKELETON YA EMPTY DIV DIKHAO
  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 pt-6 w-full mx-auto max-w-[1600px] animate-in fade-in duration-500">
      <SummaryCards />
      <InsightsSection data={allTransactions}/>
      <AnalyticsSection />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-60">
              Live updates from your transactions
            </p>
          </div>
          <Link 
            href="/transactions" 
            className="text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-full transition-all active:scale-95 flex items-center gap-1"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden shadow-sm">
            <DataTable 
                columns={columns} 
                data={recentTransactions} 
                showPagination={false} 
                showToolbar={false} 
            />
        </div>
      </div>
    </div>
  );
}