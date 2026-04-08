import React from "react";
import {
  AlertOctagon,
  ClipboardList,
  LucideIcon,
  Package,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface StatItems {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  trendColor?: string;
  iconBg: string;
  highlight: boolean;
}

interface StatsDataType {
  totalVendors: number | undefined;
  pendingVendors: number | undefined;
  totalProducts: number | undefined;
  pendingProducts: number | undefined;
  totalOrders: number | undefined;
  totalEarnings: number | undefined;
}

const StatsCard = ({ data }: { data: StatsDataType }) => {
  const formattedEarnings = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // Set to 2 if you want to show paisa
  }).format(data.totalEarnings ?? 0);

  const statDetails: StatItems[] = [
    {
      icon: Users,
      label: "Total Vendors",
      value: `${data.totalVendors}`,
      trend: "+2%",
      trendColor: "text-green-400", // Added default trend color
      iconBg: "bg-blue-500/20 text-blue-400",
      highlight: false,
    },
    {
      icon: ClipboardList,
      label: "Pending Vendors",
      value: `${data.pendingVendors}`,
      trend: "+5%",
      trendColor: "text-green-400",
      iconBg: "bg-yellow-500/20 text-yellow-400",
      highlight: false,
    },
    {
      icon: Package,
      label: "Total Products",
      value: `${data.totalProducts}`,
      trend: "-1%",
      trendColor: "text-red-400",
      iconBg: "bg-purple-500/20 text-purple-400",
      highlight: false,
    },
    {
      icon: AlertOctagon,
      label: "Pending Products",
      value: `${data.pendingVendors}`,
      trend: "-10%",
      trendColor: "text-red-400",
      iconBg: "bg-orange-500/20 text-orange-400",
      highlight: false,
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: `${data.totalOrders}`,
      trend: "+12%",
      trendColor: "text-green-400",
      iconBg: "bg-teal-500/20 text-teal-400",
      highlight: false,
    },
    {
      icon: Wallet,
      label: "Total Earnings",
      value: formattedEarnings,
      trend: "+18%",
      trendColor: "text-green-400",
      iconBg: "bg-yellow-500/20 text-yellow-400",
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statDetails.map((data) => {
        // Correctly reference the icon component
        const Icon = data.icon;

        return (
          <Card
            key={data.label}
            className={cn(
              "bg-[#1c1b14] border-stone-800 p-5 relative overflow-hidden transition-all hover:border-stone-700",
              data.highlight && "border-yellow-500/40",
            )}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={cn("p-2.5 rounded-xl", data.iconBg)}>
                <Icon size={22} />
              </div>
              <span
                className={cn(
                  "text-[10px] font-black px-2 py-0.5 rounded-md bg-black/40",
                  data.trendColor || "text-green-400",
                )}
              >
                {data.trend}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">
                {data.label}
              </p>
              <h3
                className={cn(
                  "text-2xl font-black tracking-tight",
                  data.highlight ? "text-yellow-400" : "text-white",
                )}
              >
                {data.value}
              </h3>
            </div>

            {data.highlight && (
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-500/10 blur-[30px] rounded-full" />
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCard;
