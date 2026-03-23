"use client";
import { Product, ProductVariant } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { Star, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const DetailedProductView = ({ product }: { product: Product }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.colorName,
  );
  const [count, setCount] = useState(1);

  const handleCountDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleCountIncrement = () => {
    if (count >= product.stock) {
      toast.error(`Only ${product.stock} items left in stock!`, {
        style: {
          background: "#111",
          color: "#fbbf24",
          border: "1px solid #333",
        },
      });
    } else {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans py-10 px-6">
      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-4xl bg-[#111111] border border-zinc-800">
            <Image
              src={product.images[imgIndex]}
              alt={product.title}
              fill
              className="object-fit p-6 rounded-4xl"
            />
          </div>

          <div className="flex flex-row gap-4 overflow-x-auto pb-2">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setImgIndex(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#111111] border-2 transition-all ${
                  imgIndex === idx ? "border-amber-400" : "border-zinc-800"
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-fit p-2" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-amber-500 font-bold text-xs uppercase tracking-[0.2em]">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
                <span className="text-white ml-2 font-semibold">4.8</span>
              </div>
              <span className="text-zinc-600">|</span>
              <span className="text-sm">128 Reviews</span>
              <span className="text-zinc-600">|</span>
              <span className="text-sm">3k+ Sold</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-amber-400">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Color: <span className="text-white">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.variants.map((variant: ProductVariant) => (
                <button
                  key={variant.colorName}
                  onClick={() => setSelectedColor(variant.colorName)}
                  className={`rounded-2xl bg-[#111111] border  ${selectedColor === variant.colorName ? "border-2 border-amber-400" : "border-0"}`}
                  title={variant.colorName}
                >
                  <Image
                    src={variant.imageUrl}
                    alt={variant.colorName}
                    width={80}
                    height={80}
                    className="object-fit p-2 rounded-xl"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <div className="flex items-center bg-zinc-900 rounded-xl px-4 border border-zinc-800">
              <button
                className="px-2 text-xl cursor-pointer"
                onClick={handleCountDecrement}
              >
                -
              </button>
              <input
                type="text"
                value={count}
                readOnly
                className="w-12 bg-transparent text-center font-bold text-white"
              />
              <button
                className="px-2 text-xl cursor-pointer"
                onClick={handleCountIncrement}
              >
                +
              </button>
            </div>
            <Button className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-bold h-14 rounded-xl text-lg">
              Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-3 text-xs">
              <Truck className="text-amber-400" size={20} />
              <span>Free Express Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <ShieldCheck className="text-amber-400" size={20} />
              <span>2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specification area */}
      {/* --- LOWER CONTENT SECTION --- */}
      <div className="max-w-5xl mx-auto mt-20 space-y-16">
        {/* Navigation Tabs (Visual Only for now) */}
        <div className="flex gap-8 border-b border-zinc-900 pb-4">
          <button className="text-white font-bold border-b-2 border-amber-400 pb-4 -mb-4.5">
            Technical Specifications
          </button>
          <button className="text-zinc-500 hover:text-white transition font-medium pb-4">
            Vendor Details
          </button>
          <button className="text-zinc-500 hover:text-white transition font-medium pb-4">
            Shipping & Returns
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Marketing Description */}
          <div className="space-y-6">
            <p className="text-zinc-400 leading-relaxed text-lg">
              {product.description}
            </p>
            <ul className="space-y-4">
              {product.detailsPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Customer Reviews Preview (Placeholder) */}
        <div className="pt-10 border-t border-zinc-900">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Customer Reviews
              </h2>
              <p className="text-zinc-500">Based on 128 verified purchases</p>
            </div>
            <Button
              variant="default"
              className="border border-stone-500 bg-transparent text-white hover:bg-zinc-900"
            >
              Write a Review
            </Button>
          </div>

          <div className="flex gap-12 items-start">
            <div className="shrink-0 text-center">
              <div className="text-6xl font-bold text-white mb-2">4.8</div>
              <div className="flex justify-center text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">
                Global Rating
              </p>
            </div>

            {/* Visual Progress Bars for ratings */}
            <div className="flex-1 space-y-2 max-w-xs">
              {[5, 4, 3, 2, 1].map((num) => (
                <div key={num} className="flex items-center gap-4 text-xs">
                  <span className="text-zinc-500 w-2">{num}</span>
                  <div className="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{
                        width: `${num === 5 ? 85 : num === 4 ? 10 : 2}%`,
                      }}
                    />
                  </div>
                  <span className="text-zinc-500 w-8">
                    {num === 5 ? "85%" : num === 4 ? "10%" : "2%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
