
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

import { Transaction } from "@/types";
import { format } from "date-fns"
import { getTransactions } from "../api/getTransactions.ts";
export const useTransactionExport = <TData>(table: Table<TData>) => {
  const handleExport = () => {
    // Get only the currently filtered and sorted rows from the table
    const dataToExport = table.getFilteredRowModel().rows.map((row) => row.original);

    if (dataToExport.length > 0) {
      downloadAsCSV(dataToExport as object[], "zorvyn_transactions");
    } else {
      alert("No data available to export with current filters.");
    }
  };

  return { handleExport };
};

export function useTransactionTable(columns: ColumnDef<Transaction, any>[],initialData?: Transaction[]) {
  // 1. STATES
  const [data, setData] = React.useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = React.useState(!initialData);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [date, setDate] = React.useState<Date | undefined>();

  // 2. FETCH DATA FROM API LAYER
  React.useEffect(() => {
    // Agar initialData pehle se hai, toh API call skip karo
    if (initialData) {
      setData(initialData);
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await getTransactions();
        setData(result);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [initialData]); // initialData change hone par re-run

  // 3. TABLE INSTANCE
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility:{
        category: false
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // 4. DATE FILTER LOGIC
  React.useEffect(() => {
    const dateColumn = table.getColumn("date");
    if (date) {
      dateColumn?.setFilterValue(format(date, "yyyy-MM-dd"));
    } else {
      dateColumn?.setFilterValue(undefined);
    }
  }, [date, table]);

  // 5. EXPORT LOGIC (Merged here for convenience)


  return { 
    table, 
    date, 
    setDate, 
    isLoading, // UI ko batane ke liye ki data loading hai
     
  };
}

