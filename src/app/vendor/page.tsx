import BarChartComp from "@/components/vendor/BarChartComp";
import { PieChartComp } from "@/components/vendor/PieChartComp";
import { StatsGrid } from "@/components/vendor/StatsGrid";
import { VendorDashboardHeader } from "@/components/vendor/VendorDashboardHeader";
import { getCurrentUser } from "@/features/auth/auth.queries";
import {
  barChartContent,
  pieChartContent,
  vendorStats,
} from "@/features/vendor/vendor.queries";
import { redirect } from "next/navigation";

const VendorHome = async () => {
  const vendor = await getCurrentUser();

  if (!vendor) redirect("/login");

  const stats = await vendorStats(vendor.id);

  const barData = await barChartContent(vendor.id);

  const pieData = await pieChartContent(vendor.id);

  console.log("PieData", pieData);

  if (!stats) redirect("/login");

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen p-4 lg:p-8">
      {/* 1. Header with detailed vendor info */}
      <VendorDashboardHeader
        vendorName={vendor.name}
        email={vendor.email}
        status={vendor.verificationStatus}
        image={vendor.image}
      />

      {/* 2. Stats Grid with visual progress bars */}
      <StatsGrid stats={stats} />

      {/* 3. Urgent notifications & Quick sections */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AlertSection />
        </div>
        <div className="bg-amber-400/5 border border-amber-400/10 p-6 rounded-xl">
          <h3 className="text-amber-400 font-bold mb-2">Vendor Tip 💡</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Your electronics are trending! Offering a{" "}
            <span className="text-amber-400 font-bold">5% discount</span> could
            increase your sales by 12% this week.
          </p>
        </div>
      </div> */}

      {/* Barcharts:  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {/* Order-By-Date Bar Graph */}
        {barData && <BarChartComp data={barData} />}

        {/*  */}
        {pieData && <PieChartComp data={pieData} />}
      </div>
    </div>
  );
};

export default VendorHome;
