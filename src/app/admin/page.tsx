"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import StatsCard from "@/components/admin/StatsCard";

interface VendorOrderData {
  name: string;
  orders: number;
}

interface StatusDistributionData {
  name: string;
  value: number;
  color: string;
}

// --- MOCK DATA ---

const vendorData: VendorOrderData[] = [
  { name: "SAMSUNG", orders: 4 },
  { name: "LG", orders: 12 },
  { name: "NIKE", orders: 7 },
  { name: "SONY", orders: 3 },
  { name: "APPLE", orders: 9 },
];

const statusData: StatusDistributionData[] = [
  { name: "Approved", value: 10, color: "#EAB308" },
  { name: "Cancelled", value: 2, color: "#EF4444" },
  { name: "Returned", value: 2, color: "#3F3F3F" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0f0e0a] text-stone-200 p-8 space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-stone-400 mt-1 italic">
            Welcome back,{" "}
            <span className="text-yellow-400 font-semibold">Dharmesh</span>.
            Here&apos;s a snapshot of your platform&apos;s performance.
          </p>
        </div>
      </div>

      {/* STATS GRID (6 Columns) */}
      <StatsCard />

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor-wise Orders Bar Chart */}
        <Card className="bg-[#1c1b14] border-stone-800 rounded-2xl shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-white">
              Vendor-wise Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#78716c", fontSize: 11 }}
                  dy={10}
                />
                <Bar dataKey="orders" radius={[6, 6, 0, 0]} barSize={40}>
                  {vendorData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 1 ? "#EAB308" : "#2a2923"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Donut Chart */}
        <Card className="bg-[#1c1b14] border-stone-800 rounded-2xl shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-white">
              Order Status Distribution
            </CardTitle>
            <Button
              variant="link"
              className="text-yellow-500 p-0 h-auto text-xs"
            >
              View List
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-around h-80">
            <div className="relative w-80 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">14</span>
                <span className="text-[10px] uppercase text-stone-500 font-bold tracking-[0.2em]">
                  Total
                </span>
              </div>
            </div>
            <div className="space-y-4 mt-6 sm:mt-0">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-stone-400 font-medium">
                    {item.name}{" "}
                    <span className="text-white ml-1">({item.value})</span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
