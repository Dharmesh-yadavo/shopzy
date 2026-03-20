"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Image as ImageIcon,
  Store,
  MapPin,
  Hash,
  Phone,
  Mail,
  Save,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  VendorProfileData,
  VendorProfileSchema,
} from "@/features/vendor/vendor.schema";
import { vendorProfileEditAction } from "@/features/vendor/vendor.action";
import { toast } from "sonner";
import { useState } from "react";
import uploadOnCloudiinary from "@/lib/cloudinary";

interface VendorData {
  shopName: string | null;
  shopAddress: string | null;
  gstNumber: string | null;
  phone: string | null;
  email: string;
  image: string | null;
}

const VendorProfileComp = ({ vendor }: { vendor: VendorData }) => {
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VendorProfileData>({
    resolver: zodResolver(VendorProfileSchema),
    defaultValues: {
      shopName: vendor.shopName ?? "",
      gstNumber: vendor.gstNumber ?? "",
      phone: vendor.phone ?? "",
      shopAddress: vendor.shopAddress ?? "",
      email: vendor.email,
      image: vendor.image ?? "",
    },
  });

  const currentImageUrl = watch("image") || vendor?.image;

  const handleImageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    try {
      setIsUploading(true);

      const imgUrl = await uploadOnCloudiinary(file);

      if (imgUrl) {
        setValue("image", imgUrl, { shouldValidate: true });
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Cloudinary Error:", error);
      toast.error("Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: VendorProfileData) => {
    console.log("Submitted Data:", data);
    const res = await vendorProfileEditAction(data);
    if (res.status === "error") {
      toast.error(res.message);
    } else if (res.status === "success") {
      toast.success(res.message);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl space-y-8">
      {/* Section 1: Brand Identity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-zinc-200">Store Identity</h3>
          <p className="text-zinc-500 text-xs mt-1">
            This logo will be visible to all customers on the marketplace.
          </p>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 flex flex-col sm:flex-row items-center gap-8">
          <input type="hidden" {...register("image")} />

          <input
            type="file"
            id="logo-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpdate}
          />

          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-950">
              <Avatar className="h-full w-full rounded-none">
                <AvatarImage
                  src={currentImageUrl || "https://github.com/shadcn.png"}
                  className={isUploading ? "opacity-50" : "opacity-100"}
                />
                <AvatarFallback className="bg-zinc-900">
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-zinc-700" />
                  )}
                </AvatarFallback>
              </Avatar>

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
            </div>

            <Button
              type="button"
              onClick={() => document.getElementById("logo-upload")?.click()}
              disabled={isUploading}
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-amber-300 text-black hover:bg-amber-400 border-none"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <p className="text-sm font-bold text-zinc-200">Upload new logo</p>
            <p className="text-xs text-zinc-500">
              Max size 2MB. Square preferred.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Business Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-zinc-200">Business Details</h3>
          <p className="text-zinc-500 text-xs mt-1">
            Your legal and contact info.
          </p>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/10 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shop Name */}
            <div className="space-y-2">
              <Label
                className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${errors.shopName ? "text-red-400" : "text-zinc-500"}`}
              >
                <Store className="h-3 w-3" /> Shop Name
              </Label>
              <Input
                {...register("shopName")}
                disabled={isSubmitting}
                className={`bg-zinc-900 border-zinc-800 focus:border-amber-400 text-white h-12 rounded-xl transition-all ${errors.shopName && "border-red-500/50 focus:border-red-500"}`}
              />
              {errors.shopName && (
                <p className="text-[10px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.shopName.message}
                </p>
              )}
            </div>

            {/* GST Number */}
            <div className="space-y-2">
              <Label
                className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${errors.gstNumber ? "text-red-400" : "text-zinc-500"}`}
              >
                <Hash className="h-3 w-3" /> GST Number
              </Label>
              <Input
                {...register("gstNumber")}
                disabled={isSubmitting}
                className={`bg-zinc-900 border-zinc-800 focus:border-amber-400 text-white h-12 rounded-xl font-mono uppercase ${errors.gstNumber && "border-red-500/50 focus:border-red-500"}`}
              />
              {errors.gstNumber && (
                <p className="text-[10px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.gstNumber.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${errors.phone ? "text-red-400" : "text-zinc-500"}`}
              >
                <Phone className="h-3 w-3" /> Contact Phone
              </Label>
              <Input
                {...register("phone")}
                disabled={isSubmitting}
                className={`bg-zinc-900 border-zinc-800 focus:border-amber-400 text-white h-12 rounded-xl ${errors.phone && "border-red-500/50 focus:border-red-500"}`}
              />
              {errors.phone && (
                <p className="text-[10px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email (Read Only) */}
            <div className="space-y-2">
              <Label className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                <Mail className="h-3 w-3" /> Business Email
              </Label>
              <Input
                {...register("email")}
                disabled
                className="bg-zinc-950 border-zinc-800 text-zinc-500 h-12 rounded-xl cursor-not-allowed italic"
              />
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <Label
                className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${errors.shopAddress ? "text-red-400" : "text-zinc-500"}`}
              >
                <MapPin className="h-3 w-3" /> Shop Address
              </Label>
              <Input
                {...register("shopAddress")}
                disabled={isSubmitting}
                className={`bg-zinc-900 border-zinc-800 focus:border-amber-400 text-white h-12 rounded-xl ${errors.shopAddress && "border-red-500/50 focus:border-red-500"}`}
              />
              {errors.shopAddress && (
                <p className="text-[10px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />{" "}
                  {errors.shopAddress.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-zinc-800/50 gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 h-12 rounded-xl transition-all shadow-lg shadow-amber-400/10 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VendorProfileComp;
