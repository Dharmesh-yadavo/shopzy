"use client";
import { Product, ProductVariant } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import {
  Star,
  ShieldCheck,
  Truck,
  MapPin,
  CalendarCheck,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "../ui/badge";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  shopName: string;
  shopAddress: string;
  gstNumber: string;
  isApproved: boolean;
  verificationStatus: string;
  requestedAt: Date | string;
  approvedAt: Date | string | null;
  rejectedReason: string | null;
  createdAt: Date | string;
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

  const handleCountDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  console.log("Vendorssss: ", vendor);

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
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
                <span className="text-white ml-2 font-semibold">4.8</span>
              </div>
              <span className="text-zinc-600">|</span>
              <span className="text-sm">128 Reviews</span>
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
            <Button className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-bold h-14 rounded-xl text-lg">
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
      {/* --- LOWER CONTENT SECTION --- */}
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
                        {product.title}
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
                  src={vendor.image}
                  alt={vendor.shopName}
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

        {/* Customer Reviews Section */}
        <div className="pt-16 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Customer Reviews
              </h2>
              <p className="text-zinc-500">
                Real feedback from verified iPhone 17 users
              </p>
            </div>
            <Button className="bg-white text-black hover:bg-zinc-200 font-bold rounded-xl px-8 h-12">
              Write a Review
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="shrink-0 text-center md:text-left">
              <div className="text-7xl font-bold text-white mb-2 tracking-tighter">
                4.8
              </div>
              <div className="flex justify-center md:justify-start text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">
                Global Rating
              </p>
            </div>

            <div className="flex-1 space-y-3 max-w-md w-full">
              {[5, 4, 3, 2, 1].map((num) => (
                <div
                  key={num}
                  className="flex items-center gap-4 text-xs font-medium"
                >
                  <span className="text-zinc-500 w-4">{num}</span>
                  <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-1000"
                      style={{
                        width: `${num === 5 ? 85 : num === 4 ? 10 : 2}%`,
                      }}
                    />
                  </div>
                  <span className="text-zinc-500 w-10 text-right">
                    {num === 5 ? "85%" : num === 4 ? "10%" : "2%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
