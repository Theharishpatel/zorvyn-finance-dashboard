
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
      // Separate keys needed for stacked areas (like image 1)
      income: 30000 + Math.floor(Math.random() * 20000), // Larger layered value
      expense: 10000 + Math.floor(Math.random() * 10000), // Smaller baseline value
    });
  }
  return points;
};


export const MOCK_DATA = {
  user: {
    name: "Harry Patel",
    email: "harish.p@zorvyn.com",
    avatar: "/avatars/harish.png",
    role: "admin", // Toggle ke liye: 'admin' | 'viewer'
    joinedDate: "2026-01-15",
    preferences: {
      currency: "INR",
      theme: "dark",
      notifications: true
    }
  },

  //  Summary Cards Section
  summary: [
    { id: "s1", label: "TOTAL BALANCE", value: 54250.00, change: "+5.2%", trend: "up", color: "primary" },
    { id: "s2", label: "INCOME", value: 85000.00, change: "+12.1%", trend: "up", color: "success" },
    { id: "s3", label: "EXPENSES", value: 30750.00, change: "-2.5%", trend: "down", color: "destructive" },
    { id: "s4", label: "SAVINGS", value: 24250.00, goal: 30000, progress: 78, color: "blue" }
  ],

  //  Analytics & Visualization
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

  // Transactions (Detailed View)
  transactions: [
    {
      id: "tx_001",
      date: "2026-04-01",
      merchant: "Starbucks India",
      category: "Food",
      amount: 120.50,
      type: "expense",
      status: "Completed",
      paymentMethod: "UPI (HDFC Bank)",
      isRecurring: false,
      aiLabels: ["Frequent Spend"],
      audit: { createdBy: "System", modifiedBy: "admin_harish", modifiedAt: "2026-04-01T10:00:00Z" }
    },
    {
      id: "tx_002",
      date: "2026-03-31",
      merchant: "Salary Credit",
      category: "Income",
      amount: 45000.00,
      type: "income",
      status: "Completed",
      paymentMethod: "NEFT",
      isRecurring: true,
      aiLabels: ["Monthly Primary"],
      audit: { createdBy: "Zorvyn_HR", modifiedBy: "system", modifiedAt: "2026-03-31T09:00:00Z" }
    },
    {
      id: "tx_003",
      date: "2026-04-02",
      merchant: "AWS Cloud",
      category: "Bills",
      amount: 2450.00,
      type: "expense",
      status: "Pending",
      paymentMethod: "Credit Card (....8821)",
      isRecurring: true,
      aiLabels: ["Critical Subscription", "High Usage"],
      audit: { createdBy: "System", modifiedBy: "n/a", modifiedAt: "2026-04-02T14:30:00Z" }
    }
  ],

//   // PPO Feature: AI Insights (GapMatch-AI Integration hint)
//   aiInsights: [
//     { id: "i1", text: "You could save ₹500 by cancelling unused subscriptions.", type: "saving" },
//     { id: "i2", text: "Estimated balance at month-end: ₹62,000 based on your spending history.", type: "forecast" },
//     { id: "i3", text: "Cloud Services spending is 15% higher than last month.", type: "alert" }
//   ]
};