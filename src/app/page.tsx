import { AnalyticsSection } from "@/components/dashboard/analytcsDashboard";
import { DashboardHeader } from "@/components/dashboard/headerDashboard";
import { SummaryCards } from "@/components/dashboard/summaryCards";
import { TransactionTable } from "@/components/dashboard/transactionsTable";



export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-0 pt-6 w-full mx-auto ">
      <DashboardHeader />
      <SummaryCards />
      <AnalyticsSection />
      <div className="space-y-4">
        <h2 className="text-xl font-bold">TRANSACTIONS (DETAILED VIEW)</h2>
        <div className="rounded-xl border bg-card/50 backdrop-blur-sm">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}