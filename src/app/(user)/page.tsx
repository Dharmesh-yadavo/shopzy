import EditPhoneAndRole from "@/components/auth/EditPhoneAndRole";
import Footer from "@/components/user/Footer";
import HeroSection from "@/components/user/HeroSection";
import ProductShowcase from "@/components/user/ProductShowcase";
import {
  getCurrentUser,
  isAdminExist,
} from "@/features/auth/server/auth.queries";

export default async function Home() {
  const user = await getCurrentUser();

  console.log("Current User:", user);

  const isAdmin = await isAdminExist();

  if (!user?.phone || !user?.role || (user.role === "user" && !user?.phone)) {
    return <EditPhoneAndRole isAdmin={isAdmin} />;
  }
  return (
    <div className="min-h-screen bg-black text-white font-sans pt-8 ">
      <HeroSection />

      <ProductShowcase />

      <Footer />
    </div>
  );
}
