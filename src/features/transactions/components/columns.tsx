"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Transaction } from "@/types"
import { TransactionCell, AmountCell, InsightsCell } from "./cellComponents"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "merchant",
    header: () => <span className="pl-2">Transaction</span>,
    cell: ({ row }) => <TransactionCell {...row.original} />,
    // Merchant column thoda bada rakhenge kyunki isme icon + text hai
    size: 280, 
    minSize: 200,
  },
  {
    accessorKey: "category",
    header: "Category",
    // Isse UI mein dikhana hai toh generic style dedo
    cell: ({ row }) => (
      <span className="text-xs font-medium text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
        {row.getValue("category")}
      </span>
    ),
    size: 120,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-mono">
        <AmountCell amount={row.original.amount} type={row.original.type} />
      </div>
    ),
    size: 110,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      // 'whitespace-nowrap' is key: date kabhi break nahi hogi
      <span className="text-[11px] md:text-xs text-muted-foreground whitespace-nowrap">
        {row.getValue("date")}
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: "aiLabels",
    header: "Insights",
    cell: ({ row }) => (
      <div className="max-w-[180px]">
        <InsightsCell labels={row.original.aiLabels} />
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge 
        variant={row.getValue("status") === "Completed" ? "outline" : "secondary"} 
        className="text-[9px] md:text-[10px] uppercase font-bold tracking-tighter"
      >
        {row.getValue("status")}
      </Badge>
    ),
    size: 100,
  },
]