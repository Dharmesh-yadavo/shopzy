"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { rateProductAction } from "@/features/user/user.action";
// Import your server action here
// import { rateProductAction } from "@/features/user/user.action";

export const RateProductDialog = ({
  productId,
  productName,
  productImage,
}: {
  productId: string;
  productName: string;
  productImage: string;
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (rating === 0) return toast.error("Please select a rating");

    startTransition(async () => {
      const result = await rateProductAction({
        productId,
        rating: rating.toString(),
        comment,
      });
      if (result?.status === "success") {
        setOpen(false);
        toast.success(result.message);
      } else {
        setOpen(false);
        toast.success(result?.message);
      }

      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-400 hover:bg-amber-500 text-black font-black uppercase italic tracking-tighter rounded-xl py-6 px-8 transition-all active:scale-95 shadow-lg shadow-amber-400/20">
          Rate Product
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#0e0e10] border-zinc-800 text-zinc-100 sm:max-w-125 w-[92vw] rounded-[24px] p-0 overflow-hidden">
        {/* Header Section */}
        <div className="bg-zinc-900/80 p-6 border-b border-zinc-800/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-black italic uppercase tracking-tighter">
              Share Your Experience
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Preview */}
          <div className="flex gap-4 items-center bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/50">
            <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
              <Image
                src={productImage}
                alt={productName}
                fill
                className="object-contain p-1"
              />
            </div>
            <p className="text-sm font-bold truncate text-zinc-300">
              {productName}
            </p>
          </div>

          {/* Star Selection */}
          <div className="space-y-3 text-center">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
              Tap to Rate
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-all duration-200 active:scale-75"
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hover || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-800"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-amber-400/80 italic">
              {rating === 5
                ? "Mind-blowing!"
                : rating === 4
                  ? "Loved it!"
                  : rating === 3
                    ? "It's okay"
                    : rating === 2
                      ? "Could be better"
                      : rating === 1
                        ? "Disappointing"
                        : "Choose your stars"}
            </p>
          </div>

          {/* Comment Area */}
          <div className="space-y-2">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-1">
              Your Review
            </p>
            <Textarea
              placeholder="Tell others what you think about this product..."
              className="bg-zinc-900/50 border-zinc-800 focus:border-amber-400 min-h-24 rounded-2xl resize-none text-sm placeholder:text-zinc-700"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 bg-zinc-900/40 border-t border-zinc-800/50">
          <Button
            disabled={isPending || rating === 0}
            onClick={handleSubmit}
            className="w-full bg-zinc-100 hover:bg-white text-black h-12 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-white/5"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
