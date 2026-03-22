import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Link from "next/link";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group relative bg-[#1c1c1e] rounded-[24px] overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl">
      {/* IMAGE SECTION */}
      <Link href={`/${product.id}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-[#111111]">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-fit-contain p-3 rounded-4xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* CONTENT SECTION */}
        <div className="p-5 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest ">
                {/* {product.brand} */}
              </p>
              <h3 className="text-white font-semibold text-lg line-clamp-1">
                {product.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={14} fill="currentColor" />
              <span>4</span>
              {/* <span className="text-xs font-bold">{product.rating}</span> */}
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex flex-col">
              <span className="text-white text-2xl font-bold italic">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <Button
              size="icon"
              className="bg-amber-400 hover:bg-amber-500 text-black rounded-xl h-10 w-10 shadow-lg shadow-amber-400/10"
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
