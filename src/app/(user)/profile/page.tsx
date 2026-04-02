import { getCurrentUser } from "@/features/auth/auth.queries";
import { redirect } from "next/navigation";
import { Package, ShoppingCart } from "lucide-react";
import { getDetailsOfUser } from "@/features/user/user.query";
import { UserProfile } from "@/components/user/UserProfile";

export default async function UserProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const details = await getDetailsOfUser(user.id);

  return (
    <div className="flex flex-col max-w-6xl mx-auto min-h-screen bg-[#050505] text-white p-6 md:p-10 space-y-10">
      {/* 1. Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/50 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic leading-none">
            My Account<span className="text-yellow-400">.</span>
          </h1>
          <p className="text-zinc-500 text-xs font-semibold tracking-wide uppercase">
            Welcome back,{" "}
            <span className="text-zinc-200">{user.name.split(" ")[0]}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <StatBadge
            icon={<Package size={14} />}
            label="Orders"
            value={details?.order.length || 0}
          />
          <StatBadge
            icon={<ShoppingCart size={14} />}
            label="In Cart"
            value={details?.cart.length || 0}
          />
        </div>
      </header>

      {/*  */}
      <UserProfile user={user} />
    </div>
  );
}

const StatBadge = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | undefined;
}) => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 px-4 py-2.5 rounded-xl flex items-center gap-3">
      <div className="text-yellow-400">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-wider leading-none">
          {label}
        </span>
        <span className="text-base font-black leading-none mt-1">{value}</span>
      </div>
    </div>
  );
};
