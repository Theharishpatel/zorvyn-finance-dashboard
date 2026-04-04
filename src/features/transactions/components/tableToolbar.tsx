"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogTrigger, DialogFooter, DialogClose 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table } from "@tanstack/react-table"
import { X, Calendar as CalendarIcon, Search, Plus, Save } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExportButton } from "./exportButton"
import { useAuthStore } from "@/features/auth/store/useAuthStore"

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
  const { role } = useAuthStore()
  const isFiltered = table.getState().columnFilters.length > 0 || date !== undefined
  
  // Accessing update functions from Table Meta
  const meta = table.options.meta as any

  // 1. ADD TRANSACTION STATE
  const [newMerchant, setNewMerchant] = useState("")
  const [newAmount, setNewAmount] = useState("")

  const handleAdd = () => {
    if (!newMerchant || !newAmount) return

    const newEntry = {
      id: `manual-${Math.random().toString(36).substr(2, 9)}`,
      merchant: newMerchant,
      amount: Number(newAmount),
      date: format(new Date(), "yyyy-MM-dd"), // Today's date
      type: Number(newAmount) >= 0 ? "income" : "expense",
      category: "Other",
      status: "Completed",
      aiLabels: ["Manual Entry"]
    }

    if (meta?.updateData && meta?.allData) {
      meta.updateData([newEntry, ...meta.allData]) // Naya entry top par add karo
      setNewMerchant("")
      setNewAmount("")
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
        
        {/* LEFT SECTION: Search & Filters */}
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
          <div className="relative w-full sm:max-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Transactions..."
              value={(table.getColumn("merchant")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("merchant")?.setFilterValue(event.target.value)}
              className="h-9 pl-9 w-full bg-muted/40 border-none focus-visible:ring-1 text-sm transition-all"
            />
          </div>

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
              <SelectContent className="backdrop-blur-xl">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>

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

        {/* RIGHT SECTION: Date, Export & Add Transaction */}
        <div className="flex items-center justify-between  sm:justify-end gap-2 w-full sm:w-auto pt-1 sm:pt-0">
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                size="sm"
                className={`h-9 text-[11px]  md:text-xs flex-1 sm:flex-none justify-start text-left font-medium border-none bg-muted/40 min-w-[140px] sm:w-[160px] ${!date && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-3.5 w-3.5 opacity-70" />
                {date ? format(date, "MMM dd, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto backdrop-blur-xl p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <ExportButton table={table} />

          {/* --- UPDATED ADD TRANSACTION DIALOG --- */}
          {role === "admin" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="h-9 px-3 text-xs gap-2 bg-foreground hover:bg-foreground/70 text-background shadow-lg shadow-foreground/20 transition-all active:scale-95"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Transaction</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="merchant" className="text-xs">Merchant Name</Label>
                    <Input 
                      id="merchant" 
                      placeholder="e.g., Apple Store" 
                      value={newMerchant}
                      onChange={(e) => setNewMerchant(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount" className="text-xs">Amount ($)</Label>
                    <Input 
                      id="amount" 
                      type="number"
                      placeholder="e.g., 120 or -50" 
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={handleAdd} className="w-full gap-2">
                      <Save className="h-4 w-4" /> Save Transaction
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters()
                setDate(undefined)
              }}
              className="hidden sm:flex h-9 px-3 text-xs text-foreground  hover:bg-rose-50"
            >
              Reset <X className="ml-2 h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}