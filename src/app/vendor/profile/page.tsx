import { getCurrentUser } from "@/features/auth/auth.queries";
import VendorProfileComp from "@/components/vendor/VendorProfileComp";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/");

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#09090b] text-white p-6 md:p-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          Settings<span className="text-amber-400">.</span>
        </h1>
        <p className="text-zinc-500 text-sm font-medium">
          Manage your store identity and legal business information.
        </p>
      </div>

      <VendorProfileComp vendor={user} />
    </div>
  );
};

export default ProfilePage;
