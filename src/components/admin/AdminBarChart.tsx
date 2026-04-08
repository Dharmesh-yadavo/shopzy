"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

interface VendorOrderData {
  name: string;
  orders: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// Custom Tooltip to match the new design
const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c1b14] border border-stone-800 p-2 px-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-600 mb-1">
          {payload[0].payload.name}
        </p>
        <p className="text-white font-bold text-sm">
          {payload[0].value}{" "}
          <span className="text-stone-600 font-medium">Orders</span>
        </p>
      </div>
    );
  }
  return null;
};

export const AdminBarChart = ({
  vendorData,
}: {
  vendorData: VendorOrderData[];
}) => {
  // Find the max value to highlight the top vendor
  const maxOrders = Math.max(...(vendorData || []).map((d) => d.orders));

  return (
    <Card className="bg-zinc-900/20 border-stone-800 rounded-3xl shadow-sm group">
      <CardHeader className="flex flex-row items-center justify-between pb-2 mx-6 px-0 pt-2">
        <CardTitle className="text-lg font-black uppercase text-stone-100 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-amber-400 rounded-full" />
          Vendor Performance
        </CardTitle>
        <p className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">
          {vendorData?.length || 0} Vendors
        </p>
      </CardHeader>

      <CardContent className="h-90 pt-4 pb-8 px-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={vendorData || []}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 600 }}
              dy={15}
              // Basic rotation to prevent overlap if names are long
              interval={0}
              angle={-25}
              textAnchor="end"
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(251, 191, 36, 0.03)" }}
            />

            <Bar dataKey="orders" radius={[10, 10, 0, 0]} barSize={45}>
              {vendorData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  // Dynamically fill the top vendor with Amber, others are subtle
                  fill={
                    entry.orders === maxOrders && entry.orders > 0
                      ? "#EAB308"
                      : "#2a2923"
                  }
                  className="hover:opacity-90 transition-opacity cursor-pointer outline-none"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
