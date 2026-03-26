"use client";
import { ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrdersDataType } from "./OrdersComp";

export const TrackOrderDialog = ({
  orderItem,
}: {
  orderItem: OrdersDataType;
}) => {
  const statusSteps = ["pending", "confirmed", "shipped", "delivered"];
  const currentStatusIdx = statusSteps.indexOf(
    orderItem.order.orderStatus.toLowerCase(),
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-amber-400 hover:bg-amber-300 text-black rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
        >
          <Truck size={14} /> <span className="hidden sm:block">Track</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0e0e10] border-zinc-800 text-zinc-100 sm:max-w-95 rounded-[24px] p-6">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-xl font-black italic uppercase tracking-tight text-amber-400">
            Shipment Log
          </DialogTitle>
          <p className="text-zinc-600 text-[9px] font-black uppercase mt-1 tracking-widest">
            TRK-{orderItem.id.slice(-10)}
          </p>
        </DialogHeader>

        <div className="space-y-8 relative">
          <div className="absolute left-1.75 top-2 bottom-2 w-px bg-zinc-800" />

          {statusSteps.map((step, idx) => {
            const isActive = idx <= currentStatusIdx;
            return (
              <div key={step} className="flex gap-4 relative">
                <div className="relative z-10 pt-1">
                  <div
                    className={`w-3.5 h-3.5 rounded-full ${isActive ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "bg-zinc-800 border border-zinc-700"}`}
                  />
                </div>
                <div>
                  <p
                    className={`text-[11px] font-black uppercase tracking-tight ${isActive ? "text-zinc-100" : "text-zinc-700"}`}
                  >
                    {step}
                  </p>
                  <p className="text-[9px] text-zinc-500 font-medium italic">
                    {isActive ? "Verified & Logged" : "Pending Action"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center gap-2 justify-center opacity-40">
          <ShieldCheck size={12} className="text-amber-400" />
          <p className="text-[8px] font-black uppercase tracking-widest">
            End-to-End Encrypted
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
