import { MOCK_DATA } from "@/lib/mockData";
import { Transaction } from "@/features/transactions/types";

export const getTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data ko strictly Transaction[] ki tarah treat karne ke liye 'as Transaction[]' lagao
      const data = MOCK_DATA.transactions as Transaction[];
      resolve(data);
    }, 500);
  });
};