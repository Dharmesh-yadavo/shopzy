import { getAllCartProducts } from "@/features/user/user.query";
import CheckoutComp from "@/components/user/CheckoutComp";

interface PageProps {
  params: Promise<{ userId: string }>;
}

const CheckoutPage = async ({ params }: PageProps) => {
  const param = await params;
  const userId = param.userId;

  const cartItems = await getAllCartProducts(userId);

  return <CheckoutComp cartItems={cartItems} userId={userId} />;
};

export default CheckoutPage;
