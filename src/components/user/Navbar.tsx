"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User as UserIcon,
  LogOut,
  Package,
  Settings,
  ChevronDown,
  Phone,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartItem } from "@prisma/client";
import { handleUserLogoutAction } from "@/features/auth/auth.action";

interface UserType {
  email: string;
  image: string | null;
}

const Navbar = ({ user, cart }: { user: UserType; cart: CartItem[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery("");
  };

  return (
    <nav className="bg-black sticky top-0 border-b border-stone-800/80 px-4 md:px-8 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* 1. Brand Logo */}
        <Link href="/" className="shrink-0">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter text-yellow-400 italic hover:brightness-110 transition-all">
            SHOPZY
          </h1>
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-xl relative group mx-2 md:mx-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-yellow-400 w-4 h-4 md:w-5 md:h-5 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="w-full bg-stone-900/50 border border-stone-800 rounded-xl py-3 md:py-3 pl-10 md:pl-12 pr-4 text-xs md:text-sm text-white focus:outline-none focus:border-yellow-400/50 transition-all placeholder:text-stone-600"
          />
        </form>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/support"
            className="p-2.5 rounded-xl hidden sm:flex hover:bg-white/5 text-stone-400 hover:text-yellow-400 transition-all group relative"
          >
            <Phone
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
          </Link>

          <Link
            href="/cart"
            className="p-2.5 rounded-xl hidden sm:flex hover:bg-white/5 text-stone-400 hover:text-yellow-400 transition-all group relative"
          >
            <ShoppingCart
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="absolute top-1 right-1 bg-yellow-400 text-black text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full border border-black">
              {cart.length}
            </span>
          </Link>

          {/* User Section */}
          {!user ? (
            <Link href="/login">
              <Button
                size="sm"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg px-4 md:px-5 text-xs md:text-sm"
              >
                Login
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 py-1 ml-1 cursor-pointer outline-none group">
                  <div className="h-8 w-8 rounded-full bg-stone-800 flex items-center justify-center border border-stone-700 overflow-hidden shrink-0">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="User"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserIcon size={16} className="text-stone-400" />
                    )}
                  </div>
                  <ChevronDown
                    size={14}
                    className="text-stone-500 hidden md:block group-data-[state=open]:rotate-180 transition-transform"
                  />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 z-100 bg-stone-900 border-stone-800 text-stone-300 rounded-2xl p-2 shadow-2xl"
              >
                <DropdownMenuLabel className="px-3 py-2 font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs text-stone-500 font-medium leading-none">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-white truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-stone-800" />

                <DropdownMenuItem
                  asChild
                  className="focus:bg-stone-800 focus:text-white rounded-xl cursor-pointer"
                >
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-2 py-2.5"
                  >
                    <UserIcon size={16} /> My Details
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="sm:hidden focus:bg-stone-800 focus:text-yellow-400 rounded-xl cursor-pointer"
                >
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-2 py-2.5"
                  >
                    <ShoppingCart size={16} /> My Cart
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="focus:bg-stone-800 focus:text-white rounded-xl cursor-pointer"
                >
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-2 py-2.5"
                  >
                    <Package size={16} /> My Orders
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="sm:hidden focus:bg-stone-800 focus:text-yellow-400 rounded-xl cursor-pointer"
                >
                  <Link
                    href="/support"
                    className="flex items-center gap-3 px-2 py-2.5"
                  >
                    <Phone size={16} /> Support
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="focus:bg-stone-800 focus:text-white rounded-xl cursor-pointer"
                >
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-2 py-2.5"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-stone-800" />

                <DropdownMenuItem
                  className="focus:bg-red-500/10 focus:text-red-500 text-stone-400 rounded-xl cursor-pointer flex items-center gap-3 px-2 py-2.5"
                  onClick={handleUserLogoutAction}
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
