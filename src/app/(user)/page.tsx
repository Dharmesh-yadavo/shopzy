import Footer from "@/components/user/Footer";
import HeroSection from "@/components/user/HeroSection";
import Navbar from "@/components/user/Navbar";
import ProductShowcase from "@/components/user/ProductShowcase";
import { getCurrentUser } from "@/features/auth/auth.queries";
import { getAllCartProducts, getAllProducts } from "@/features/user/user.query";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  const products = await getAllProducts();

  console.log("Products: ", products);

  if (user?.role === "vendor") redirect("/vendor");
  if (user?.role === "admin") redirect("/admin");

  if (!user) redirect("/login");

  const cart = await getAllCartProducts(user.id);

  return (
    <div className="min-h-screen bg-black text-white font-sans ">
      <Navbar user={user} cart={cart} />

      <HeroSection />

      <ProductShowcase product={products} />

      <Footer />
    </div>
  );
}
