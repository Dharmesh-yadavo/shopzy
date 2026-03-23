import { DetailedProductView } from "@/components/user/DetailedProductView";
import { productById, vendorById } from "@/features/vendor/vendor.queries";
import { Product } from "@prisma/client";

interface PageProps {
  params: Promise<{ productId: string }>;
}

const productDetailedPage = async ({ params }: PageProps) => {
  const param = await params;
  const productId = param.productId;

  const details = (await productById(productId)) as Product | null;

  if (!details) return null;

  const vendor = await vendorById(details.vendorId);

  console.log("Vendor: ", vendor);

  return <DetailedProductView product={details} vendor={vendor} />;
};

export default productDetailedPage;
