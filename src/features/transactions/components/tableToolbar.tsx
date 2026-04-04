"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { X, Calendar as CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExportButton } from "./exportButton"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  onExport: () => void
}

export function DataTableToolbar<TData>({
  table,
  date,
  setDate,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || date !== undefined

  return (
    <div className="flex flex-col gap-4 py-4 w-full">
      {/* TOP ROW: Search & Category (Main Filters) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
        
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
          {/* 1. SEARCH: Icon ke saath fluid width */}
          <div className="relative w-full sm:max-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search merchants..."
              value={(table.getColumn("merchant")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("merchant")?.setFilterValue(event.target.value)}
              className="h-9 pl-9 w-full bg-muted/40 border-none focus-visible:ring-1 text-sm transition-all"
            />
          </div>

          {/* 2. CATEGORY SELECT: Mobile par search ke niche, Desktop par side mein */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select
              value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
              onValueChange={(value) => {
                const column = table.getColumn("category");
                if (column) column.setFilterValue(value === "all" ? "" : value);
              }}
            >
              <SelectTrigger className="h-9 w-full sm:w-[140px] bg-muted/40 border-none text-xs font-medium">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>

            {/* 3. RESET BUTTON: Sirf mobile par side mein aayega */}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => {
                  table.resetColumnFilters()
                  setDate(undefined)
                }}
                className="h-9 px-2 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 sm:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* BOTTOM/RIGHT ROW: Date & Export */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-1 sm:pt-0">
          
          {/* 4. DATE PICKER: Fluid width on mobile */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                size="sm"
                className={`h-9 text-[11px] md:text-xs flex-1 sm:flex-none justify-start text-left font-medium border-none bg-muted/40 min-w-[140px] sm:w-[160px] ${!date && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-3.5 w-3.5 opacity-70" />
                {date ? format(date, "MMM dd, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          {/* 5. EXPORT BUTTON: Custom logic already in the component */}
          <ExportButton table={table} />

          {/* RESET BUTTON: Desktop view */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters()
                setDate(undefined)
              }}
              className="hidden sm:flex h-9 px-3 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50"
            >
              Reset <X className="ml-2 h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}