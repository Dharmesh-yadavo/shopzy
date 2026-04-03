"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Check,
  Package,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    if (!orderId) router.push("/");
  }, [orderId, router]);

  if (!mounted || !orderId) return null;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-20">
      {/* Compact Glass Card */}
      <div className="relative w-full max-w-120 bg-[#0c0c0e] border border-zinc-800/50 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle Accents */}
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Sparkles className="text-amber-400" size={32} />
        </div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/10 blur-[80px] rounded-full" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Minimal Success Badge */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full" />
            <div className="relative h-16 w-16 bg-amber-400 rounded-2xl rotate-12 flex items-center justify-center shadow-lg transform transition-transform hover:rotate-0 duration-500">
              <Check
                size={32}
                className="text-black -rotate-12 group-hover:rotate-0 transition-transform"
                strokeWidth={3}
              />
            </div>
          </div>

          <h1 className="text-3xl font-black uppercase italic tracking-tight text-white mb-2">
            Payment Received
          </h1>
          <p className="text-zinc-500 text-sm font-medium mb-8">
            Your order is being processed and will be <br /> dispatched shortly.
          </p>

          {/* Sleek ID Section */}
          <div className="w-full bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-4 mb-8 flex flex-col gap-2 md:flex-row lg:flex-row items-center justify-between">
            <div className="text-left">
              <span className="block text-[9px] font-black uppercase tracking-widest text-zinc-600">
                Reference
              </span>
              <span className="text-xs font-mono font-bold text-zinc-300">
                {orderId}
              </span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase">
                Paid
              </span>
            </div>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-1 gap-3 w-full">
            <Button
              asChild
              className="w-full bg-amber-400 hover:bg-amber-300 text-black h-14 rounded-xl font-bold transition-all active:scale-[0.98]"
            >
              <Link
                href="/orders"
                className="flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                TRACK ORDER
              </Link>
            </Button>

            <Button
              variant="default"
              asChild
              className="w-full text-zinc-500 hover:text-zinc-200 h-12 rounded-xl font-bold transition-colors"
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                Continue Shopping
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          {/* Micro Footer */}
          <div className="mt-8 flex items-center gap-2 text-zinc-600">
            <Package size={14} />
            <span className="text-[10px] font-black uppercase tracking-[2px]">
              Standard Delivery: 3-5 Days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
