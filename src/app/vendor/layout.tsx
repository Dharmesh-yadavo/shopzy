import { SidebarProvider } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/vendor/VendorSideBar";

const Vendorlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <VendorSidebar />
      <section>{children}</section>
    </SidebarProvider>
  );
};

export default Vendorlayout;
