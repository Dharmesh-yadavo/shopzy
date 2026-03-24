import { getCurrentUser } from "@/features/auth/auth.queries";
import { Button } from "@/components/ui/button";
import { getAllCartProducts } from "@/features/user/user.query";
import { redirect } from "next/navigation";
import Link from "next/link";
import CartPage from "@/components/user/CartPage";

export default async function UserCartPage() {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  const cartItems = await getAllCartProducts(user?.id);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <Button asChild variant="outline">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return <CartPage cartItems={cartItems} />;
}
