"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_DATA } from "@/lib/mockData";


export function SpendingDonut() {
  const data = MOCK_DATA.analytics.spendingBreakdown;

  return (
    <Card className="h-full border-none bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
          SPENDING BREAKDOWN [DONUT CHART]
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="h-65 w-75 ">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="percentage"
                >
                  {/* FIX 1: Cell ke liye unique key */}
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: "oklch(var(--card))", borderRadius: "8px", border: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {/* FIX 2: List item ke liye index based key */}
            {data.map((item, index) => (
              <div key={`legend-${index}`} className="flex items-center justify-between mx-5 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.category}</span>
                </div>
                <span className="font-bold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}