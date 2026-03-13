// components/vendor/DashboardHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const VendorDashboardHeader = ({
  vendorName,
  email,
}: {
  vendorName: string;
  email: string;
}) => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-amber-400">
            <AvatarImage src="" />
            <AvatarFallback className="bg-zinc-800 text-white text-xl uppercase font-bold">
              {vendorName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-white leading-none mb-1">
              {vendorName}
            </h1>
            <p className="text-zinc-500 text-sm font-medium">{email}</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-amber-400/10 text-amber-400 text-[10px] px-2 py-0.5 rounded-full border border-amber-400/20 font-bold uppercase">
                Pro Vendor
              </span>
              <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20 font-bold uppercase">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar (Yellow UI style) */}
        <div className="flex gap-3">
          <button className="bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-300 transition-colors">
            + Add Product
          </button>
          <button className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-700 transition-colors border border-zinc-700">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};
