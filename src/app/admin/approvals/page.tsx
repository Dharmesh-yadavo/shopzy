import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const VendorApprovalPage = () => {
  const requests = [
    {
      id: 1,
      vendorName: "Priya Sharma",
      shopName: "Urban Threads",
      phone: "9123456780",
      status: "Pending",
    },
    {
      id: 2,
      vendorName: "Rahul Verma",
      shopName: "Gadget Galaxy",
      phone: "9887766554",
      status: "Pending",
    },
  ];

  return (
    <div className="flex flex-col w-full h-fit bg-[#000000] text-white p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Vendor Approval Requests
        </h1>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 overflow-hidden shadow-2xl">
        <Table className="w-full">
          <TableHeader className="bg-zinc-900/40">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-bold py-5 px-6 text-[12px]">
                Vendor Name
              </TableHead>
              <TableHead className="text-zinc-400 font-bold py-5 px-6 text-[12px]">
                Shop Name
              </TableHead>
              <TableHead className="text-zinc-400 font-bold py-5 px-6 text-[12px]">
                Phone
              </TableHead>
              <TableHead className="text-zinc-400 font-bold py-5 px-6 text-[12px] text-center">
                Status
              </TableHead>
              <TableHead className="text-zinc-400 font-bold py-5 px-6 text-[12px] text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <TableRow
                  key={request.id}
                  className="border-zinc-800/50 hover:bg-zinc-800/20 transition-all"
                >
                  <TableCell className="py-6 px-6 font-medium text-zinc-100">
                    {request.vendorName}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-zinc-300">
                    {request.shopName}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-zinc-400 font-mono text-xs">
                    {request.phone}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-center">
                    <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-6 px-6 text-center">
                    <div className="flex justify-center gap-3">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 px-4">
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        className="bg-red-600/20 text-red-500 hover:bg-red-600/30 border border-red-600/50 text-xs h-8 px-4"
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Empty State matching your screenshot
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-20 text-center text-zinc-500 text-sm italic"
                >
                  No Pending Vendor Requests
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VendorApprovalPage;
