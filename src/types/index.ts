export type Transaction = {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  status: "Completed" | "Pending";
  aiLabels?: string[]; // Ensure karo ki yahan 'string[]' likha ho
};