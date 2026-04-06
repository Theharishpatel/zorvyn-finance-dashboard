"use client";

import { motion } from "framer-motion"; // ✅ Motion import
import { BalanceChart } from "./balanceChart";
import { SpendingDonut } from "./spendingDonut";
import { cn } from "@/lib/utils";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Charts ke beech ka gap
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth flow
    } 
  },
} as const;

export function AnalyticsSection({ className }: { className?: string }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show" // ✅ Jab user scroll karke yahan aaye tabhi chale
      viewport={{ once: true, margin: "-100px" }}
      className={cn("w-full", className)}
    >
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7 w-full">
        
        {/* 1. BALANCE CHART (Line/Area Chart) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 w-full min-h-[350px] lg:min-h-[420px] group"
        >
          <div className="h-full w-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-1 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-border/80 group-hover:bg-card/60">
            <BalanceChart />
          </div>
        </motion.div>

        {/* 2. SPENDING DONUT (Donut/Pie Chart) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-3 w-full min-h-[350px] lg:min-h-[420px] group"
        >
          <div className="h-full w-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-1 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-border/80 group-hover:bg-card/60">
            <SpendingDonut />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}