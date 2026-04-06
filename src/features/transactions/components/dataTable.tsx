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
import { motion, AnimatePresence } from "framer-motion";

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
 
  const { table, date, setDate, isLoading } = useTransactionTable(
    columns,
    initialData,
  );
  
  const { handleExport } = useTransactionExport(table);
  const { role } = useAuthStore();

  // Filter state to access (Empty state logic)
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

      <div className="relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <Table className="min-w-[850px] w-full border-collapse">
            <TableHeader className="bg-muted/30 sticky top-0 z-10 backdrop-blur-md">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-border/40">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="h-14 px-6 text-[10px] uppercase font-black text-muted-foreground/60 tracking-[0.1em]">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <AnimatePresence mode="popLayout">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.03, 
                        ease: "easeOut" 
                      }}
                      className="group border-border/20 hover:bg-primary/[0.03] transition-colors cursor-default"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4 px-6 align-middle whitespace-nowrap">
                          <div className="transition-transform duration-300 group-hover:translate-x-1">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))
                ) : (
                  
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-[500px] text-center border-none">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20"
                      >
                        <div className="relative mb-8">
                          <div className="absolute inset-0 bg-muted/20 rounded-full blur-3xl animate-pulse" />
                          <div className="relative bg-muted/40 p-8 rounded-full ring-1 ring-border/50">
                            <SearchX className="h-16 w-16 text-muted-foreground/30" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-black tracking-tight text-foreground">No matches found</h3>
                        <p className="text-sm text-muted-foreground max-w-[340px] mx-auto mt-3 font-medium leading-relaxed">
                          {isFiltered 
                            ? "We couldn't find anything for your current filters. Maybe try something broader?" 
                            : "Your financial history looks a bit quiet. Time to add some data!"}
                        </p>
                        
                        {isFiltered && (
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="mt-8 font-bold h-11 px-8 rounded-xl gap-2 border-border/50 hover:bg-muted hover:scale-105 transition-all active:scale-95"
                            onClick={() => table.resetColumnFilters()}
                          >
                            <XCircle className="h-4 w-4" /> Clear All Filters
                          </Button>
                        )}
                      </motion.div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
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