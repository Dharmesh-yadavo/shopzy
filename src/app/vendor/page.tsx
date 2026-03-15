import { AlertSection } from "@/components/vendor/AlertSection";
import { StatsGrid } from "@/components/vendor/StatsGrid";
import { VendorDashboardHeader } from "@/components/vendor/VendorDashboardHeader";

const VendorHome = async () => {
  return (
    <div className="flex flex-col flex-1 w-full min-h-screen p-4 lg:p-8">
      {/* 1. Header with detailed vendor info */}
      <VendorDashboardHeader
        vendorName="LG Electronics"
        email="problemgamer2502@gmail.com"
      />

      {/* 2. Stats Grid with visual progress bars */}
      <StatsGrid />

      {/* 3. Urgent notifications & Quick sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default VendorHome;
