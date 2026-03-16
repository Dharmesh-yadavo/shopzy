import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AdminDetailsPage = () => {
  const vendorData = [
    {
      id: 1,
      name: "SAMSUNG STORE",
      shop: "Samsung",
      phone: "1234567890",
      gst: "06AAACS5123K1ZH",
    },
    {
      id: 2,
      name: "LG Electronics",
      shop: "LG Electronics",
      phone: "1234567890",
      gst: "07AAACL1745Q1Z6",
    },
    {
      id: 3,
      name: "Nike",
      shop: "Nike",
      phone: "9876543210",
      gst: "29AABCN9612K1Z3",
    },
    {
      id: 4,
      name: "Apple Premium Reseller",
      shop: "Imagine",
      phone: "9988776655",
      gst: "27AAECA1234B1Z5",
    },
    {
      id: 5,
      name: "Adidas Performance",
      shop: "Adidas",
      phone: "8877665544",
      gst: "19AAACA5678C1Z2",
    },
    {
      id: 6,
      name: "Sony Center",
      shop: "Sony",
      phone: "7766554433",
      gst: "09AAACS9012D1Z9",
    },
  ];
  return (
    <div className="flex flex-col w-full h-fit bg-[#09090b] text-white p-8 space-y-6">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Approved Vendors
          </h1>
        </div>
      </div>

      <div className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900/20 overflow-hidden shadow-2xl">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-zinc-900/60">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500 font-bold py-6 px-8 uppercase text-[10px] tracking-widest">
                Name
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest">
                Shop
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest">
                Phone
              </TableHead>
              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest text-center">
                GST
              </TableHead>

              <TableHead className="text-zinc-500 font-bold py-6 uppercase text-[10px] tracking-widest text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {vendorData.map((data) => (
              <TableRow
                key={data.id}
                className="border-zinc-800/50 hover:bg-zinc-800/40 transition-all group"
              >
                <TableCell className="py-8 px-8 font-mono text-amber-400 font-bold">
                  {data.name}
                </TableCell>

                <TableCell className="py-8">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {data.shop}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-8 max-w-[320px]">
                  <span className="text-sm text-zinc-300 font-medium leading-relaxed">
                    {data.phone}
                  </span>
                </TableCell>

                <TableCell className="py-8 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[11px] font-medium text-white">
                      {data.gst}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-6 px-2 text-center">
                  <div className="flex justify-center gap-2 text-zinc-500">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-amber-300 border-amber-400 text-black hover:bg-amber-400"
                    >
                      Check Products
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDetailsPage;
