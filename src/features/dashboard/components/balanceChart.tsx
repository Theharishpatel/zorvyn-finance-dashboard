"use client"
import { useState, useMemo } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // Assuming Shadcn button setup
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils"

// Custom black tooltip to match Image 1
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-foreground border border-slate-700 p-3 rounded-md text-xs text-background">
        <p className="font-semibold mb-1">{data.displayDate}</p>
        <div className="flex gap-3">
          <p><span className="inline-block w-2 h-2 rounded-full bg-[#1e40af] mr-1"></span> Income</p>
          <p className="font-mono">{payload[0].value.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex gap-3">
          <p><span className="inline-block w-2 h-2 rounded-full bg-[#525252] mr-1"></span> Expense</p>
          <p className="font-mono">{payload[1].value.toLocaleString('en-IN')}</p>
        </div>
      </div>
    );
  }
  return null;
};

export function BalanceChart() {
  const [range, setRange] = useState<'7D' | '30D' | '3M'>('3M');

  const filteredData = useMemo(() => {
    const days = range === '7D' ? 7 : range === '30D' ? 30 : 90;
    return MOCK_DATA.analytics.timeline.slice(-days);
  }, [range]);

  return (
    <Card className="col-span-4 border-none bg-card/50 backdrop-blur-sm p-4 sm:p-6 text-white rounded-2xl h-full">
      {/* Target Image Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-muted-foreground font-semibold">Financial Trend</CardTitle>
          
        </CardHeader>
        {/* Responsive Toggle Group */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl w-full sm:w-auto border border-border/20">
          {['7D', '30D', '3M'].map((f) => (
            <button
              key={f}
              onClick={() => setRange(f as any)}
              className={cn(
                "flex-1 sm:flex-none px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all",
                range === f 
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border/50" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={filteredData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          {/* Subtle grid lines matching image 1 */}
          <CartesianGrid strokeDasharray="1 1" strokeOpacity={0.1} vertical={false} stroke="#2a2a2a" />
          
          <XAxis 
            dataKey="axisLabel" 
            tick={{ fill: '#64748b' }} 
            axisLine={false} 
            tickLine={false} 
            fontSize={10}
            interval={0}
          />
          
          <YAxis hide={true} domain={[0, 'auto']} />

          {/* Premium black Tooltip with custom active dots */}
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#555', strokeWidth: 1 }} 
          />
          
          {/* LAYER 1: Income (Top Blue Area) */}
          <Area 
            type="monotone" // Smooth, curved lines
            dataKey="income" // Use Income key
            stackId="1" // CRITICAL: This enables stacking
            stroke="#5f5b5b" // Deep blue stroke
            fill="#5f5b5b" // Deep blue fill
            fillOpacity={0.6} // Reduced opacity like image 1
            activeDot={{ r: 4, stroke: 'white', strokeWidth: 2, fill: '#1e40af' }}
          />
          
          {/* LAYER 2: Expense (Bottom Gray Area) */}
          <Area 
            type="monotone" 
            dataKey="expense" 
            stackId="1" // CRITICAL: Same stackId value
            stroke="#525252" // Deep gray stroke
            fill="#525252" // Deep gray fill
            fillOpacity={0.4} 
            activeDot={{ r: 4, stroke: 'white', strokeWidth: 2, fill: '#525252' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}