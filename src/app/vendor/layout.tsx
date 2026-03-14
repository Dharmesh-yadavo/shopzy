import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/vendor/VendorSideBar";

const Vendorlayout = ({ children }: { children: React.ReactNode }) => {
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
