"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import { Label } from "../ui/label";
import { updateProductStatusAction } from "@/features/admin/admin.action";
import { toast } from "sonner"; // Added for better UX
import { Loader2 } from "lucide-react";

// --- TYPES ---
interface ProductTableType {
  id: string;
  vendorId?: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  isWearable: boolean | null;
  size: string[];
  hasColours: boolean;
  replacementDays: number | null;
  warranty: string | null;
  freeDelivery: boolean | null;
  payOnDelivery: boolean | null;
  images: string[];
  variants: {
    colorName: string;
    imageUrl: string;
  }[];
  detailsPoints: string[];
  createdAt: Date | null;
  approvedAt: Date | null;
  verificationStatus: "pending" | "approved" | "rejected";
}

export const ProductApproval = ({
  products,
}: {
  products: ProductTableType[];
}) => {
  const [search, setSearch] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductTableType | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  // IMPROVED: Filter the actual passed products prop
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, products]);

  const handleApprove = async (productId: string) => {
    try {
      setIsPending(true);
      const res = await updateProductStatusAction({
        productId,
        data: "approved",
      });

      if (res?.success) {
        toast.success("Product approved successfully");
        setIsViewDetailsOpen(false);
      } else {
        toast.error(res?.error || "Failed to approve product");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  const confirmRejection = async () => {
    if (!selectedProduct) return;
    try {
      setIsPending(true);
      const res = await updateProductStatusAction({
        productId: selectedProduct.id,
        data: "rejected",
        reason: rejectionReason,
      });

      if (res?.success) {
        toast.success("Product rejected");
        setIsRejectDialogOpen(false);
        setRejectionReason("");
        setSelectedProduct(null);
      } else {
        toast.error("Failed to reject product");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  const openRejectDialog = (product: ProductTableType) => {
    setSelectedProduct(product);
    setIsRejectDialogOpen(true);
  };

  const openViewDetails = (product: ProductTableType) => {
    setSelectedProduct(product);
    setIsViewDetailsOpen(true);
  };

  return (
    <div className="p-8 space-y-6 bg-[#0f0e0a] min-h-screen text-stone-200">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight italic">
            Product <span className="text-amber-500 underline">Requests</span>
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Review and manage product submissions from your vendors.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#1c1b14] border border-stone-800 rounded-xl px-4 py-2 w-full md:w-96 shadow-inner">
          <AiOutlineSearch className="text-stone-500 text-lg" />
          <Input
            placeholder="Search by name, ID, or category..."
            className="bg-transparent border-none focus-visible:ring-0 text-sm h-6 placeholder:text-stone-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-[#1c1b14] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-stone-900/80">
            <TableRow className="border-stone-800 hover:bg-transparent">
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest py-5">
                Product
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Price
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Category
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Date
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Status
              </TableHead>
              <TableHead className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">
                Approved Date
              </TableHead>
              <TableHead className="text-right text-stone-400 font-bold uppercase text-[10px] tracking-widest pr-10">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((request) => (
                <TableRow
                  key={request.id}
                  className="border-stone-800 hover:bg-stone-900/40 transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4 ml-2">
                      <div className="relative  overflow-hidden rounded-lg border border-stone-700 bg-stone-800">
                        <Image
                          src={request.images[0] || "/placeholder.png"}
                          alt={request.title}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white leading-none">
                          {request.title}
                        </p>
                        <p className="text-[10px] text-stone-500 mt-1 uppercase tracking-tighter">
                          ID: {request.id!.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-bold text-amber-500/90 italic">
                    ₹{request.price.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-stone-900 border-stone-700 text-stone-400 font-normal px-3"
                    >
                      {request.category.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-stone-400">
                    {new Date(request.createdAt!).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                        request.verificationStatus === "pending"
                          ? "bg-amber-500/5 text-amber-500 border-amber-500/20"
                          : request.verificationStatus === "approved"
                            ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                            : "bg-red-500/5 text-red-500 border-red-500/20"
                      }`}
                    >
                      {request.verificationStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-stone-400">
                    {request.approvedAt
                      ? new Date(request.approvedAt).toLocaleDateString()
                      : request.verificationStatus === "rejected"
                        ? "Rejected"
                        : "Not Approved"}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    {request.verificationStatus === "pending" ? (
                      <Button
                        disabled={isPending}
                        variant="outline"
                        onClick={() => openViewDetails(request)}
                        className="border-amber-500/30 bg-amber-500/5 text-amber-400 hover:bg-amber-500 hover:text-black text-[11px] h-8 font-bold transition-all"
                      >
                        Review Request
                      </Button>
                    ) : (
                      <p className="text-sm text-stone-600 italic">
                        No action needed
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-stone-500 italic"
                >
                  No products found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- View Details Dialog --- */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-amber-500 text-xl font-black italic uppercase tracking-tighter">
              Reviewing Product Details
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-6 py-4">
            <div className="col-span-1 relative h-32 w-full rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900">
              <Image
                src={selectedProduct?.images[0] || ""}
                alt="preview"
                fill
                className="object-fill"
              />
            </div>
            <div className="col-span-2 space-y-3 text-sm">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-600 font-bold">
                  Product Title
                </span>
                <span className="text-zinc-200">{selectedProduct?.title}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-600 font-bold">
                  Pricing
                </span>
                <span className="text-amber-500 font-bold text-lg">
                  ₹{selectedProduct?.price.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-zinc-600 font-bold">
                  Description
                </span>
                <span className="text-zinc-400 text-[12px] line-clamp-3 leading-relaxed italic">
                  {selectedProduct?.description}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between items-center gap-4 border-t border-zinc-900 pt-6">
            <Button
              variant="ghost"
              className="text-zinc-500 hover:text-white"
              onClick={() => setIsViewDetailsOpen(false)}
            >
              Close
            </Button>

            <div className="flex gap-2">
              <Button
                disabled={isPending}
                onClick={() => handleApprove(selectedProduct?.id || "")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-6 font-bold rounded-lg"
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Approve Product"
                )}
              </Button>

              <Button
                disabled={isPending}
                onClick={() => {
                  setIsViewDetailsOpen(false);
                  setTimeout(() => openRejectDialog(selectedProduct!), 100);
                }}
                variant="destructive"
                className="bg-red-500/10 text-red-500 border border-red-500/50 text-xs px-4 hover:bg-red-500 hover:text-white transition-all"
              >
                Reject
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Rejection Dialog --- */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500">Submit Rejection</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="reason"
                className="text-zinc-400 text-xs uppercase font-bold"
              >
                Why are you rejecting this product?
              </Label>
              <Input
                id="reason"
                placeholder="e.g. Blurry images, prohibited item, etc."
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-1 focus:ring-red-500"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsRejectDialogOpen(false)}
              className="text-zinc-500"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmRejection}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
              disabled={isPending || !rejectionReason.trim()}
            >
              {isPending ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Confirm Rejection"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
