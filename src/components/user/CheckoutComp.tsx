"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { CartItemWithProduct } from "./CartPage";
import { useForm } from "react-hook-form";
import { createOrderAction } from "@/features/user/user.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming you use sonner or similar for notifications

export interface CheckOutPageDataType {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: "cod" | "stripe";
}

const CheckoutPage = ({
  cartItems,
  userId,
}: {
  cartItems: CartItemWithProduct[];
  userId: string;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<CheckOutPageDataType>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      paymentMethod: "stripe",
    },
  });

  const paymentWay = watch("paymentMethod");

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const deliveryCharge = subtotal > 10000 ? 0 : 30;
  const serviceCharge = 10;
  const total = subtotal + serviceCharge + deliveryCharge;

  const onSubmit = async (data: CheckOutPageDataType) => {
    try {
      const isPaid = false;
      const result = await createOrderAction(
        data,
        cartItems,
        subtotal,
        deliveryCharge,
        serviceCharge,
        total,
        userId,
        isPaid,
      );

      if (!result.success) {
        toast.error("Failed to initialize order");
        return;
      }

      if (data.paymentMethod === "cod") {
        toast.success("Order placed successfully!");
        router.push("/");
      } else if (data.paymentMethod === "stripe") {
        toast.loading("Redirecting to secure payment...");

        const response = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: result.orderId }),
        });

        const { url } = await response.json();
        if (url) {
          window.location.href = url;
        } else {
          toast.error("Stripe session failed");
        }
      }
    } catch (error) {
      console.error("Submission error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 md:p-10 font-sans selection:bg-amber-400 selection:text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        {/* LEFT: Shipping Address */}
        <div className="lg:col-span-7 space-y-10 bg-[#111113] p-6 md:p-10 rounded-[32px] border border-zinc-800/50 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1.5 bg-amber-400 rounded-full shadow-sm" />
            <h2 className="text-3xl font-black tracking-tight uppercase italic">
              Delivery Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-1">
                Full Name
              </Label>
              <Input
                {...register("name", { required: true })}
                placeholder="John Doe"
                className="bg-zinc-900/50 border-zinc-800 focus:border-amber-400 py-7 rounded-2xl transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-1">
                Phone Number
              </Label>
              <Input
                {...register("phone", { required: true })}
                placeholder="+91 00000 00000"
                className="bg-zinc-900/50 border-zinc-800 focus:border-amber-400 py-7 rounded-2xl transition-all"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-1">
                Complete Address
              </Label>
              <Textarea
                {...register("address", { required: true })}
                placeholder="Street, Apartment, Landmark..."
                className="bg-zinc-900/50 border-zinc-800 focus:border-amber-400 min-h-30 rounded-2xl resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-1">
                City
              </Label>
              <Input
                {...register("city", { required: true })}
                placeholder="Mumbai"
                className="bg-zinc-900/50 border-zinc-800 focus:border-amber-400 py-7 rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-500 text-xs font-bold uppercase tracking-widest ml-1">
                PinCode
              </Label>
              <Input
                {...register("pincode", { required: true })}
                placeholder="400001"
                className="bg-zinc-900/50 border-zinc-800 focus:border-amber-400 py-7 rounded-2xl"
              />
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <Label className="text-amber-400/60 mb-2 font-black uppercase text-[11px] tracking-[3px] ml-1">
              Select Payment Method
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setValue("paymentMethod", "cod")}
                className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-500 ${
                  paymentWay === "cod"
                    ? "bg-amber-400 text-black border-amber-400 font-black"
                    : "bg-zinc-900/30 border-zinc-800 text-zinc-500"
                }`}
              >
                <Truck
                  size={20}
                  className={paymentWay === "cod" ? "animate-pulse" : ""}
                />
                <span className="uppercase tracking-tighter text-sm">
                  Cash on Delivery
                </span>
              </button>

              <button
                type="button"
                onClick={() => setValue("paymentMethod", "stripe")}
                className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-500 ${
                  paymentWay === "stripe"
                    ? "bg-amber-400 text-black border-amber-400 font-black"
                    : "bg-zinc-900/30 border-zinc-800 text-zinc-500"
                }`}
              >
                <CreditCard size={20} />
                <span className="uppercase tracking-tighter text-sm">
                  Online Stripe
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#111113] p-6 rounded-[32px] border border-zinc-800/50 sticky top-10 shadow-2xl overflow-hidden">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">
              Summary
            </h2>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-95 overflow-y-auto pr-3 mb-8 scrollbar-thin">
              {cartItems.map((item) => {
                let imgUrl = item.product.images[0];

                if (item.color !== "NONE") {
                  const [res] = item.product.variants.filter(
                    (prod) => prod.colorName === item.color,
                  );
                  imgUrl = res.imageUrl;
                }
                return (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                      <Image
                        src={imgUrl}
                        alt={item.product.title}
                        fill
                        className="object-fit p-1 rounded-xl hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-[10px] uppercase text-zinc-600 font-black">
                        QTY: {item.quantity}
                      </p>
                    </div>
                    <p className="font-black text-amber-400 italic text-sm">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Totals Section */}
            <div className="space-y-4 border-t border-zinc-800/50 pt-8">
              <div className="flex justify-between text-xs font-bold text-zinc-500">
                <span>SUBTOTAL</span>
                <span className="text-zinc-100">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold text-zinc-500">
                <span>SHIPPING</span>
                <span
                  className={
                    deliveryCharge === 0 ? "text-green-400" : "text-zinc-100"
                  }
                >
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold text-zinc-500">
                <span>SERVICE FEE</span>
                <span className="text-zinc-100">₹{serviceCharge}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800/50">
                <span className="text-sm font-black text-zinc-400 uppercase tracking-[4px]">
                  Total
                </span>
                <span className="text-3xl font-black text-amber-400 italic">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 hover:bg-amber-300 text-black py-8 rounded-3xl font-black text-xl mt-10 transition-all active:scale-95 shadow-xl group"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span className="relative z-10 uppercase">Place Order</span>
                  <span className="ml-2 relative z-10 group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 mt-4 text-zinc-700">
              <ShieldCheck size={14} className="text-amber-400/40" />
              <p className="text-[9px] uppercase font-black tracking-[3px]">
                100% Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
