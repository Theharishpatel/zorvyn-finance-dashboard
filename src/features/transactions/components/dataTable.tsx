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
  const {role} = useAuthStore();

  if (isLoading) return <DataTableSkeleton />;

  return (
    <div className="w-full space-y-4">
      {/* TOOLBAR: Responsive padding */}
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

      {/* 1. SCROLL CONTAINER: 
          'overflow-x-auto' scroll enable karega.
          'selection-none' taaki scroll karte waqt text select na ho jaye.
      */}
      <div className="relative rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          {/* 2. MIN-WIDTH LOGIC: 
              'min-w-[800px]' ensure karta hai ki columns mobile par pichkenge nahi.
              Ye 800px tabhi trigger hoga jab screen choti hogi.
          */}
          <Table className="min-w-[850px] w-full border-collapse">
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-transparent border-border/40"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 px-4 text-[11px] uppercase font-bold text-muted-foreground tracking-tight"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-border/20 hover:bg-primary/[0.02] transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-4 px-4 align-middle whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-40 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PAGINATION: Mobile par stack na ho isliye responsive flex use kiya hai */}
      {showPagination && (
        <div className="overflow-x-auto pb-2">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}

// Chota sa loading skeleton
function DataTableSkeleton() {
  return (
    <div className="space-y-4 w-full animate-pulse">
      <div className="h-10 w-full bg-muted/20 rounded-lg" />
      <div className="h-[400px] w-full bg-muted/10 rounded-xl border border-border/50" />
    </div>
  );
}
