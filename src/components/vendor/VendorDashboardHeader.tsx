// components/vendor/DashboardHeader.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const VendorDashboardHeader = ({
  vendorName,
  email,
  status,
  image,
}: {
  vendorName: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  image: string | null;
}) => {
  const statusStyles = {
    approved: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="rounded-[32px] border border-zinc-800 bg-[#111113] p-6 mb-8 shadow-2xl shadow-black/40">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Profile Info Section */}
        <div className="flex items-center gap-5">
          <div className="relative h-20 w-20 shrink-0">
            {image ? (
              <div className="h-full w-full rounded-2xl overflow-hidden border-2 border-zinc-800 relative">
                <Image
                  src={image}
                  alt={vendorName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <Avatar className="h-20 w-20 border-2 border-amber-400 rounded-2xl shadow-lg shadow-amber-400/10">
                <AvatarFallback className="bg-zinc-900 text-amber-400 text-2xl font-black italic uppercase">
                  {vendorName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 border-4 border-[#111113] rounded-full" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
              {vendorName}
            </h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              {email}
            </p>
            <div className="flex gap-2 mt-2">
              <span
                className={`text-[9px] px-3 py-1 rounded-full border font-black uppercase tracking-wider ${statusStyles[status]}`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full md:w-auto">
          <Link href="/vendor/add-product" className="flex-1 md:flex-none">
            <button className="flex items-center gap-1 w-full bg-amber-400 text-black px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-300 transition-all active:scale-95 shadow-xl shadow-amber-400/10">
              <Plus size={15} /> Add Product
            </button>
          </Link>
          <Link href="/vendor/profile" className="flex-1 md:flex-none">
            <button className="w-full bg-zinc-900 text-zinc-100 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all border border-zinc-800 active:scale-95">
              Settings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
