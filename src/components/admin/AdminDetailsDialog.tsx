"use client";

import Image from "next/image";
import { Product } from "@prisma/client";
// Adjust import path to your components/ui/dialog
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, ShoppingBag, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface AdminDetailsDialogProps {
  products: Product[];
}

const AdminDetailsDialog = ({ products }: AdminDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-amber-300 border-amber-400 text-black hover:bg-amber-400 transition-colors font-bold"
        >
          View {products.length} Products
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#0e0e10] border-zinc-800 text-zinc-100 sm:max-w-2xl w-[95vw] rounded-2xl p-2 overflow-hidden">
        <div className="bg-zinc-900/80 p-6 border-b border-zinc-800/50 flex justify-between items-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              Vendor Inventory
            </DialogTitle>
          </DialogHeader>
          <Badge
            variant="outline"
            className="border-amber-500/50 text-amber-400"
          >
            {products.length} Items Total
          </Badge>
        </div>

        <ScrollArea className="max-h-[60vh] p-6">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <Package className="w-12 h-12 mb-4 opacity-20" />
              <p>No products found for this vendor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex gap-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-800/60 transition-all"
                >
                  {/* Product Image */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-700">
                    <Image
                      src={product.images[0] || "/placeholder-product.png"}
                      alt={product.title}
                      fill
                      className="object-fit p-0.5 rounded-xl hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-zinc-100 truncate pr-4">
                          {product.title}
                        </h3>
                        <span className="text-amber-400 font-mono font-bold">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-zinc-800 text-[10px] hover:bg-zinc-800 text-zinc-300 border-none">
                        Stock: {product.stock}
                      </Badge>
                      <Badge className="bg-zinc-800 text-[10px] hover:bg-zinc-800 text-zinc-300 border-none">
                        {product.category}
                      </Badge>
                      {product.isActive ? (
                        <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] border-none">
                          Live
                        </Badge>
                      ) : (
                        <Badge className="bg-rose-500/10 text-rose-500 text-[10px] border-none">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4 bg-zinc-900/50 border-t border-zinc-800/50 flex justify-end">
          <p className="text-[10px] text-zinc-600 flex items-center gap-1 uppercase tracking-widest">
            <Info className="w-3 h-3" /> Click product to manage in store
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDetailsDialog;
