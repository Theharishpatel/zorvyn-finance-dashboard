"use client";

import { BalanceChart } from "./balanceChart";
import { SpendingDonut } from "./spendingDonut";
import { cn } from "@/lib/utils";

export function AnalyticsSection({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 w-full", className)}>
      {/* - Grid 1 column default (Mobile)
          - Grid 7 columns from Large screens (Desktop)
      */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7 w-full">
        
        {/* 1. BALANCE CHART (Line/Area Chart) */}
        <div className="lg:col-span-4 w-full min-h-[300px] md:min-h-[350px] lg:min-h-[400px] transition-all">
          <div className="h-full w-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-1 shadow-sm">
            <BalanceChart />
          </div>
        </div>

        {/* 2. SPENDING DONUT (Donut/Pie Chart) */}
        <div className="lg:col-span-3 w-full min-h-[300px] md:min-h-[350px] lg:min-h-[400px] transition-all">
          <div className="h-full w-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-1 shadow-sm">
            <SpendingDonut />
          </div>
        </div>

      </div>
    </div>
  );
}