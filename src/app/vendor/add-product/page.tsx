import { AddProductPage } from "@/components/vendor/AddProductPage";
import { getCurrentUser } from "@/features/auth/auth.queries";
import { redirect } from "next/navigation";
import React from "react";

const addProductPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  return (
    <>
      <AddProductPage vendorId={user.id} />
    </>
  );
};

export default addProductPage;
