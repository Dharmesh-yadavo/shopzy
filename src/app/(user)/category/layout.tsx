import React from "react";
import Navbar from "@/components/user/Navbar";
import { getCurrentUser } from "@/features/auth/auth.queries";
import CategorySidebar from "@/components/user/CategorySidebar";
import { redirect } from "next/navigation";
import { getAllCartProducts } from "@/features/user/user.query";

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const cart = await getAllCartProducts(user.id);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-amber-500/30">
      <Navbar user={user} cart={cart} />

      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <CategorySidebar />

          <main className="flex-1">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
