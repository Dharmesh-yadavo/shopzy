"use client";

import Link from "next/link";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-black sticky top-0 z-100 border-b border-stone-800/80">
      {/* 1. Brand Logo - Increased size */}
      <Link href="/" className="shrink-0">
        <h1 className="text-2xl font-black tracking-tighter text-yellow-400 italic hover:brightness-110 transition-all">
          SHOPZY
        </h1>
      </Link>

      {/* 2. Search Bar - Increased height and text size */}
      <div className="flex-1 max-w-xl mx-12 relative hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search collections..."
          className="w-full bg-stone-900/50 border border-stone-800 rounded-xl py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-yellow-400/50 transition-all placeholder:text-stone-600"
        />
      </div>

      {/* 3. Moderate Action Group */}
      <div className="flex items-center gap-6">
        {/* Primary Buttons - Increased padding and font weight */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              size="lg"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300  text-sm font-black text-black transition-all active:scale-95 shadow-[0_4px_20px_rgba(250,204,21,0.2)]"
            >
              <User size={18} />
              Login
            </Button>
          </Link>
        </div>

        {/* Moderate Icon Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            className="p-3 rounded-xl hover:bg-white/5 text-stone-400 hover:text-red-500 transition-all group"
          >
            <Heart
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
          </Link>

          <Link
            href="/cart"
            className="p-3 rounded-xl hover:bg-white/5 text-stone-400 hover:text-yellow-400 transition-all group relative"
          >
            <ShoppingCart
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
