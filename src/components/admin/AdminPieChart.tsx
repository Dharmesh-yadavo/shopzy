"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PieDataType {
  status: string;
  count: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
}

const STATUS_COLORS: Record<string, string> = {
  delivered: "#10b981",
  pending: "#fbbf24",
  confirmed: "#6366f1",
  cancelled: "#ef4444",
  shipped: "#0ea5e9",
};

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 p-2 px-3 rounded-lg shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
          {payload[0].name}
        </p>
        <p className="text-white font-bold text-sm">
          {payload[0].value}{" "}
          <span className="text-zinc-500 font-medium">Orders</span>
        </p>
      </div>
    );
  }
  return null;
};

export const AdminPieChart = ({ data }: { data: PieDataType[] }) => {
  // Calculate total for the center display
  const totalOrders = data.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="w-full bg-zinc-900/20 border border-stone-800 rounded-3xl shadow-xl overflow-hidden">
      <CardHeader className="pb-2 pt-2 px-6">
        <CardTitle className="text-lg font-black uppercase text-stone-100 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-amber-400 rounded-full" />
          Order Status
        </CardTitle>
      </CardHeader>

      {/* CRITICAL: We set a fixed height on this div so ResponsiveContainer 
        knows how large to draw the SVG 
      */}
      <CardContent className="h-90 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              nameKey="status"
              dataKey="count"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={8}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] ||
                    "#52525b"
                  }
                  className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value) => (
                <span className="text-[11px] font-bold uppercase tracking-tighter text-zinc-500 ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-4xl font-black italic tracking-tighter text-white leading-none">
            {totalOrders}
          </span>
          <span className="text-[10px] uppercase text-stone-500 font-black tracking-[0.2em] mt-1">
            Total
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
