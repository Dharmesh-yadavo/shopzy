"use client";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import Link from "next/link";
import { addProductToCart } from "@/features/user/user.action";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handleAddToCart = async (
    e: React.MouseEvent,
    productId: string,
    quantity: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    let colour = "";
    let size = "";
    if (product.hasColours) {
      product.variants.map((p) => {
        return (colour = p.colorName);
      });
    }
    if (product.size) {
      size = product.size[0];
    }

    const res = await addProductToCart(productId, quantity, colour, size);
    if (res.status === "success") {
      router.refresh();
    }
  };

  return (
    <div className="group relative bg-[#1c1c1e] rounded-[24px] overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl">
      {/* Wrap only the informational parts in a Link */}
      <Link href={`/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-[#111111]">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-fit p-3 rounded-4xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">
                {product.category || "Premium"}
              </p>
              <h3 className="text-white font-semibold text-lg line-clamp-1">
                {product.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-amber-400 shrink-0">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-medium">4.0</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-amber-400 text-2xl font-bold italic">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>

            <Button
              size="icon"
              onClick={(e) => handleAddToCart(e, product.id, 1)}
              className="bg-amber-400 hover:bg-amber-500 text-black rounded-xl h-10 w-10 shadow-lg shadow-amber-400/20 active:scale-95 transition-transform"
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
