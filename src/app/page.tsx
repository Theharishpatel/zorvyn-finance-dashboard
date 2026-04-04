// page.jsx (Main Dashboard)
"use client"

import { AnalyticsSection } from "@/features/dashboard/components/analytcsDashboard";
import { SummaryCards } from "@/features/dashboard/components/summaryCards";
import { columns } from "@/features/transactions/components/columns";
import { DataTable } from "@/features/transactions/components/dataTable";
import { MOCK_DATA } from "@/lib/mockData";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // 1. LocalStorage se data check karo ya MOCK_DATA se slice lo
  // NOTE: Browser environment check zaroori hai localstorage ke liye
  const allTransactions = typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("zorvyn_transactions") || JSON.stringify(MOCK_DATA.transactions))
    : MOCK_DATA.transactions;

  // 2. Suru ki 5 rows lo
  const recentTransactions = allTransactions.slice(0, 5);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 pt-6 w-full mx-auto max-w-[1600px]">
      <SummaryCards />
      <AnalyticsSection />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
          <Link 
            href="/transactions" 
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 3. DataTable render karo with 5 rows and no extra UI */}
        <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
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