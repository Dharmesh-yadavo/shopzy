"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Upload, X, Loader2, ChevronLeft, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import uploadOnCloudiinary from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";
import { addProductAction } from "@/features/vendor/vendor.action";
import { redirect } from "next/navigation";

export interface AddProductType {
  title: string;
  price: string;
  stock: string;
  category: string;
  description: string;
  isWearable: boolean;
  size: string;
  hasColours: boolean;
  replacementDays: number;
  warranty: string;
  freeDelivery: boolean;
  payOnDelivery: boolean;
  images: string[];
  variants: {
    colorName: string;
    imageUrl: string;
  }[];
  detailsPoints: string[];
}

export const AddProductPage = ({ vendorId }: { vendorId: string }) => {
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      isWearable: false,
      size: "",
      hasColours: false,
      replacementDays: 0,
      warranty: "",
      freeDelivery: false,
      payOnDelivery: false,
      images: ["", "", "", ""],
      variants: [] as { colorName: string; imageUrl: string }[],
      detailsPoints: [] as string[],
    },
  });

  const {
    fields: variantFields,
    append: addVariant,
    remove: removeVariant,
  } = useFieldArray({ control, name: "variants" });
  const watchedImages = watch("images");
  const points = watch("detailsPoints");
  const [pointInput, setPointInput] = useState("");

  const handleFileAction = async (
    file: File,
    type: "main" | "variant",
    index: number,
  ) => {
    try {
      setIsUploading(`${type}-${index}`);
      const url = await uploadOnCloudiinary(file);
      if (url) {
        if (type === "main") {
          const newImgs = [...watchedImages];
          newImgs[index] = url;
          setValue("images", newImgs);
        } else {
          setValue(`variants.${index}.imageUrl`, url);
        }
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsUploading(null);
    }
  };

  const onSubmit = async (data: AddProductType) => {
    console.log("Final Data:", data);
    await addProductAction(data, vendorId);
    reset();
    redirect("/vendor/products");
  };

  const category = [
    { name: "Electronics" },
    { name: "Fashion" },
    { name: "Decoration" },
    { name: "Accessories" },
    { name: "Gaming" },
    { name: "Audio" },
    { name: "Fitness" },
  ];

  return (
    <div className="max-w-325 text-zinc-100 font-sans p-4 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex gap-4 pb-5">
        <Link href="/vendor/products">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-amber-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        {/* LEFT SIDE: FORM FIELDS */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Input
                {...register("title")}
                placeholder="Product Name"
                className="bg-[#111113] border-zinc-800 h-12 rounded-xl focus:border-amber-400 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <Select onValueChange={(v) => setValue("category", v)}>
                <SelectTrigger className="bg-[#111113] w-full p-6 border-zinc-800 h-12 rounded-xl text-zinc-400 focus:ring-0 focus:ring-offset-0 focus:border-amber-400 px-4">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1c1b1b] border-zinc-800 text-zinc-200">
                  {category.map((cat) => (
                    <SelectItem
                      key={cat.name}
                      value={cat.name.toLowerCase()}
                      className="focus:bg-amber-400 focus:text-black cursor-pointer capitalize"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              {...register("price")}
              placeholder="Price (₹)"
              className="bg-[#111113] border-zinc-800 h-12 rounded-xl"
            />
            <Input
              {...register("stock")}
              placeholder="Stock"
              className="bg-[#111113] border-zinc-800 h-12 rounded-xl"
            />
          </div>

          <Textarea
            {...register("description")}
            placeholder="Description..."
            className="bg-[#111113] border-zinc-800 h-32 rounded-xl resize-none p-4"
          />

          {/* CHECKBOX GRID */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-5 bg-[#111113] rounded-2xl border border-zinc-800/50">
            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer group">
              <Checkbox
                checked={watch("isWearable")}
                onCheckedChange={(v) => setValue("isWearable", !!v)}
                className="w-5 h-5 border-zinc-700 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
              />
              Wearable Product
            </label>
            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer group">
              <Checkbox
                checked={watch("hasColours")}
                onCheckedChange={(v) => setValue("hasColours", !!v)}
                className="w-5 h-5 border-zinc-700 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
              />
              Has Color Variants
            </label>
            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer group ">
              <Checkbox
                checked={watch("freeDelivery")}
                onCheckedChange={(v) => setValue("freeDelivery", !!v)}
                className="w-5 h-5 border-zinc-700 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
              />
              Free Delivery
            </label>
            <label className="flex items-center gap-3 text-sm font-medium cursor-pointer group ">
              <Checkbox
                checked={watch("payOnDelivery")}
                onCheckedChange={(v) => setValue("payOnDelivery", !!v)}
                className="w-5 h-5 border-zinc-700 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
              />
              Cash on Delivery
            </label>
          </div>

          {watch("isWearable") && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <Input
                {...register("size")}
                placeholder="Sizes (e.g. S, M, L, XL)"
                className="bg-[#111113] border-amber-400/20 h-12 rounded-xl focus:border-amber-400"
              />
            </div>
          )}

          {/* VARIANTS SECTION */}
          {watch("hasColours") && (
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="flex justify-between items-center px-1">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Variants
                </p>
                <Button
                  type="button"
                  onClick={() => addVariant({ colorName: "", imageUrl: "" })}
                  variant="ghost"
                  className="text-amber-300 text-xs hover:bg-amber-400"
                >
                  + Add Color
                </Button>
              </div>
              <div className="space-y-3">
                {variantFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-4 bg-[#111113] p-3 rounded-2xl border border-zinc-800 group"
                  >
                    <div className="relative h-12 w-12 shrink-0 rounded-xl bg-black border border-zinc-800 flex items-center justify-center overflow-hidden">
                      {watch(`variants.${index}.imageUrl`) ? (
                        <Image
                          src={watch(`variants.${index}.imageUrl`)}
                          fill
                          className="object-cover"
                          alt="color"
                        />
                      ) : (
                        <label className="cursor-pointer">
                          {isUploading === `variant-${index}` ? (
                            <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                          ) : (
                            <Upload className="h-4 w-4 text-zinc-600" />
                          )}
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              handleFileAction(
                                e.target.files[0],
                                "variant",
                                index,
                              )
                            }
                          />
                        </label>
                      )}
                    </div>
                    <Input
                      {...register(`variants.${index}.colorName`)}
                      placeholder="Color Name"
                      className="h-10 bg-transparent border-none focus-visible:ring-0 text-sm"
                    />
                    <Button
                      type="button"
                      onClick={() => removeVariant(index)}
                      variant="ghost"
                      className="text-zinc-600 hover:text-red-500"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: IMAGES & ACTION */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">
              Main Images
            </p>
            <div className="grid grid-cols-2 gap-4">
              {watchedImages.map((img, i) => {
                const inputId = `main-image-upload-${i}`;
                return (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl bg-[#111113] border-2 border-dashed border-zinc-800 flex items-center justify-center overflow-hidden group hover:border-amber-400/50 transition-all"
                  >
                    {img ? (
                      <>
                        <Image
                          src={img}
                          fill
                          className="object-cover"
                          alt={`main-${i}`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const n = [...watchedImages];
                            n[i] = "";
                            setValue("images", n);
                          }}
                          className="absolute top-2 right-2 z-10 bg-black/60 p-1.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </>
                    ) : (
                      <label
                        htmlFor={inputId}
                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer transition-colors hover:bg-zinc-800/20"
                      >
                        {isUploading === `main-${i}` ? (
                          <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-zinc-800 group-hover:text-amber-400 transition-all" />
                        )}
                        <input
                          id={inputId}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleFileAction(e.target.files[0], "main", i)
                          }
                          disabled={isUploading !== null}
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="space-y-1.5">
              <Input
                {...register("warranty")}
                placeholder="Warranty"
                className="bg-[#111113] border-zinc-800 h-12 rounded-xl focus:border-amber-400 transition-all"
              />
            </div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">
              Detail Points
            </p>
            <div className="flex flex-wrap gap-2 min-h-10 w-full items-start transition-all overflow-hidden">
              {points.map((p, i) => (
                <div
                  key={i}
                  className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center justify-between gap-2 text-zinc-300 animate-in zoom-in-95 duration-200 max-w-full"
                >
                  <span className="wrap-break-word line-clamp-2">{p}</span>
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-400 shrink-0"
                    onClick={() =>
                      setValue(
                        "detailsPoints",
                        points.filter((_, idx) => idx !== i),
                      )
                    }
                  />
                </div>
              ))}
              {points.length === 0 && (
                <p className="text-sm text-zinc-600 italic px-1">
                  No features added yet.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                value={pointInput}
                onChange={(e) => setPointInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementById("add-point-btn")?.click();
                  }
                }}
                placeholder="Add key feature..."
                className="h-12 bg-[#111113] border-zinc-800 rounded-xl"
              />
              <Button
                id="add-point-btn"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (pointInput.trim()) {
                    setValue("detailsPoints", [...points, pointInput.trim()]);
                    setPointInput("");
                  }
                }}
                className="bg-amber-400 text-black h-12 w-12 rounded-xl hover:bg-amber-300 transition-all shrink-0"
              >
                <Plus size={20} />
              </Button>
            </div>
          </div>

          <Button
            disabled={isSubmitting}
            className="w-full bg-amber-300 hover:bg-amber-400 text-black font-bold h-12 rounded-2xl shadow-xl shadow-amber-400/10 text-sm transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Save Product Listing"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
