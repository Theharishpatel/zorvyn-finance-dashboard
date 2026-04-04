
import { AnalyticsSection } from "@/features/dashboard/components/analytcsDashboard";
import { DashboardHeader } from "@/features/dashboard/components/headerDashboard";
import { SummaryCards } from "@/features/dashboard/components/summaryCards";
import {
  columns
} from "@/features/transactions/components/columns";
import { DataTable } from "@/features/transactions/components/dataTable";
import { MOCK_DATA } from "@/lib/mockData";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Transaction } from "@/types";


export default function DashboardPage() {
  const recentTransactions = MOCK_DATA.transactions.slice(0, 5) as Transaction[];
  return (
    <div className="flex flex-col gap-8 p-6 md:p-0 pt-6 w-full mx-auto ">
      <DashboardHeader />
      <SummaryCards />
      <AnalyticsSection />
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Recent Transactions
            </h2>
            {/* <p className="text-sm text-muted-foreground">You have 3 pending tasks this week.</p> */}
          </div>

          {/* YE HAI VIEW MORE NAVIGATION */}
          <Link
            href="/transactions"
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1 transition-all"
          >
            View More
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        {/* Wahi DataTable use karo, bas data filter karke bhejo */}
        <DataTable
          columns={columns}
          showPagination={false}
          showToolbar={false}
          data={recentTransactions}
        />
      </div>
    </div>
  );
}
