"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { OrdersDataType } from "./OrdersComp";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { cancelOrderAction } from "@/features/user/user.action";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const OrderDetailsDialog = ({
  orderItem,
}: {
  orderItem: OrdersDataType;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCancel = async () => {
    startTransition(async () => {
      const result = await cancelOrderAction(
        orderItem.order.id,
        "cancelled",
        orderItem.price,
      );

      if (result.success) {
        setOpen(false);
        router.refresh();
      } else {
        console.error("Failed to cancel order");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-zinc-900 border-zinc-800 text-zinc-400 rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest hover:text-zinc-100 transition-colors"
        >
          Details
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#0e0e10] border-zinc-800 text-zinc-100 sm:max-w-125 w-[92vw] rounded-[24px] p-0 overflow-hidden shadow-2xl shadow-black">
        <div className="bg-zinc-900/80 p-5 border-b border-zinc-800/50 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl font-black italic uppercase tracking-tighter flex items-center justify-between">
              Order Details
              <span className="text-amber-400 text-xs font-mono bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                #{orderItem.id.slice(-8)}
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="flex gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 items-center">
            <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
              <Image
                src={orderItem.product.images[0]}
                alt={orderItem.product.title}
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm md:text-base font-bold leading-tight truncate">
                {orderItem.product.title}
              </p>
              <p className="text-[11px] text-zinc-500 font-black mt-1 uppercase tracking-wider">
                Unit Price:{" "}
                <span className="text-zinc-300 font-mono">
                  ₹{orderItem.price.toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                Shipping Address
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {orderItem.order.address.address}, <br />
                {orderItem.order.address.city} -{" "}
                {orderItem.order.address.pincode}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                Customer Info
              </p>
              <p className="text-sm text-zinc-300 font-medium">
                {orderItem.order.address.name}
              </p>
              <p className="text-sm text-zinc-500 font-mono">
                {orderItem.order.address.phone}
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-zinc-500 uppercase">
              <span>Payment Mode</span>
              <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {orderItem.order.paymentMethod}
              </span>
            </div>
            <Separator className="bg-zinc-800/50" />
            <div className="flex justify-between items-end pt-1">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                Total Amount Paid
              </span>
              <span className="text-2xl font-black text-green-400 italic leading-none">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(orderItem.price)}
              </span>
            </div>
          </div>

          {orderItem.order.paymentMethod === "stripe" && (
            <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10 space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                Important Note
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Order cancellation is not available for Online Payments (Stripe).",
                  "Returns are only possible after successful delivery.",
                  "Refunds apply to the product amount only.",
                  "Delivery & service charges are non-refundable.",
                ].map((note, i) => (
                  <li
                    key={i}
                    className="text-xs text-zinc-400 leading-snug flex gap-2"
                  >
                    <span className="text-amber-400/60 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="p-5 bg-zinc-900/40 border-t border-zinc-800/50">
          {orderItem.order.orderStatus !== "delivered" &&
          orderItem.order.orderStatus !== "cancelled" ? (
            <Button
              disabled={
                orderItem.order.paymentMethod === "stripe" ? true : isPending
              }
              onClick={handleCancel}
              variant="destructive"
              className="w-full bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl h-12 text-xs font-black uppercase tracking-widest transition-all"
            >
              {isPending ? "Processing..." : "Cancel Order"}
            </Button>
          ) : (
            <div className="w-full text-center py-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <p className="text-xs text-zinc-400 uppercase font-black tracking-widest">
                Status:{" "}
                <span
                  className={
                    orderItem.order.orderStatus === "cancelled"
                      ? "text-red-400"
                      : "text-green-400"
                  }
                >
                  {orderItem.order.orderStatus}
                </span>
              </p>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
