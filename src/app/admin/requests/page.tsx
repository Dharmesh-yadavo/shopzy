import { ProductApproval } from "@/components/admin/ProductApproval";
import { pendingRequestProducts } from "@/features/admin/admin.query";
import React from "react";

const page = async () => {
  const products = await pendingRequestProducts();
  console.log("Pending Products: ", products);
  return <ProductApproval products={products} />;
};

export default page;
