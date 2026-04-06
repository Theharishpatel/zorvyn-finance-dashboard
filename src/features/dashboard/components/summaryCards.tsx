import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_DATA } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";


const icons = { primary: Wallet, success: TrendingUp, destructive: TrendingDown, blue: PiggyBank };
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;
export function SummaryCards() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {MOCK_DATA.summary.map((item) => {
        const Icon = icons[item.color as keyof typeof icons];
        return (
          <motion.div 
            key={item.id} 
            variants={itemVariants} 
            className="h-full flex"
          >
            <Card className="border-none bg-card/50 backdrop-blur-sm flex-1 flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  {item.label}
                </CardTitle>
                <Icon className={`h-4 w-4 text-${item.color}`} />
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="text-2xl font-bold">
                  ₹<AnimatedCounter value={item.value} />
                </div>
                
                {item.goal ? (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold">
                      <span>Goal: ₹{(item.goal/1000)}k</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} 
                        className="h-full bg-foreground" 
                      />
                    </div>
                  </div>
                ) : (
                  <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {item.change} from last month
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}