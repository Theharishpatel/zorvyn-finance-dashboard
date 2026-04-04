import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_DATA } from "@/lib/mockData";

import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

const icons = { primary: Wallet, success: TrendingUp, destructive: TrendingDown, blue: PiggyBank };

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {MOCK_DATA.summary.map((item) => {
        const Icon = icons[item.color as keyof typeof icons];
        return (
          <Card key={item.id} className="border-none bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase text-muted-foreground">{item.label}</CardTitle>
              <Icon className={`h-4 w-4 text-${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{item.value.toLocaleString()}</div>
              {item.goal ? (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-[10px] text-muted-foreground uppercase">
                    <span>Goal: ₹{(item.goal/1000)}k</span>
                    <span>{item.progress}% Filled</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full bg-blue-500`} style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ) : (
                <p className={`text-xs mt-1 ${item.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {item.change} from last month
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}