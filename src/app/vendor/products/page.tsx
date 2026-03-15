// app/vendor/products/page.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddProductModal } from "@/components/vendor/AddProductModal";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-row flex-1 w-full bg-black/10 text-white">
      <div className="px-6 py-6 space-y-6 w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Products</h1>
            <p className="text-zinc-500 text-sm">
              Manage and optimize your store inventory.
            </p>
          </div>
          <AddProductModal />
        </div>

        {/* Filter Bar matching the reference UI */}
        <div className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
            >
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button
              variant="outline"
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" /> Sort: Newest
            </Button>
          </div>
          <span className="text-zinc-500 text-xs font-medium">
            Showing <span className="text-white">24</span> of{" "}
            <span className="text-white">128</span> products
          </span>
        </div>

        {/* Full-Width Table Container */}
        <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/20 overflow-hidden">
          <Table className="w-full h-full border-collapse ">
            <TableHeader className="bg-zinc-900/60 border-b border-zinc-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-zinc-500 font-bold uppercase text-[11px] tracking-widest py-6 px-8">
                  Image
                </TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[11px] tracking-widest py-6 px-8">
                  Product Details
                </TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[11px] tracking-widest py-6 px-8">
                  Price
                </TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[11px] tracking-widest py-6 px-8">
                  Status
                </TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[11px] tracking-widest py-6 px-8">
                  Stock
                </TableHead>
                <TableHead className="text-right text-zinc-500 font-bold uppercase text-[11px] tracking-widest py-6 px-8">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-zinc-800/50">
              <TableRow className="border-zinc-800/50 hover:bg-zinc-800/30 transition-all group">
                <TableCell className="py-6 px-8">
                  <div className="h-16 w-16 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center transition-transform group-hover:scale-105">
                    <Package className="h-7 w-7 text-zinc-600 group-hover:text-amber-400" />
                  </div>
                </TableCell>
                <TableCell className="py-6 px-8">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-zinc-100 group-hover:text-amber-400 transition-colors">
                      Premium Headphones X-Series
                    </span>
                    <span className="text-xs text-zinc-500 mt-1">
                      Electronics • SKU: WH-9920
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-8">
                  <span className="text-amber-400 font-bold text-xl">
                    ₹14,999
                  </span>
                </TableCell>
                <TableCell className="py-6 px-8">
                  <Badge className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 font-bold text-[10px]">
                    APPROVED
                  </Badge>
                </TableCell>
                <TableCell className="py-6 px-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-zinc-200 underline decoration-amber-400 decoration-2 underline-offset-4">
                      42
                    </span>
                    <div className="w-24 h-1 bg-zinc-800 rounded-full">
                      <div className="h-full bg-amber-400 w-1/2 rounded-full" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-2 text-right">
                  <div className="flex justify-end gap-2 text-zinc-500">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-800 border-green-700 text-white hover:bg-green-700"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-800 border-red-700 text-white hover:bg-red-700"
                    >
                      Disable
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
