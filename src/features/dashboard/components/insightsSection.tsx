"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle, LucideIcon } from "lucide-react";
import { Transaction } from "@/features/transactions/types";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: "rose" | "emerald" | "blue";
}

export function InsightsSection({ data }: { data: Transaction[] }) {
  // Logic Optimization: Memoize calculations if data is huge
  const expenses = data.filter((t) => t.type === "expense");
  
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  if (data.length === 0) return null;

  return (
    /* @container: Is parent ko container banaya
      grid-cols-1: Mobile by default
      @md:grid-cols-3: Jab container 448px se bada ho tab 3 columns
    */
    <div className="@container w-full mb-8">
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <InsightCard 
          title="Top Spending"
          value={highestCategory ? highestCategory[0] : "N/A"}
          subtitle={`Total: ₹${highestCategory ? highestCategory[1].toLocaleString() : 0}`}
          icon={AlertTriangle}
          color="rose"
        />

        <InsightCard 
          title="Efficiency"
          value="+14.2% Savings"
          subtitle="Vs last month"
          icon={TrendingUp}
          color="emerald"
        />

        <InsightCard 
          title="AI Suggestion"
          value={`Limit ${highestCategory?.[0] || 'expenses'}`}
          subtitle="Save ~₹1,500/week"
          icon={Lightbulb}
          color="blue"
        />
      </div>
    </div>
  );
}

function InsightCard({ title, value, subtitle, icon: Icon, color }: InsightCardProps) {
  const colorMap = {
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  };

  return (
    <Card className="group relative overflow-hidden border-none bg-card/50 backdrop-blur-md transition-all hover:bg-card/80 shadow-sm rounded-3xl">
      <CardContent className="p-5 @sm:p-6">
        {/* Fluid Layout: 
          @sm (container width > 384px) par ye side-by-side hoga, 
          warna stacked (center aligned) dikhega.
        */}
        <div className="flex flex-col @sm:flex-row items-center @sm:items-start gap-4 text-center @sm:text-left">
          <div className={cn(
            "shrink-0 p-3 rounded-2xl border transition-transform group-hover:scale-110", 
            colorMap[color]
          )}>
            <Icon className="h-5 w-5 @sm:h-6 @sm:w-6" />
          </div>
          
          <div className="space-y-1 overflow-hidden w-full">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] opacity-70">
              {title}
            </p>
            <h3 className="truncate text-lg @sm:text-xl font-black text-foreground tracking-tight">
              {value}
            </h3>
            {subtitle && (
              <p className="truncate text-[11px] font-medium text-muted-foreground/80">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}