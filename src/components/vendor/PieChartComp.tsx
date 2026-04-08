"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PieDataType {
  status: string;
  count: number;
}

// Define specific colors for your order statuses
const STATUS_COLORS: Record<string, string> = {
  delivered: "#10b981", // Emerald-500
  pending: "#fbbf24", // Amber-400
  confirmed: "#6366f1", // Indigo-500
  cancelled: "#ef4444", // Red-500
  shipped: "#0ea5e9", // Sky-500
};

const CustomTooltip = ({ active, payload }: any) => {
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

export const PieChartComp = ({ data }: { data: PieDataType[] }) => {
  return (
    <div className="w-full h-90 bg-zinc-900/20 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            nameKey="status"
            dataKey="count"
            cx="50%"
            cy="50%"
            innerRadius={70} // Makes it a Donut Chart
            outerRadius={100}
            paddingAngle={5} // Adds gaps between slices
            stroke="none" // Removes white border
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
              <span className="text-[11px] font-bold uppercase tracking-tighter text-zinc-400 ml-1">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
