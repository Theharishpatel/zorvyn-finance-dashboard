// Helper to generate dates
const generateTimeSeriesData = (days: number) => {
  const points = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    points.push({
      dateObj: d,
      displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      axisLabel: d.getDate() === 1 || d.getDate() === 15 ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
      income: 30000 + Math.floor(Math.random() * 20000),
      expense: 10000 + Math.floor(Math.random() * 10000),
    });
  }
  return points;
};

// 🔥 NEW: Random Transactions Generator
const generateTransactions = (count: number) => {
  const merchants = [
    "Starbucks India",
    "Amazon",
    "Flipkart",
    "Swiggy",
    "Zomato",
    "Uber",
    "Netflix",
    "AWS Cloud",
    "Electricity Bill",
    "Salary Credit"
  ];

  const categories = ["Food", "Shopping", "Travel", "Bills", "Entertainment", "Income"];
  const paymentMethods = [
    "UPI (HDFC Bank)",
    "Credit Card (....8821)",
    "Debit Card",
    "NEFT",
    "Cash"
  ];

  const transactions = [];

  for (let i = 0; i < count; i++) {
    const isIncome = Math.random() > 0.7;

    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    transactions.push({
      id: `tx_${String(i + 1).padStart(3, "0")}`,
      date: date.toISOString().split("T")[0],
      merchant: isIncome ? "Salary Credit" : merchants[Math.floor(Math.random() * merchants.length)],
      category: isIncome ? "Income" : categories[Math.floor(Math.random() * (categories.length - 1))],
      amount: isIncome
        ? 30000 + Math.floor(Math.random() * 50000)
        : 100 + Math.floor(Math.random() * 5000),
      type: isIncome ? "income" : "expense",
      status: Math.random() > 0.1 ? "Completed" : "Pending",
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      isRecurring: Math.random() > 0.7,
      aiLabels: isIncome
        ? ["Monthly Primary"]
        : ["Frequent Spend", Math.random() > 0.5 ? "High Usage" : ""].filter(Boolean),
      audit: {
        createdBy: "System",
        modifiedBy: "system",
        modifiedAt: new Date().toISOString()
      }
    });
  }

  return transactions;
};

export const MOCK_DATA = {
  user: {
    name: "Harry Patel",
    email: "harish.p@zorvyn.com",
    avatar: "/avatars/harish.png",
    role: "admin",
    joinedDate: "2026-01-15",
    preferences: {
      currency: "INR",
      theme: "dark",
      notifications: true
    }
  },

  summary: [
    { id: "s1", label: "TOTAL BALANCE", value: 54250.00, change: "+5.2%", trend: "up", color: "primary" },
    { id: "s2", label: "INCOME", value: 85000.00, change: "+12.1%", trend: "up", color: "success" },
    { id: "s3", label: "EXPENSES", value: 30750.00, change: "-2.5%", trend: "down", color: "destructive" },
    { id: "s4", label: "SAVINGS", value: 24250.00, goal: 30000, progress: 78, color: "blue" }
  ],

  analytics: {
    timeline: generateTimeSeriesData(90),
    spendingBreakdown: [
      { category: "Food", percentage: 25, color: "oklch(0.65 0.22 41)" },
      { category: "Rent", percentage: 35, color: "oklch(0.60 0.12 185)" },
      { category: "Bills", percentage: 15, color: "oklch(0.40 0.07 227)" },
      { category: "Travel", percentage: 15, color: "oklch(0.82 0.19 84)" },
      { category: "Others", percentage: 10, color: "oklch(0.77 0.19 70)" }
    ]
  },

  // 🔥 UPDATED: Dynamic Transactions
  transactions: generateTransactions(1000),

};