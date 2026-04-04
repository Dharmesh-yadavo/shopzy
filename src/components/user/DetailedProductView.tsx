"use client";
import { Product, ProductVariant } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import {
  Star,
  ShieldCheck,
  Truck,
  MapPin,
  ThumbsUp,
  Flag,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { addProductToCart } from "@/features/user/user.action";
import { useRouter } from "next/navigation";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
  shopName: string | null;
  shopAddress: string | null;
  gstNumber: string | null;
  isApproved: boolean | null;
  verificationStatus: "pending" | "approved" | "rejected";
  requestedAt: Date | null;
  approvedAt: Date | null;
  rejectedReason: string | null;
  createdAt: Date;
}

export const DetailedProductView = ({
  product,
  vendor,
}: {
  product: Product;
  vendor: Vendor;
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.colorName,
  );
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.size[0] || "",
  );

  const handleCountDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleCountIncrement = () => {
    if (count >= product.stock) {
      toast.error(`Only ${product.stock} items left in stock!`, {
        style: {
          background: "#111",
          color: "#fbbf24",
          border: "1px solid #333",
        },
      });
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const totalStars = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0,
  );

  const globalRating =
    product.reviews.length > 0
      ? (totalStars / product.reviews.length).toFixed(1)
      : "0";

  const totalFiveStars = product.reviews.filter(
    (reviews) => reviews.rating == 5,
  );

  const totalFourStars = product.reviews.filter(
    (reviews) => reviews.rating == 4,
  );

  const totalThreeStars = product.reviews.filter(
    (reviews) => reviews.rating == 3,
  );

  const totalTwoStars = product.reviews.filter(
    (reviews) => reviews.rating == 2,
  );

  const totalOneStars = product.reviews.filter(
    (reviews) => reviews.rating == 1,
  );

  const total =
    totalFiveStars.length +
      totalFourStars.length +
      totalThreeStars.length +
      totalTwoStars.length +
      totalOneStars.length || 1;

  const percentageFiveStars =
    total > 0 ? (totalFiveStars.length / total) * 100 : 0;
  const percentageFourStars =
    total > 0 ? (totalFourStars.length / total) * 100 : 0;
  const percentageThreeStars =
    total > 0 ? (totalThreeStars.length / total) * 100 : 0;
  const percentageTwoStars =
    total > 0 ? (totalTwoStars.length / total) * 100 : 0;
  const percentageOneStars =
    total > 0 ? (totalOneStars.length / total) * 100 : 0;

  console.log("Product: ", product);

  const router = useRouter();

  const handleCartButton = async (
    productId: string,
    quantity: number,
    color?: string,
    size?: string,
  ) => {
    const res = await addProductToCart(productId, quantity, color, size);
    if (res.status === "success") {
      toast.success(res.message, { position: "bottom-center", duration: 1000 });
      router.refresh();
    } else {
      toast.error(res.message, { duration: 1000 });
    }
  };

  // const sizes = [S]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans py-10 px-6">
      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-4xl bg-[#111111] border border-zinc-800">
            <Image
              src={product.images[imgIndex]}
              alt={product.title}
              fill
              className="object-fit p-6 rounded-4xl"
            />
          </div>

          <div className="flex flex-row gap-4 overflow-x-auto pb-2">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setImgIndex(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#111111] border-2 transition-all ${
                  imgIndex === idx ? "border-amber-400" : "border-zinc-800"
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-fit p-2" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-amber-500 font-bold text-xs uppercase tracking-[0.2em]">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < parseInt(globalRating) ? "currentColor" : "none"}
                  />
                ))}
                <span className="text-white ml-2 font-semibold">
                  {globalRating}
                </span>
              </div>
              <span className="text-zinc-600">|</span>
              <span className="text-sm">{product.reviews.length} Reviews</span>
              <span className="text-zinc-600">|</span>
              <span className="text-sm">3k+ Sold</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-amber-400">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>
          </div>

          {product.hasColours ? (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Color: <span className="text-white">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.variants.map((variant: ProductVariant) => (
                  <button
                    key={variant.colorName}
                    onClick={() => setSelectedColor(variant.colorName)}
                    className={`rounded-2xl bg-[#111111] border  ${selectedColor === variant.colorName ? "border-2 border-amber-400" : "border-0"}`}
                    title={variant.colorName}
                  >
                    <Image
                      src={variant.imageUrl}
                      alt={variant.colorName}
                      width={80}
                      height={80}
                      className="object-fit p-2 rounded-xl"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {product.size ? (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Size:{" "}
                <span className="text-white">
                  {selectedSize || "Select one"}
                </span>
              </p>
              <div className="flex gap-3">
                {product.size.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-sm px-4 py-2 transition-all border ${
                      selectedSize === s
                        ? "bg-white text-black border-white"
                        : "bg-[#111111] text-white border-zinc-800 hover:border-zinc-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex gap-4 pt-4">
            <div className="flex items-center bg-zinc-900 rounded-xl px-4 border border-zinc-800">
              <button
                className="px-2 text-xl cursor-pointer"
                onClick={handleCountDecrement}
              >
                -
              </button>
              <input
                type="text"
                value={count}
                readOnly
                className="w-12 bg-transparent text-center font-bold text-white"
              />
              <button
                className="px-2 text-xl cursor-pointer"
                onClick={handleCountIncrement}
              >
                +
              </button>
            </div>
            <Button
              onClick={() =>
                handleCartButton(product.id, count, selectedColor, selectedSize)
              }
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-bold h-14 rounded-xl text-lg"
            >
              Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-3 text-xs">
              <Truck className="text-amber-400" size={20} />
              <span>Free Express Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <ShieldCheck className="text-amber-400" size={20} />
              <span>2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specification area */}
      <div className="max-w-5xl mx-auto mt-24 space-y-20">
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="bg-transparent border-b border-zinc-900 w-full justify-start rounded-none h-auto p-0 gap-8">
            <TabsTrigger
              value="specs"
              className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2  rounded-none pb-4 text-zinc-500 font-bold tracking-wide transition-all"
            >
              Technical Specifications
            </TabsTrigger>
            <TabsTrigger
              value="vendor"
              className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 rounded-none pb-4 text-zinc-500 font-bold tracking-wide transition-all"
            >
              Vendor Details
            </TabsTrigger>
          </TabsList>

          {/* --- SPECS TAB --- */}
          <TabsContent
            value="specs"
            className="pt-10 transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  Features & Description
                </h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {product.description}
                </p>
                <ul className="grid grid-cols-1 gap-4">
                  {product.detailsPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-zinc-300 group"
                    >
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                      <span className="text-sm md:text-base">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#111] border border-zinc-800 rounded-3xl p-2 overflow-hidden">
                <Table>
                  <TableBody>
                    <TableRow className="hover:bg-transparent border-zinc-800">
                      <TableCell className="font-bold text-zinc-500 py-4 px-6">
                        Model
                      </TableCell>
                      <TableCell className="text-white text-right py-4 px-6">
                        {product.title.length > 40
                          ? `${product.title.slice(0, 40)}....`
                          : product.title}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-zinc-800">
                      <TableCell className="font-bold text-zinc-500 py-4 px-6">
                        Category
                      </TableCell>
                      <TableCell className="text-white text-right py-4 px-6 uppercase tracking-tighter">
                        <Badge
                          variant="outline"
                          className="border-amber-400/50 text-amber-400"
                        >
                          {product.category}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-zinc-800">
                      <TableCell className="font-bold text-zinc-500 py-4 px-6">
                        Warranty
                      </TableCell>
                      <TableCell className="text-white text-right py-4 px-6">
                        {product.warranty}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-none">
                      <TableCell className="font-bold text-zinc-500 py-4 px-6">
                        Replacement
                      </TableCell>
                      <TableCell className="text-white text-right py-4 px-6">
                        {product.replacementDays} Days
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* --- VENDOR TAB --- */}
          <TabsContent value="vendor" className="pt-10">
            <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-zinc-800 shrink-0">
                <Image
                  src={vendor.image || ""}
                  alt={vendor.shopName || "vendor_img"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 flex-1 text-center md:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                    {vendor.shopName}
                  </h3>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 mt-1">
                    Verified {vendor.verificationStatus}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2 text-zinc-300">
                    <MapPin
                      size={16}
                      className="text-amber-400 mt-1 shrink-0"
                    />
                    <span>{vendor.shopAddress}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <ShieldCheck size={16} className="text-amber-400" />
                    <span>GST: {vendor.gstNumber}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex gap-4 justify-center md:justify-start">
                  <p className="text-xs text-zinc-500">
                    Member since {new Date(vendor.createdAt).getFullYear()}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Contact: {vendor.phone}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* --- CUSTOMER REVIEWS SECTION --- */}
        <div className="pt-10 border-t border-zinc-900">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Customer Reviews
            </h2>
            <p className="text-zinc-500 text-sm">
              Based on {product.reviews?.length || 0} verified purchases
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-16 items-start mb-16">
            {/* Left side: Big Rating Score */}
            <div className="shrink-0 text-center md:text-left">
              <div className="text-7xl font-bold text-white mb-2 tracking-tighter">
                {globalRating}
              </div>
              <div className="flex justify-center md:justify-start text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < parseInt(globalRating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">
                Global Rating
              </p>
            </div>

            {/* Middle: Rating Progress Bars */}
            <div className="flex-1 space-y-3 max-w-md w-full">
              {[5, 4, 3, 2, 1].map((num) => (
                <div
                  key={num}
                  className="flex items-center gap-4 text-xs font-medium"
                >
                  <span className="text-zinc-500 w-4 ">{num} star</span>
                  <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-1000"
                      style={{
                        width: `${num === 5 ? percentageFiveStars : num === 4 ? percentageFourStars : num === 3 ? percentageThreeStars : num === 2 ? percentageTwoStars : percentageOneStars}%`,
                      }}
                    />
                  </div>
                  <div className="">
                    <span className="text-zinc-500 w-10 text-right">
                      {Math.round(
                        num === 5
                          ? percentageFiveStars
                          : num === 4
                            ? percentageFourStars
                            : num === 3
                              ? percentageThreeStars
                              : num === 2
                                ? percentageTwoStars
                                : percentageOneStars,
                      )}
                    </span>
                    <span className="pl-0.5">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Individual Reviews List */}
          {!product.reviews || product.reviews.length === 0 ? (
            <div className="bg-[#111] border border-zinc-800 rounded-3xl p-10 text-center">
              <p className="text-zinc-500">
                No reviews yet for this model. Be the first to share your
                experience!
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="group border-b border-zinc-900 pb-10 last:border-0"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border border-zinc-800 bg-zinc-900">
                        <AvatarFallback className="bg-amber-400 text-black font-bold text-xs">
                          {review.userName
                            ? review.userName.charAt(0).toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold text-sm">
                            {review.userName || "Verified User"}
                          </h4>
                          <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">
                            <CheckCircle2 size={10} />
                            Verified Buyer
                          </div>
                        </div>
                        <p className="text-zinc-500 text-[10px] mt-1">
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "Recently"}
                        </p>
                      </div>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < review.rating ? "currentColor" : "none"}
                          strokeWidth={3}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pl-14 space-y-3">
                    <h5 className="text-white font-bold text-md leading-snug">
                      {review.rating >= 4
                        ? "Excellent Product"
                        : "Product Feedback"}
                    </h5>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl">
                      {review.comment ||
                        "Great purchase, highly satisfied with the performance."}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-6 pt-4 text-zinc-600">
                      <button className="flex items-center gap-2 text-xs hover:text-white transition-colors">
                        <ThumbsUp size={14} />
                        Helpful
                      </button>
                      <button className="flex items-center gap-2 text-xs hover:text-white transition-colors">
                        <Flag size={14} />
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button className="text-amber-400 font-bold text-sm flex items-center gap-2 hover:underline pt-4">
                View all {product.reviews.length} reviews →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
