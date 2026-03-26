"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { TrackOrderDialog } from "./TrackOrderDialog";
import { Order, Product } from "@prisma/client";

export interface OrdersDataType {
  id: string;
  quantity: number;
  price: number;
  order: Order;
  product: Product;
}

export const OrdersComp = ({ orders }: { orders: OrdersDataType[] }) => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 md:p-8 font-sans selection:bg-amber-400">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-zinc-100">
            MY <span className="text-amber-400">ORDERS</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            {orders.length} ACTIVE SHIPMENTS
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((item) => (
            <div
              key={item.id}
              className="group bg-[#111113] border border-zinc-800/50 hover:border-amber-400/30 rounded-4xl md:rounded-[32px] p-4 md:p-6 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between relative z-10">
                <div className="flex gap-4 flex-1">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-zinc-800 to-zinc-950 border border-zinc-800 transition-all duration-500 hover:border-amber-400/50 group-hover:shadow-sm">
                    <div className="absolute inset-0 bg-black/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2 rounded-xl transition-transform duration-700 ease-out group-hover:scale-110 "
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1.5">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-400 text-black font-black uppercase text-[9px] px-2 py-0 rounded-md">
                        {item.order.orderStatus}
                      </Badge>
                      <span className="font-mono text-zinc-600 text-[10px] font-bold">
                        #{item.id.slice(-6)}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-lg font-bold text-zinc-100 uppercase tracking-tight line-clamp-1">
                      {item.product.title}
                    </h3>
                    <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />{" "}
                        {new Date(item.order.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-amber-400/40">•</span>
                      <span>QTY: {item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-zinc-800/50 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                      Total Paid
                    </p>
                    <p className="text-xl md:text-2xl font-black text-green-400 italic">
                      ₹{item.order.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <OrderDetailsDialog orderItem={item} />
                    <TrackOrderDialog orderItem={item} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
