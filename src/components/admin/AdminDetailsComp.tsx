"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@prisma/client";

import { useState } from "react";
import AdminDetailsDialog from "./AdminDetailsDialog";

interface VendorDataType {
  name: string;
  id: string;
  email: string;
  password: string | null;
  phone: string | null;
  image: string | null;
  shopName: string | null;
  shopAddress: string | null;
  gstNumber: string | null;
  products: Product[];
}

export const AdminDetailsComp = ({
  vendorData,
}: {
  vendorData: VendorDataType[];
}) => {
  return (
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
                    {data.shopName}
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
                    {data.gstNumber}
                  </span>
                </div>
              </TableCell>

              <TableCell className="py-6 px-2 text-center">
                <AdminDetailsDialog products={data.products} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
