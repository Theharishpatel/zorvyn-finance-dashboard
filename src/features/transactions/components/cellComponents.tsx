"use client"

import { Badge } from "@/components/ui/badge";
import { Coffee, Cloud, Home, ArrowDownLeft, ShoppingBag, LucideIcon } from "lucide-react";
import { formatCurrency } from "../services/transactionServices";

// 1. ICON MAPPING (Clean & Scalable)
const iconMap: Record<string, LucideIcon> = {
  Food: Coffee,
  Bills: Cloud,
  Rent: Home,
  Shopping: ShoppingBag,
};

export const TransactionCell = ({ merchant, category, type }: any) => {
  const Icon = iconMap[category] || ShoppingBag;
  
  return (
    // 'min-w-0' is critical to prevent flex-items from overflowing their container
    <div className="flex items-center gap-3 min-w-0 w-full group">
      <div className={`
        p-2 rounded-xl transition-colors duration-200
        ${type === 'income' ? 'bg-emerald-500/10' : 'bg-muted/80 group-hover:bg-muted'}
      `}>
        {type === "income" ? (
          <ArrowDownLeft className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
        ) : (
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-foreground/70" />
        )}
      </div>
      
      <div className="flex flex-col min-w-0 truncate">
        <span className="font-semibold text-sm md:text-base leading-tight truncate">
          {merchant}
        </span>
        <span className="text-[11px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {category}
        </span>
      </div>
    </div>
  );
};

export const AmountCell = ({ amount, type }: { amount: number, type: string }) => {
  const isIncome = type === "income";
  
  return (
    // Fluid typography using text sizes that scale slightly better
    <div className={`
      text-sm md:text-base font-bold tabular-nums whitespace-nowrap
      ${isIncome ? "text-emerald-500" : "text-foreground"}
    `}>
      {isIncome ? "+" : "-"} {formatCurrency(amount)}
    </div>
  );
};

export const InsightsCell = ({ labels }: { labels?: string[] }) => {
  if (!labels || labels.length === 0) return null;

  return (
    // 'flex-wrap' ensures badges don't break the table layout on small screens
    <div className="flex flex-wrap gap-1.5 max-w-[150px] md:max-w-none">
      {labels.map((label) => (
        <Badge 
          key={label} 
          variant="secondary" 
          className={`
            text-[9px] md:text-[10px] px-1.5 py-0 
            bg-primary/5 text-primary border-none font-semibold
            transition-all hover:bg-primary/10
          `}
        >
          {label}
        </Badge>
      ))}
    </div>
  );
};