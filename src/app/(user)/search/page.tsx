// app/search/page.tsx
import Navbar from "@/components/user/Navbar";
import { ProductCard } from "@/components/user/ProductCard";
import { SearchFilters } from "@/components/user/SearchFilters";
import { getCurrentUser } from "@/features/auth/auth.queries";
import {
  getAllCartProducts,
  getProductsBySearch,
} from "@/features/user/user.query";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    free?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, minPrice, maxPrice, rating, free } = await searchParams;

  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const cart = await getAllCartProducts(user.id);

  const products = query
    ? await getProductsBySearch(
        query,
        Number(minPrice),
        Number(maxPrice),
        Number(rating),
        free,
      )
    : [];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-amber-500/30">
      <Navbar user={user} cart={cart} />

      <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 ">
        <header className="mb-4 space-y-2 ">
          <p className="text-amber-500 font-bold uppercase tracking-widest text-[11px]">
            Search Results
          </p>
          <h1 className="text-lg md:text-xl font-black italic">
            {query ? `"${query}"` : "All Collections"}
          </h1>
        </header>
        <div className="flex flex-col lg:flex-row gap-12">
          <SearchFilters />

          <main className="flex-1">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="min-h-screen bg-black text-white p-8">
                <div className="g"></div>
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
                    <p className="text-zinc-500">
                      No products found matching your search.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
