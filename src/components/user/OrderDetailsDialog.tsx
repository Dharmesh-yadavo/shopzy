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
  const [open, setOpen] = useState(false); // State to control dialog
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
          variant="outline"
          className="bg-zinc-900 border-zinc-800  text-zinc-400 rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest"
        >
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0e0e10]  border-zinc-800 text-zinc-100 sm:max-w-112.5 rounded-[24px] p-2 overflow-hidden">
        <div className="bg-zinc-900/50 p-5 border-b border-zinc-800/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-black italic uppercase tracking-tighter flex items-center justify-between">
              Order Details
              <span className="text-amber-400 text-xs font-mono">
                #{orderItem.id.slice(-8)}
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-5 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Product Info */}
          <div className="flex gap-4 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/50">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
              <Image
                src={orderItem.product.images[0]}
                alt={orderItem.product.title}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">
                {orderItem.product.title}
              </p>
              <p className="text-[10px] text-zinc-500 font-black mt-1 uppercase">
                Unit Price: ₹{orderItem.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                Address
              </p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {orderItem.order.address.address},{" "}
                {orderItem.order.address.city} -{" "}
                {orderItem.order.address.pincode}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                Customer
              </p>
              <p className="text-[11px] text-zinc-400">
                {orderItem.order.address.name}
              </p>
              <p className="text-[11px] text-zinc-400">
                {orderItem.order.address.phone}
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
              <span>Payment Mode</span>
              <span className="text-amber-400">
                {orderItem.order.paymentMethod.toUpperCase()}
              </span>
            </div>
            <Separator className="bg-zinc-800/50" />
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-[10px] font-black text-zinc-500 uppercase">
                Total Paid
              </span>
              <span className="text-xl font-black text-green-400 italic">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(orderItem.price)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 bg-zinc-900/20 border-t border-zinc-800/50">
          {orderItem.order.orderStatus !== "delivered" &&
          orderItem.order.orderStatus !== "cancelled" ? (
            <Button
              disabled={isPending}
              onClick={handleCancel}
              variant="destructive"
              className="w-full bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase"
            >
              {isPending ? "Cancelling..." : "Cancel Order"}
            </Button>
          ) : (
            <p className="text-[10px] text-zinc-500 uppercase font-black">
              Order {orderItem.order.orderStatus}
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
