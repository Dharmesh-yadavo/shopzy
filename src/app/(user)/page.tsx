import Footer from "@/components/user/Footer";
import HeroSection from "@/components/user/HeroSection";
import ProductShowcase from "@/components/user/ProductShowcase";
import { getCurrentUser } from "@/features/auth/auth.queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user?.role === "vendor") redirect("/vendor");
  if (user?.role === "admin") redirect("/admin");

  return (
    <div className="min-h-screen bg-black text-white font-sans pt-8 ">
      <HeroSection />

      <ProductShowcase />

      <Footer />
    </div>
  );
}
