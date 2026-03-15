import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/vendor/VendorSideBar";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

const Vendorlayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (user?.role !== "vendor") {
    redirect("/");
  }

  if (!user.phone || !user.role) {
    redirect("/");
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
