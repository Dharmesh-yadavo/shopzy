"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateVendorStatusAction } from "@/features/admin/admin.action";

interface VendorsDataType {
  name: string;
  id: string;
  email: string;
  phone: string | null;
  verificationStatus: "pending" | "approved" | "rejected";
  isApproved: boolean | null;
  shopName: string | null;
  shopAddress: string | null;
  gstNumber: string | null;
}

export const VendorApprovalTable = ({
  vendors,
}: {
  vendors: VendorsDataType[];
}) => {
  // State to control the dialog and store the specific vendor being rejected
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<VendorsDataType | null>(
    null,
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  const handleApprove = async (vendorId: string) => {
    setIsPending(true);
    console.log("Approving vendor:", vendorId);
    const value = "approved";
    await updateVendorStatusAction({ vendorId, data: value });
    setIsViewDetailsOpen(false);
    setIsPending(false);
  };

  const openRejectDialog = (vendor: VendorsDataType) => {
    setIsPending(true);
    setSelectedVendor(vendor);
    setIsRejectDialogOpen(true);
    setIsPending(false);
  };

  const openViewDetails = (vendor: VendorsDataType) => {
    setSelectedVendor(vendor);
    setIsViewDetailsOpen(true);
  };

  const confirmRejection = async () => {
    if (!selectedVendor) return;

    setIsPending(true);

    const reason = rejectionReason;

    await updateVendorStatusAction({
      vendorId: selectedVendor.id,
      data: "rejected",
      reason,
    });

    setIsRejectDialogOpen(false);
    setSelectedVendor(null);
    setRejectionReason("");
    setIsPending(false);
  };

  return (
    <>
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
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <TableRow
                  key={vendor.id}
                  className="border-zinc-800/50 hover:bg-zinc-800/20 transition-all"
                >
                  <TableCell className="py-6 px-6 font-medium text-zinc-100">
                    {vendor.name}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-zinc-300">
                    {vendor.shopName}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-zinc-400 font-mono text-xs">
                    {vendor.phone}
                  </TableCell>
                  <TableCell className="py-6 px-6 text-center">
                    <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {vendor.verificationStatus}
                    </span>
                  </TableCell>
                  <TableCell className=" text-center">
                    {vendor.verificationStatus === "pending" ? (
                      <div className="flex justify-center gap-3">
                        <Button
                          disabled={isPending}
                          variant="outline"
                          onClick={() => openViewDetails(vendor)}
                          className="border-yellow-500/30 bg-blue-500/5 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300 text-xs h-8 px-3 transition-colors"
                        >
                          View Details
                        </Button>
                      </div>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          vendor.verificationStatus === "approved"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {vendor.verificationStatus}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
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

      {/* --- View Details Dialog --- */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-amber-400 text-xl">
              Vendor Details: {selectedVendor?.shopName}
            </DialogTitle>
          </DialogHeader>

          {/* Details Body */}
          <div className="space-y-4 py-4 text-sm">
            {[
              { label: "Name", value: selectedVendor?.name },
              { label: "Email", value: selectedVendor?.email },
              { label: "Phone", value: selectedVendor?.phone },
              { label: "Shop Name", value: selectedVendor?.shopName },
              { label: "Address", value: selectedVendor?.shopAddress },
              {
                label: "GST Number",
                value: selectedVendor?.gstNumber,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between border-b border-zinc-800 pb-2"
              >
                <span className="text-zinc-500">{item.label}:</span>
                <span>{item.value || "N/A"}</span>
              </div>
            ))}
          </div>

          <DialogFooter className="justify-between">
            <Button
              variant="default"
              className="text-zinc-400 hover:text-white"
              onClick={() => setIsViewDetailsOpen(false)}
            >
              Close
            </Button>

            <div className="flex gap-2">
              <Button
                disabled={isPending}
                onClick={() => handleApprove(selectedVendor!.id)}
                className="bg-emerald-600 hover:bg-emerald-500 text-black text-xs h-8 px-4 font-bold"
              >
                Approve Vendor
              </Button>

              <Button
                disabled={isPending}
                onClick={() => {
                  setIsViewDetailsOpen(false);
                  setTimeout(() => openRejectDialog(selectedVendor!), 100);
                }}
                variant="destructive"
                className="bg-red-500/10 text-red-500 border border-red-500/50 text-xs h-8 px-4 hover:bg-red-500/20"
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
            <DialogTitle>Reject Vendor: {selectedVendor?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for rejection</Label>
              <Input
                id="reason"
                placeholder="e.g. Invalid GST number..."
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-red-500"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="default"
              onClick={() => setIsRejectDialogOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmRejection}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={!rejectionReason.trim()}
            >
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
