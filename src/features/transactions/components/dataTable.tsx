"use client";

import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "./tableToolbar";
import { DataTablePagination } from "./tablePagination";
import { Transaction } from "@/features/transactions/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  useTransactionExport,
  useTransactionTable,
} from "../hooks/useTransaction";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

// ✅ Naye Imports
import { SearchX, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DataTable({
  columns,
  data: initialData,
  showPagination = true,
  showToolbar = true,
}: {
  columns: ColumnDef<Transaction, any>[];
  data?: Transaction[];
  showToolbar?: boolean;
  showPagination?: boolean;
}) {
  // ✅ Hook se 'table' ke saath filters bhi nikalo
  const { table, date, setDate, isLoading } = useTransactionTable(
    columns,
    initialData,
  );
  
  const { handleExport } = useTransactionExport(table);
  const { role } = useAuthStore();

  // Filter state access karne ke liye (Empty state logic)
  const isFiltered = table.getState().columnFilters.length > 0 || !!table.getState().globalFilter;

  if (isLoading) return <DataTableSkeleton />;

  return (
    <div className="w-full space-y-4">
      {showToolbar && (
        <div className="px-1 overflow-x-auto pb-2 md:pb-0">
          <DataTableToolbar
            table={table}
            date={date}
            setDate={setDate}
            onExport={handleExport}
          />
        </div>
      )}

      <div className="relative rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <Table className="min-w-[850px] w-full border-collapse">
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-border/40">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="h-12 px-4 text-[11px] uppercase font-bold text-muted-foreground tracking-tight">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="border-border/20 hover:bg-primary/[0.02] transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4 px-4 align-middle whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                /* --- 🚀 ENHANCED EMPTY STATE --- */
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-[450px] text-center border-none">
                    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                      <div className="bg-muted/30 p-6 rounded-full mb-6 ring-8 ring-muted/10">
                        <SearchX className="h-12 w-12 text-muted-foreground/40" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-foreground">No Transactions Found</h3>
                      <p className="text-sm text-muted-foreground max-w-[320px] mx-auto mt-2 leading-relaxed">
                        {isFiltered 
                          ? "We couldn't find any results matching your current filters. Try adjusting your search." 
                          : "Your transaction list is currently empty. Start by adding a new record!"}
                      </p>
                      
                      {isFiltered && (
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="mt-6 font-bold h-9 px-4 gap-2 border border-border/50 hover:bg-muted"
                          onClick={() => table.resetColumnFilters()}
                        >
                          <XCircle className="h-4 w-4" /> Reset All Filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {showPagination && (
        <div className="overflow-x-auto pb-2">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}

function DataTableSkeleton() {
  return (
    <div className="space-y-4 w-full animate-pulse p-4">
      <div className="h-10 w-full bg-muted/20 rounded-lg" />
      <div className="h-[400px] w-full bg-muted/10 rounded-xl border border-border/50" />
    </div>
  );
}