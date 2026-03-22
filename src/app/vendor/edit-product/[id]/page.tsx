import { EditProductPage } from "@/components/vendor/EditProductPage";
import { productById } from "@/features/vendor/vendor.queries";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const param = await params;

  const productId = param.id;

  const product = await productById(productId);

  if (!product || Array.isArray(product)) {
    return <div>Product not found</div>;
  }

  return (
    <EditProductPage
      productId={productId}
      product={product}
      vendorId={product.vendorId}
    />
  );
};

export default page;
