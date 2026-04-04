// src/features/transactions/components/exportButton.tsx

"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { useTransactionExport } from "../hooks/useTransaction";

interface ExportButtonProps<TData> {
  table: Table<TData>;
}

export function ExportButton<TData>({ table }: ExportButtonProps<TData>) {
  const { handleExport } = useTransactionExport(table);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className={`h-9 w-9 md:w-auto md:h-9 gap-2 px-0 md:px-3 text-xs font-medium border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md
      `}
      title="Export as CSV"
    >
      <Download className="h-4 w-4 md:h-3.5 md:w-3.5" />
      
      {/* 5. Responsive Text: Mobile par sirf icon, MD screen se text dikhega */}
      <span className="hidden md:inline-block">Export CSV</span>
    </Button>
  );
}