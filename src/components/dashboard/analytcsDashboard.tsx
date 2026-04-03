
import { BalanceChart } from "./balanceChart";
import { SpendingDonut } from "./spendingDonut";



export function AnalyticsSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-7">
      <div className="lg:col-span-4">
        <BalanceChart />
      </div>
      <div className="lg:col-span-3">
        <SpendingDonut />
      </div>
    </div>
  );
}