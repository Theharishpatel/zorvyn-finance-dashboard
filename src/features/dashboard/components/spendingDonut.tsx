"use client"

import { useState } from "react" // ✅ Added useState
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_DATA } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Added AnimatePresence

export function SpendingDonut() {
  const data = MOCK_DATA.analytics.spendingBreakdown;
  
  // 1. Hover State: Pura object store karenge taaki label aur percentage dono mil sakein
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="h-full border-none bg-card/50 backdrop-blur-sm p-2 sm:p-4 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/70">
          Spending Breakdown
        </CardTitle>
      </CardHeader>
      
      <CardContent className="my-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-2">
          
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
                  onMouseEnter={onPieEnter} // ✅ Mouse enter handler
                  onMouseLeave={onPieLeave} // ✅ Mouse leave handler
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="hover:opacity-70 transition-all duration-300 cursor-pointer outline-none"
                      // Optional: thoda sa scale effect hover par
                      stroke={activeIndex === index ? entry.color : "none"}
                      strokeWidth={activeIndex === index ? 2 : 0}
                    />
                  ))}
                </Pie>
                {/* Tooltip ko hide bhi kar sakte ho agar center label hi kaafi hai */}
                <Tooltip cursor={false} content={() => null} wrapperStyle={{ display: 'none' }} /> 
              </PieChart>
            </ResponsiveContainer>
            
            {/* ✅ DYNAMIC CENTER LABEL */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex !== null ? data[activeIndex].category : "total"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-[10px] uppercase font-black text-muted-foreground opacity-50 tracking-widest">
                    {activeIndex !== null ? data[activeIndex].category : "Total"}
                  </span>
                  <span className="text-2xl font-black tracking-tighter text-foreground">
                    {activeIndex !== null ? `${data[activeIndex].percentage}%` : "100%"}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ✅ Side Legend (Matching the Hover) */}
          <div className="flex flex-col gap-3 w-full lg:pl-4">
            {data.map((item, index) => (
              <div 
                key={`legend-${index}`} 
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={cn(
                  "flex items-center justify-between group cursor-pointer transition-all duration-300",
                  activeIndex === index ? "scale-105" : "opacity-70 hover:opacity-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="h-2.5 w-2.5 rounded-full" 
                    style={{ backgroundColor: item.color, boxShadow: activeIndex === index ? `0 0 10px ${item.color}` : "none" }} 
                  />
                  <span className={cn(
                    "text-xs font-bold transition-colors",
                    activeIndex === index ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {item.category}
                  </span>
                </div>
                <span className="text-[10px] font-black text-foreground">
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

// Helper for class names (if not already imported)
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}