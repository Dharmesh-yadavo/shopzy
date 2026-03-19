import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import EditVendorDetails from "@/components/vendor/EditVendorDetails";
import { VendorSidebar } from "@/components/vendor/VendorSideBar";
import { VerificationStatus } from "@/components/vendor/VerificationStatus";
import { getCurrentUser } from "@/features/auth/auth.queries";
import { getAllVendors } from "@/features/vendor/vendor.queries";
import { redirect } from "next/navigation";

const Vendorlayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  console.log("Vendor User: ", user);

  if (!user) redirect("/login");

  if (user.role !== "vendor") redirect("/");

  const vendors = await getAllVendors();

  console.log("vendors: ", vendors);

  if (
    user?.role === "vendor" &&
    (!user.shopName || !user.shopAddress || !user.gstNumber)
  ) {
    return <EditVendorDetails />;
  }

  if (user?.role === "vendor" && user.verificationStatus === "pending") {
    return <VerificationStatus status="pending" />;
  }

  if (user?.role === "vendor" && user.verificationStatus === "rejected") {
    return (
      <VerificationStatus
        status="rejected"
        reason={user?.rejectedReason}
        vendor={user}
      />
    );
  }

  return (
    <SidebarProvider>
      <VendorSidebar />
      <section className="flex-1 flex flex-col min-h-screen overflow-x-hidden p-2">
        <SidebarTrigger className="hover:bg-amber-400" />
        {children}
      </section>
    </SidebarProvider>
  );
};

export default Vendorlayout;
