import { ProductCard } from "@/components/user/ProductCard";
import { getProductByCategory } from "@/features/user/user.query";

interface PageProps {
  params: Promise<{ category: string }>;
}

const page = async ({ params }: PageProps) => {
  const param = await params;
  const category = param.category;

  const products = await getProductByCategory(category);

  console.log("Products: ", products);
  //
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 md:px-12 lg:px-24">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800 rounded-3xl">
          <p className="text-zinc-500 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
