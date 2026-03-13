// components/vendor/StatsGrid.tsx
import { Users, Package, ShoppingCart, IndianRupee } from "lucide-react";

const stats = [
  {
    label: "CUSTOMERS",
    value: "3",
    icon: Users,
    progress: 30,
    color: "text-blue-400",
  },
  {
    label: "PRODUCTS",
    value: "3",
    icon: Package,
    progress: 15,
    color: "text-amber-400",
  },
  {
    label: "ORDERS",
    value: "8",
    icon: ShoppingCart,
    progress: 60,
    color: "text-green-400",
  },
  {
    label: "SALES",
    value: "₹ 480,970",
    icon: IndianRupee,
    progress: 85,
    color: "text-purple-400",
  },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-xl hover:bg-zinc-900 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-zinc-500 text-[10px] font-bold tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stat.value}
              </h3>
            </div>
            <stat.icon className={`h-5 w-5 ${stat.color} opacity-80`} />
          </div>
          {/* Simple CSS Visual indicator (Replacement for Graphs) */}
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div
              className={`h-full bg-amber-400 transition-all duration-1000`}
              style={{ width: `${stat.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
