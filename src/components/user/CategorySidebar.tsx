"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Headphones, Heart, User, Watch } from "lucide-react";

const CATEGORIES = [
  {
    name: "Electronics",
    icon: <Watch size={18} />,
    href: "/category/electronics",
  },
  { name: "Fashion", icon: <User size={18} />, href: "/category/fashion" },
  {
    name: "Decoration",
    icon: <Heart size={18} />,
    href: "/category/decoration",
  },
  {
    name: "Accessories",
    icon: <Watch size={18} />,
    href: "/category/accessories",
  },
  { name: "Gaming", icon: <Headphones size={18} />, href: "/category/gaming" },
  { name: "Audio", icon: <Headphones size={18} />, href: "/category/audio" },
  { name: "Fitness", icon: <Watch size={18} />, href: "/category/fitness" },
];

export default function CategorySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="sticky top-8 space-y-6">
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem] p-3 backdrop-blur-sm">
          <nav className="space-y-1.5">
            <p className="px-4 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              Categories
            </p>

            {CATEGORIES.map((cat) => {
              const isActive = pathname === cat.href;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                      : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        isActive
                          ? "text-black"
                          : "text-zinc-500 group-hover:text-amber-500"
                      }
                    >
                      {cat.icon}
                    </span>
                    <span className="text-sm font-semibold tracking-wide">
                      {cat.name}
                    </span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/10 hidden lg:block">
          <p className="text-xs font-bold text-amber-500 uppercase mb-2">
            New Arrivals
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Check out our latest tech gadgets and summer fashion.
          </p>
        </div>
      </div>
    </aside>
  );
}
