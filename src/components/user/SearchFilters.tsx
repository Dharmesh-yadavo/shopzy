"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Slider from "@radix-ui/react-slider";
import { Star, Truck, Banknote, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const SearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [range, setRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 50000,
  ]);
  const [rating, setRating] = useState(Number(searchParams.get("rating")) || 0);
  const [freeDelivery, setFreeDelivery] = useState(
    searchParams.get("free") === "true",
  );

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", range[0].toString());
    params.set("maxPrice", range[1].toString());
    if (rating > 0) params.set("rating", rating.toString());
    else params.delete("rating");
    if (freeDelivery) params.set("free", "true");
    else params.delete("free");

    router.push(`/search?${params.toString()}`);
  };

  const MAX_LIMIT = 100000;

  const resetFilters = () => {
    setRange([0, 50000]);
    setRating(0);
    setFreeDelivery(false);

    const q = searchParams.get("q");
    if (q) {
      router.push(`/search?q=${q}`);
    } else {
      router.push(`/search`);
    }
  };

  return (
    <aside className="w-full lg:w-60 shrink-0 space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
          Price Range
        </h3>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={range}
          max={100000}
          step={500}
          onValueChange={setRange}
        >
          <Slider.Track className="bg-zinc-800 relative grow rounded-full h-0.75">
            <Slider.Range className="absolute bg-yellow-400 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white shadow-xl rounded-full hover:scale-110 transition-transform cursor-pointer border-2 border-yellow-400 outline-none" />
          <Slider.Thumb className="block w-5 h-5 bg-white shadow-xl rounded-full hover:scale-110 transition-transform cursor-pointer border-2 border-yellow-400 outline-none" />
        </Slider.Root>
        <div className="flex justify-between text-xs font-mono text-zinc-500">
          <span>₹{range[0].toLocaleString()}</span>
          <span>
            {range[1] >= MAX_LIMIT
              ? "100000+"
              : `₹${range[1].toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
          Customer Rating
        </h3>
        <div className="space-y-2">
          {[4, 3, 2].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl border transition-all ${
                rating === star
                  ? "bg-yellow-400/10 border-yellow-400/50 text-yellow-400"
                  : "border-zinc-800 hover:border-zinc-700 text-zinc-500"
              }`}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < star ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters (Services) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
          Service & Quality
        </h3>
        <div className="space-y-3">
          {/* Free Delivery  */}
          <div
            className="flex items-center justify-between group cursor-pointer"
            onClick={() => setFreeDelivery(!freeDelivery)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-900 rounded-lg text-zinc-500 group-hover:text-yellow-400 transition-colors">
                <Truck size={18} />
              </div>
              <span className="text-sm text-zinc-300">Free Delivery</span>
            </div>

            <Checkbox checked={freeDelivery} className="pointer-events-none" />
          </div>

          {/* Cash on Delivery */}
          <div className="flex items-center justify-between group opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-900 rounded-lg">
                <Banknote size={18} />
              </div>
              <span className="text-sm text-zinc-300">Pay on Delivery</span>
            </div>
            <Checkbox disabled />
          </div>
        </div>
      </div>

      <Button
        onClick={applyFilters}
        className="w-full  bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-2xl shadow-lg shadow-yellow-400/10 active:scale-95 transition-all"
      >
        Apply
      </Button>
      <button
        onClick={resetFilters}
        className="w-full flex items-center justify-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-200 transition-colors uppercase tracking-widest"
      >
        <RotateCcw size={12} />
        Reset Filters
      </button>
    </aside>
  );
};
