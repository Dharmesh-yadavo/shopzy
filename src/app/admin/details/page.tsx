import { AdminDetailsComp } from "@/components/admin/AdminDetailsComp";
import { getAllVendors } from "@/features/admin/admin.query";

const AdminDetailsPage = async () => {
  const res = await getAllVendors();

  console.log("Vendors List: ", res);

  if (!res) return [];

  return (
    <div className="flex flex-col w-full h-fit bg-[#09090b] text-white p-8 space-y-6">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Approved Vendors
          </h1>
        </div>
      </div>

      {/* Vendor Details Table */}
      <AdminDetailsComp vendorData={res} />
    </div>
  );
};

export default AdminDetailsPage;
