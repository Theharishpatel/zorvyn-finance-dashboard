
import { Badge } from "@/components/ui/badge"
import { MOCK_DATA } from "@/lib/mockData"

export function TransactionTable() {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted/50 text-muted-foreground">
            <th className="p-3 text-left font-medium">DATE</th>
            <th className="p-3 text-left font-medium">MERCHANT</th>
            <th className="p-3 text-left font-medium">CATEGORY</th>
            <th className="p-3 text-right font-medium">AMOUNT</th>
            <th className="p-3 text-center font-medium">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_DATA.transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-muted/20 hover:bg-muted/5 transition-colors">
              <td className="p-3 text-muted-foreground">{tx.date}</td>
              <td className="p-3 font-medium">{tx.merchant}</td>
              <td className="p-3">
                <span className="bg-muted px-2 py-1 rounded-md text-[10px] uppercase font-semibold">
                  {tx.category}
                </span>
              </td>
              <td className={`p-3 text-right font-bold ${tx.type === 'income' ? 'text-success' : ''}`}>
                {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
              </td>
              <td className="p-3 text-center">
                <Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'} className="text-[10px]">
                  {tx.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}