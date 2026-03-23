import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Headphones, Heart, User, Watch } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Product } from "@prisma/client";

const ProductShowcase = ({ product }: { product: Product[] }) => {
  return (
    <>
      {/* Categories */}
      <section className="px-8 mt-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {[
            { name: "Electronics", icon: <Watch /> },
            { name: "Fashion", icon: <User /> },
            { name: "Decoration", icon: <Heart /> },
            { name: "Accessories", icon: <Watch /> },
            { name: "Gaming", icon: <Headphones /> },
            { name: "Audio", icon: <Headphones /> },
            { name: "Fitness", icon: <Watch /> },
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl flex flex-col items-center gap-3 cursor-pointer hover:border-yellow-400/50 group transition-all"
            >
              <div className="text-stone-500 group-hover:text-yellow-400 transition-colors">
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-500">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-black py-16 px-6 sm:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-white text-3xl font-bold tracking-tight">
                  Trending Now
                </h2>
                <div className="h-1 w-12 bg-amber-400 mt-2 rounded-full" />
              </div>

              {/* CUSTOM ARROW PLACEMENT */}
              <div className="flex gap-2 relative">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 border-zinc-800 bg-zinc-900 text-white hover:bg-amber-400 hover:text-black transition-all" />
                <CarouselNext className="static translate-y-0 h-10 w-10 border-zinc-800 bg-zinc-900 text-white hover:bg-amber-400 hover:text-black transition-all" />
              </div>
            </div>

            <CarouselContent className="-ml-4">
              {product.map((prod) => (
                <CarouselItem
                  key={prod.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ProductCard product={prod} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default ProductShowcase;
