import { ProductShowcasePage } from "@/components/vendor/ProductShowcasePage";
import { getCurrentUser } from "@/features/auth/auth.queries";
import { getAllProduct } from "@/features/vendor/vendor.queries";
import { redirect } from "next/navigation";

const VendorProductPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const vendorProducts = await getAllProduct(user.id);

  return <ProductShowcasePage products={vendorProducts} />;
};

export default VendorProductPage;
