import React from "react";
import Image from "next/image";
import { Headphones, Heart, ShoppingCart, User, Watch } from "lucide-react";

const ProductShowcase = () => {
  return (
    <>
      {/* Categories */}
      <section className="px-8 mt-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {[
            { name: "Electronics", icon: <Watch /> },
            { name: "Fashion", icon: <User /> },
            { name: "Home Decor", icon: <Heart /> },
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

        {/* Product Grid (Simplified Example) */}
        <div className="px-8 py-12">
          <h3 className="text-xl font-bold mb-8">Trending Now</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Card instance */}
            <div className="bg-[#111] rounded-2xl p-4 border border-stone-800 group cursor-pointer">
              <div className="h-64 bg-stone-900 rounded-xl mb-4 overflow-hidden relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0TcTTVs1402dU_bVQ8RbBnlDwmxMtpqioGfkGZVH9BC8whg2QBXxAI38V0zIkw3YzPOlsTvVx8uHxyTWQnAwZIqtnJpO-sKMQKDfhn4kxAQi9Vw4SfO3qp03l55jaAdnskSIcXzYsThBiuy4Id9ieqyr3SgBZXRkKonrpl-DlMs_8ujzOF-tcjRESiwOt7wsIEDwvv_wlP7x1ZY6JLYRlt7-uW508uZATUQSYufTOEmW0YijGG24h1L5PqN1QKHDEnGeqiEy51bFs"
                  alt="Arctic White Edition product"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <button className="absolute bottom-3 right-3 bg-yellow-400 p-2 rounded-lg text-black">
                  <ShoppingCart size={18} />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[8px] uppercase text-yellow-400 font-black mb-1">
                    Timepiece 02
                  </p>
                  <h4 className="font-bold text-sm">Arctic White Edition</h4>
                </div>
                <p className="font-bold text-sm">$249.00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductShowcase;
