"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[] 
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 30, 50],
}: DataTablePaginationProps<TData>) {
  
  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = table.getPageCount()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4 w-full">
      
      {/* 1. LEFT SIDE: Current Page Status (Fluid text) */}
      <div className="flex items-center text-[11px] md:text-sm font-medium text-muted-foreground order-2 sm:order-1">
        Page <span className="mx-1 text-foreground">{pageIndex + 1}</span> of{" "}
        <span className="ml-1 text-foreground">{pageCount || 1}</span>
      </div>

      {/* 2. RIGHT SIDE: Controls Group */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 order-1 sm:order-2 w-full sm:w-auto">
        
        {/* ROWS PER PAGE SELECTOR: Label hide on very small screens */}
        <div className="flex items-center space-x-2">
          <p className="hidden xs:block text-[11px] md:text-xs font-medium text-muted-foreground">
            Rows per page
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[65px] md:w-[70px] bg-muted/40 border-none text-[11px] md:text-xs hover:bg-muted/60 transition-colors">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="min-w-[70px] backdrop-blur-xl">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`} className="text-xs ">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* NAVIGATION CONTROLS: Fluid buttons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 md:px-3 text-[11px] md:text-xs font-medium transition-all active:scale-95 disabled:opacity-40"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-3.5 w-3.5 md:mr-1" />
            <span className="hidden md:inline">Previous</span>
          </Button>

          {/* Current Page Bubble */}
          <div className="flex items-center justify-center h-8 w-8 md:w-9 text-[11px] md:text-xs font-bold bg-primary/10 rounded-lg text-primary border border-primary/20 shadow-inner">
            {pageIndex + 1}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 md:px-3 text-[11px] md:text-xs font-medium transition-all active:scale-95 disabled:opacity-40"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="h-3.5 w-3.5 md:ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}