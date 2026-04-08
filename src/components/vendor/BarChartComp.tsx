"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LegendPayload,
} from "recharts";

interface DataType {
  date: string;
  count: number;
  revenue: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; color: string }>;
  label?: string;
}

// Styled Custom Tooltip to match your Dark UI
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg shadow-2xl backdrop-blur-md">
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">
          {label}
        </p>
        <div className="space-y-1">
          <p className="text-amber-400 text-sm font-bold">
            Revenue:{" "}
            <span className="text-white">
              ₹{payload[1]?.value.toLocaleString()}
            </span>
          </p>
          <p className="text-indigo-400 text-sm font-bold">
            Items Sold: <span className="text-white">{payload[0]?.value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const BarChartComp = ({ data }: { data: DataType[] }) => {
  return (
    <div className="w-full h-90 bg-zinc-900/20 border border-zinc-800 p-6 rounded-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#27272a"
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 10, fontWeight: 600 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 10, fontWeight: 600 }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            content={({ payload }) => (
              <div className="flex justify-end gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {payload?.map((entry: LegendPayload, index: number) => (
                  <div key={index} className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    {entry.value || ""}
                  </div>
                ))}
              </div>
            )}
          />

          {/* Bar for Quantity */}
          <Bar
            name="Items Sold"
            dataKey="count"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            barSize={0}
          />

          {/* Bar for Revenue */}
          <Bar
            name="Total Revenue"
            dataKey="revenue"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            barSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComp;
