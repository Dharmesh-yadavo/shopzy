"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Plus,
  //   Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import { toggleProductStatusAction } from "@/features/vendor/vendor.action";
import { toast } from "sonner";

interface ProductShowcaseProps {
  products: Product[];
}

export const ProductShowcasePage = ({
  products = [],
}: ProductShowcaseProps) => {
  //
  const handleIsActiveButton = async (
    productId: string,
    verificationStatus: "pending" | "approved" | "rejected",
    isActive: boolean | null,
  ) => {
    console.log("handleIsActiveButton ", verificationStatus, " ", isActive);
    if (verificationStatus === "pending") {
      toast.error("Product is not approved by Admin.");
    } else {
      await toggleProductStatusAction(productId, isActive);
    }
  };
  //
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
          <Link href="/vendor/add-product">
            <Button className="bg-amber-400 hover:bg-amber-300 text-black font-bold h-12 px-6 rounded-xl transition-all shadow-lg shadow-amber-400/10">
              <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> Add Product
            </Button>
          </Link>
        </div>

        <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/20 overflow-hidden">
          <Table className="w-full border-collapse">
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
                  Visibility
                </TableHead>
                <TableHead className="text-right text-zinc-500 font-bold uppercase text-[11px] tracking-widest py-6 px-8">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-zinc-800/50">
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-zinc-800/50 hover:bg-zinc-800/30 transition-all group"
                  >
                    {/* IMAGE CELL */}
                    <TableCell className="py-6 px-8">
                      <div className="group relative">
                        {/* Fixed 1:1 Aspect Ratio Container */}
                        <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-700 transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-sm">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.title}
                              width={100}
                              height={100}
                              className="object-fit p-1 rounded-sm transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                              <Package className="h-7 w-7 text-zinc-600 group-hover:text-amber-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* DETAILS CELL */}
                    <TableCell className="py-6 px-8">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                          {product.title.length > 30
                            ? `${product.title.slice(0, 30)}....`
                            : product.title}
                        </span>
                        <span className="text-xs text-zinc-500 mt-1 capitalize">
                          {product.category} • ID:{" "}
                          {product.id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                    </TableCell>

                    {/* PRICE CELL */}
                    <TableCell className="py-6 px-8">
                      <span className="text-amber-400 font-bold text-xl">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </TableCell>

                    {/* STATUS CELL */}
                    <TableCell className="py-6 px-8">
                      <Badge
                        className={`px-3 py-1 font-bold text-[10px] border ${
                          product.verificationStatus === "approved"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : product.verificationStatus === "rejected"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}
                      >
                        {product.verificationStatus?.toUpperCase() || "PENDING"}
                      </Badge>
                    </TableCell>

                    {/* VISIBILITY CELL */}
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-2">
                        {product.isActive ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-bold text-zinc-100">
                              Live
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-zinc-600" />
                            <span className="text-sm font-bold text-zinc-500">
                              Hidden
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tight">
                        {product.isActive
                          ? "Visible to customers"
                          : "Private Draft"}
                      </p>
                    </TableCell>

                    {/* ACTIONS CELL */}
                    <TableCell className="py-6 px-2 text-right">
                      <div className="flex justify-end items-center gap-3">
                        {/* EDIT BUTTON: Using a subtle Zinc Ghost style */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            redirect(`/vendor/edit-product/${product.id}`)
                          }
                          className="h-9 px-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700 hover:text-white hover:border-zinc-500 transition-all duration-200 shadow-sm"
                        >
                          <span className="text-xs font-semibold tracking-wide">
                            Edit
                          </span>
                        </Button>

                        {product.isActive ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleIsActiveButton(
                                product.id,
                                product.verificationStatus,
                                product.isActive,
                              )
                            }
                            className="h-9 px-4 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 group/btn"
                          >
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500 group-hover/btn:bg-white transition-colors" />
                              <span className="text-xs font-bold uppercase tracking-tighter">
                                Disable
                              </span>
                            </div>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleIsActiveButton(
                                product.id,
                                product.verificationStatus,
                                product.isActive,
                              )
                            }
                            className="h-9 px-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/70 hover:text-white transition-all duration-300 group/btn"
                          >
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 group-hover/btn:bg-white transition-colors" />
                              <span className="text-xs font-bold uppercase tracking-tighter">
                                Enable
                              </span>
                            </div>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-64 text-center text-zinc-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Package className="h-10 w-10 " />
                      <p>No products found in your inventory.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
