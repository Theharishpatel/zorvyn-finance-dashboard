"use client";

import { useState } from "react";
import { Row, Table } from "@tanstack/react-table";
import { Pencil, Trash2, Save, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Transaction } from "../types";
import { toast } from "sonner"; // ✅ Toast Import

// UI Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function RowActions({ row, table }: { row: Row<Transaction>; table: Table<Transaction> }) {
  const { role } = useAuthStore();
  const transaction = row.original;
  
  const [merchant, setMerchant] = useState(transaction.merchant);
  const [amount, setAmount] = useState(transaction.amount.toString());

  if (role !== "admin") return null;

  const meta = table.options.meta as any;

  // --- 1. HANDLE UPDATE WITH TOAST ---
  const handleUpdate = () => {
    if (!meta) return;
    
    const updatedData = meta.allData.map((item: Transaction) => 
      item.id === transaction.id 
        ? { ...item, merchant: merchant, amount: Number(amount) } 
        : item
    );

    meta.updateData(updatedData);

    // ✅ Success Toast for Update
    toast.success("Transaction Updated", {
      description: `Successfully updated ${merchant} to ₹${amount}.`,
    });
  };

  // --- 2. HANDLE DELETE WITH UNDO TOAST ---
  const handleDelete = () => {
    if (!meta) return;
    
    const oldData = [...meta.allData]; // Backup for Undo
    const filteredData = meta.allData.filter((item: Transaction) => item.id !== transaction.id);
    
    meta.updateData(filteredData);

    // ✅ Error/Destructive Toast for Delete with Undo Action
    toast.error("Transaction Deleted", {
      description: `${transaction.merchant} has been removed from your records.`,
      action: {
        label: "Undo",
        onClick: () => {
          meta.updateData(oldData);
          toast.success("Restored!", { 
            description: "The transaction has been successfully restored.",
            icon: <Undo2 className="h-4 w-4" /> 
          });
        },
      },
    });
  };

  return (
    <div className="flex items-center gap-1">
      
      {/* --- EDIT POPUP --- */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>Update merchant or amount below.</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="merchant" className="text-right text-xs">Merchant</Label>
              <Input 
                id="merchant" 
                value={merchant} 
                onChange={(e) => setMerchant(e.target.value)} 
                className="col-span-3 h-9"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right text-xs">Amount</Label>
              <Input 
                id="amount" 
                type="number"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="col-span-3 h-9"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleUpdate} className="w-full sm:w-auto gap-2 font-bold">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- DELETE CONFIRMATION --- */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete transaction for <span className="font-bold text-foreground">{transaction.merchant}</span>? 
              This action is permanent but can be undone via notification.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-rose-500 hover:bg-rose-600 font-bold"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

