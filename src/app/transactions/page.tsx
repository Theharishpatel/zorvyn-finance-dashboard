import {
  columns
} from "@/features/transactions/components/columns";
import { DataTable } from "@/features/transactions/components/dataTable";
import { MOCK_DATA } from "@/lib/mockData";
import {Transaction} from '@/types'
export default function TransactionsPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Recent Transactions
        </h1>
        <p className="text-muted-foreground">
          Detailed history of your income and expenses.
        </p>
      </div>

      <DataTable
        columns={columns}
      />
    </div>
  );
}
