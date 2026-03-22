"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Package, Upload, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import uploadOnCloudiinary from "@/lib/cloudinary"; // Using your existing helper
import Image from "next/image";

export function AddProductModal() {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState<number | null>(null); // Track which index is uploading

  // 1. Initialize Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      price: 0,
      stock: 0,
      category: "",
      description: "",
      isWearable: false,
      size: "",
      replacementDate: 7,
      warranty: "",
      freeDelivery: false,
      payOnDelivery: false,
      images: ["", "", "", ""],
      detailsPoints: [] as string[],
    },
  });

  // Watchers for dynamic UI
  const watchedImages = watch("images");
  const isWearable = watch("isWearable");
  const freeDelivery = watch("freeDelivery");
  const payOnDelivery = watch("payOnDelivery");
  const points = watch("detailsPoints");
  const [newPoint, setNewPoint] = useState("");

  // 2. Cloudinary Upload Logic for multiple images
  const handleImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(index);
      const url = await uploadOnCloudiinary(file);

      if (url) {
        const newImages = [...watchedImages];
        newImages[index] = url;
        setValue("images", newImages);
        toast.success(`Image ${index + 1} uploaded`);
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsUploading(null);
    }
  };

  const addPoint = () => {
    if (newPoint.trim() && points.length < 6) {
      setValue("detailsPoints", [...points, newPoint.trim()]);
      setNewPoint("");
    }
  };

  const removePoint = (idx: number) => {
    setValue(
      "detailsPoints",
      points.filter((_, i) => i !== idx),
    );
  };

  // 3. Final Submission
  const onSubmit = async (data: any) => {
    // Check if at least one image is uploaded
    if (data.images.every((img: string) => img === "")) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      console.log("Saving to MongoDB via Prisma:", data);
      // await addProductAction(data);
      toast.success("Product listed successfully!");
      reset();
      setOpen(false);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-400 hover:bg-amber-300 text-black font-bold h-12 px-6 rounded-xl transition-all shadow-lg shadow-amber-400/10">
          <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-[#0c0c0e] border-zinc-800 text-white p-6 outline-none">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <Package className="h-5 w-5" /> Add New Product
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-xs">
            Upload images and fill details for your Shopzy listing.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 scrollbar-hide"
        >
          {/* Main Info */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              {...register("title")}
              placeholder="Product Title"
              className="bg-zinc-900 border-zinc-800 h-9 text-sm focus:border-amber-400"
            />
            <Input
              {...register("price", { valueAsNumber: true })}
              placeholder="Price"
              type="number"
              className="bg-zinc-900 border-zinc-800 h-9 text-sm focus:border-amber-400"
            />
            <Input
              {...register("stock", { valueAsNumber: true })}
              placeholder="Stock"
              type="number"
              className="bg-zinc-900 border-zinc-800 h-9 text-sm focus:border-amber-400"
            />

            <Select onValueChange={(val) => setValue("category", val)}>
              <SelectTrigger className="bg-zinc-900 border-zinc-800 h-9 text-sm text-zinc-400">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="tech">Electronics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            {...register("description")}
            placeholder="Product Description"
            className="bg-zinc-900 border-zinc-800 h-20 text-sm resize-none focus:border-amber-400"
          />

          {/* Logistics */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="wearable"
                checked={isWearable}
                onCheckedChange={(val) => setValue("isWearable", !!val)}
                className="border-zinc-700 data-[state=checked]:bg-amber-400"
              />
              <label htmlFor="wearable" className="text-[11px] text-zinc-300">
                Wearable product
              </label>
            </div>

            {isWearable && (
              <Input
                {...register("size")}
                placeholder="Sizes (S, M, L, XL)"
                className="bg-zinc-900 border-amber-400/30 h-9 text-xs"
              />
            )}

            <div className="grid grid-cols-2 gap-3">
              <Input
                {...register("replacementDate", { valueAsNumber: true })}
                placeholder="Replacement Days"
                type="number"
                className="bg-zinc-900 border-zinc-800 h-9 text-xs"
              />
              <Input
                {...register("warranty")}
                placeholder="Warranty Info"
                className="bg-zinc-900 border-zinc-800 h-9 text-xs"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-[10px] text-zinc-400">
                <Checkbox
                  checked={freeDelivery}
                  onCheckedChange={(val) => setValue("freeDelivery", !!val)}
                  className="border-zinc-700 data-[state=checked]:bg-amber-400"
                />{" "}
                Free Delivery
              </label>
              <label className="flex items-center gap-2 text-[10px] text-zinc-400">
                <Checkbox
                  checked={payOnDelivery}
                  onCheckedChange={(val) => setValue("payOnDelivery", !!val)}
                  className="..."
                />
                Pay on Delivery
              </label>
            </div>
          </div>

          {/* Image Upload Grid */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase">
              Images (Max 4)
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-lg border border-dashed border-zinc-800 bg-zinc-950 overflow-hidden group"
                >
                  {watchedImages[idx] ? (
                    <>
                      <Image
                        src={watchedImages[idx]}
                        alt={`Product image ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImgs = [...watchedImages];
                          newImgs[idx] = "";
                          setValue("images", newImgs);
                        }}
                        className="absolute top-1 right-1 bg-red-500 rounded-full p-0.5"
                      >
                        <X size={10} />
                      </button>
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      {isUploading === idx ? (
                        <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                      ) : (
                        <Upload className="h-4 w-4 text-amber-400/50 group-hover:text-amber-400" />
                      )}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleImageUpload(idx, e)}
                        disabled={isUploading !== null}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detail Points */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase">
              Detail Points
            </p>
            <div className="flex flex-wrap gap-1">
              {points.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-zinc-800 px-2 py-0.5 rounded text-[10px]"
                >
                  {p}{" "}
                  <X
                    size={10}
                    className="cursor-pointer"
                    onClick={() => removePoint(i)}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newPoint}
                onChange={(e) => setNewPoint(e.target.value)}
                placeholder="Add feature..."
                className="bg-zinc-900 h-9 text-xs"
              />
              <Button
                variant="default"
                type="button"
                onClick={addPoint}
                className="bg-amber-400 text-black hover:bg-amber-500 h-9 px-3"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <Button
            disabled={isSubmitting || isUploading !== null}
            className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold h-11 rounded-xl"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "List Product"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
