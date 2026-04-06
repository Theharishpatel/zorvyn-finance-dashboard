"use client";

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { downloadAsCSV } from "../services/transactionServices";
import { Table } from "@tanstack/react-table";
import { Transaction } from "@/features/transactions/types";
import { format } from "date-fns"
import { getTransactions } from "../api/getTransactions.ts";
import { toast } from "sonner";


// --- 1. TERA ORIGINAL EXPORT LOGIC (UNCHANGED) ---
export const useTransactionExport = <TData>(table: Table<TData>) => {
  const handleExport = () => {
    const dataToExport = table.getFilteredRowModel().rows.map((row) => row.original);
    if (dataToExport.length > 0) {
      downloadAsCSV(dataToExport as object[], "zorvyn_transactions");
    } else {
      alert("No data available to export with current filters.");
    }
  };
  return { handleExport };
};

// --- 2. UPDATED TABLE HOOK (WITH LOCALSTORAGE) ---
export function useTransactionTable(columns: ColumnDef<Transaction, any>[], initialData?: Transaction[]) {
  const [data, setData] = React.useState<Transaction[]>(initialData || []);
  const [isLoading, setIsLoading] = React.useState(!initialData);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [date, setDate] = React.useState<Date | undefined>();

  // Helper function to sync state and localStorage
  const updateData = (newData: Transaction[]) => {
    try {
      setData(newData);
      localStorage.setItem("zorvyn_transactions", JSON.stringify(newData));
      
      // SUCCESS TOAST
      toast.success("Changes Saved", {
        description: "Transaction list has been updated successfully.",
      });
    } catch (error) {
      // ERROR TOAST
      toast.error("Update Failed", {
        description: "Unable to save changes. Please check your connection.",
      });
    }
  };

  React.useEffect(() => {
    // FIX: Agar Dashboard ne 5 rows bhej di hain, toh loading mat karo aur fetch skip karo
    if (initialData && initialData.length > 0) {
        setData(initialData);
        setIsLoading(false);
        return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const savedData = localStorage.getItem("zorvyn_transactions");
        if (savedData && JSON.parse(savedData).length > 0) {
          setData(JSON.parse(savedData));
        } else {
          const result = await getTransactions();
          setData(result);
          localStorage.setItem("zorvyn_transactions", JSON.stringify(result));
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [initialData]); // initialData change hone par re-run hoga

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility: { category: false },
    },
    // Meta passes the update functions to RowActions.tsx
    meta: {
      updateData,
      allData: data,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  // DATE FILTER LOGIC
  React.useEffect(() => {
    const dateColumn = table.getColumn("date");
    if (date) {
      dateColumn?.setFilterValue(format(date, "yyyy-MM-dd"));
    } else {
      dateColumn?.setFilterValue(undefined);
    }
  }, [date, table]);

  return { 
    table, 
    date, 
    setDate, 
    isLoading,
    updateData // Exporting this so you can use it anywhere
  };
}