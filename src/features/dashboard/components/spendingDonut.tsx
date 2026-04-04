"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function SpendingDonut() {
  const data = MOCK_DATA.analytics.spendingBreakdown;

  return (
    <Card className="h-full  border-none bg-card/50 backdrop-blur-sm p-2 sm:p-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
          Spending Breakdown
        </CardTitle>
      </CardHeader>
      
      <CardContent className="my-auto " >
        {/* Container: Mobile par column, Large screen par row */}
        <div className="flex  flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-2">
          
          {/* Chart Wrapper: Aspect ratio maintains circular shape without fixed width */}
          <div className="relative w-full aspect-square max-w-[220px] sm:max-w-[250px] lg:max-w-[200px] xl:max-w-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="90%"
                  paddingAngle={6}
                  dataKey="percentage"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="hover:opacity-80  transition-opacity outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderRadius: "12px", 
                    border: "1px solid hsl(var(--border))",
                    fontSize: "12px"
                  }}
                  itemStyle={{ fontWeight: "bold" }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label (Optional Premium Touch) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-muted-foreground opacity-50">Total</span>
              <span className="text-lg font-extrabold tracking-tighter">100%</span>
            </div>
          </div>

          {/* Legend: Full width on mobile, auto width on desktop */}
          <div className="flex flex-col gap-2.5 w-full lg:pl-4">
            {data.map((item, index) => (
              <div 
                key={`legend-${index}`} 
                className="flex items-center justify-between group cursor-default"
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="h-2.5 w-2.5 rounded-full shadow-sm" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.category}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold tabular-nums">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}