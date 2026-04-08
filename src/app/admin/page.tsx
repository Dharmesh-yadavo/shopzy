import { AdminBarChart } from "@/components/admin/AdminBarChart";
import { AdminPieChart } from "@/components/admin/AdminPieChart";
import StatsCard from "@/components/admin/StatsCard";
import { adminDashboardContent } from "@/features/admin/admin.query";

export default async function AdminDashboard() {
  const data = await adminDashboardContent();

  const statsData = {
    totalVendors: data?.totalVendors,
    pendingVendors: data?.pendingVendors,
    totalProducts: data?.totalProducts,
    pendingProducts: data?.pendingProducts,
    totalOrders: data?.totalOrders,
    totalEarnings: data?.totalRevenue,
  };

  console.log("Data", data);
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
      <StatsCard data={statsData} />

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminBarChart vendorData={data?.vendorData || []} />
        {/*  */}
        <AdminPieChart data={data?.orderStatusData || []} />
      </div>
    </div>
  );
}
