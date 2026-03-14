"use client";

import { Plus, Package, IndianRupee, Layers, ListOrdered } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddProductModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-amber-400 hover:bg-amber-300 text-black font-bold h-12 px-6 rounded-xl transition-all shadow-lg shadow-amber-400/10">
          <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-130 bg-[#09090b] border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <Package className="h-6 w-6" /> Create New Listing
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Fill in the details below to list your product on the marketplace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Product Name */}
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-zinc-300 flex items-center gap-2"
            >
              Product Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Wireless Headphones X2"
              className="bg-zinc-900 border-zinc-800 focus:border-amber-400 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="grid gap-2">
              <Label
                htmlFor="category"
                className="text-zinc-300 flex items-center gap-2"
              >
                <Layers className="h-3 w-3" /> Category
              </Label>
              <Input
                id="category"
                placeholder="Electronics"
                className="bg-zinc-900 border-zinc-800 focus:border-amber-400 text-white"
              />
            </div>

            {/* Price */}
            <div className="grid gap-2">
              <Label
                htmlFor="price"
                className="text-zinc-300 flex items-center gap-2"
              >
                <IndianRupee className="h-3 w-3" /> Price
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                className="bg-zinc-900 border-zinc-800 focus:border-amber-400 text-white"
              />
            </div>
          </div>

          {/* Stock */}
          <div className="grid gap-2">
            <Label
              htmlFor="stock"
              className="text-zinc-300 flex items-center gap-2"
            >
              <ListOrdered className="h-3 w-3" /> Initial Stock
            </Label>
            <Input
              id="stock"
              type="number"
              placeholder="100"
              className="bg-zinc-900 border-zinc-800 focus:border-amber-400 text-white"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-900"
          >
            Cancel
          </Button>
          <Button className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-8">
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
