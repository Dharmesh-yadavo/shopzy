"use client";
import { CartItem, Product, ProductVariant } from "@prisma/client";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  deleteCartItem,
  updateCartQuantity,
} from "@/features/user/user.action";
import Link from "next/link";

export interface CartItemWithProduct extends CartItem {
  product: Product & {
    variants: ProductVariant[];
  };
}

const CartPage = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  //
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-6">
          Shopping Cart ({cartItems.length})
        </h1>

        {cartItems.map((item) => {
          let imgUrl = item.product.images[0];

          if (item.color !== "NONE") {
            const [res] = item.product.variants.filter(
              (prod) => prod.colorName === item.color,
            );
            imgUrl = res.imageUrl;
          }

          const handleIncrement = async (item: CartItemWithProduct) => {
            if (item.quantity >= item.product.stock) {
              toast.error(`Only ${item.product.stock} items left in stock!`, {
                style: {
                  background: "#111",
                  color: "#fbbf24",
                  border: "1px solid #333",
                },
              });
              return;
            }
            await updateCartQuantity(item.id, item.quantity + 1);
          };

          const handleDecrement = async (item: CartItemWithProduct) => {
            if (item.quantity > 1) {
              await updateCartQuantity(item.id, item.quantity - 1);
            } else {
              //   await deleteCartItem(item.id);
            }
          };

          return (
            <div
              key={item.id}
              className="flex gap-4 bg-[#1c1c1e] p-4 rounded-xl border border-zinc-800"
            >
              <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-black shrink-0">
                <Image
                  src={imgUrl}
                  alt={item.product.title}
                  fill
                  className="object-fit p-1 rounded-xl hover:scale-105"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {item.product.title}
                </h3>

                <div className="text-sm text-zinc-400 flex gap-2">
                  {item.size !== "NONE" && <span>Size: {item.size}</span>}
                  {item.size !== "NONE" && item.color !== "NONE" && (
                    <span>|</span>
                  )}
                  {item.color !== "NONE" && <span>Color: {item.color}</span>}
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-zinc-700 rounded-md">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="px-4 font-medium w-10 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrement(item)}
                      className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => deleteCartItem(item.id)}
                    className="text-zinc-500 hover:text-red-500 flex items-center gap-1 text-sm"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>

              <div className="text-right flex flex-col justify-between">
                <p className="font-bold text-amber-400 text-lg">
                  ₹
                  {(item.product.price * item.quantity).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-zinc-300">
                  ₹{item.product.price.toLocaleString("en-IN")} each
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#1c1c1e] p-6 rounded-xl border border-zinc-800 h-fit space-y-4">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Delivery</span>
          <span className="text-green-500 font-medium">Free</span>
        </div>
        <hr className="border-zinc-800" />
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-amber-400">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <Link href={`/checkout/${cartItems[0].userId}`}>
          <Button className="w-full bg-amber-400 text-black hover:bg-amber-500 font-bold py-6 text-lg">
            Checkout
          </Button>
        </Link>

        <p className="text-[10px] mt-2 text-zinc-500 text-center uppercase tracking-widest">
          Secure Checkout • 100% Authentic Products
        </p>
      </div>
    </div>
  );
};

export default CartPage;
