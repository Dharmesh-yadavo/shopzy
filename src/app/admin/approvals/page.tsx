import { VendorApprovalTable } from "@/components/admin/VendorApprovalTable";
import { getAllVendors } from "@/features/vendor/vendor.queries";

const VendorApprovalPage = async () => {
  const vendors = await getAllVendors();
  console.log("Admin Vendors Data", vendors);

  return (
    <div className="flex flex-col w-full h-fit bg-[#000000] text-white p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Vendor Approval Requests
        </h1>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 overflow-hidden shadow-2xl">
        <VendorApprovalTable vendors={vendors} />
      </div>
    </div>
  );
};

export default VendorApprovalPage;
