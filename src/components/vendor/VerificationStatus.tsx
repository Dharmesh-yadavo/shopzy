"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Hash, MapPin, Store } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EditVendorDetailsAction } from "@/features/vendor/vendor.action";
import { toast } from "sonner";

interface VendorsDataType {
  shopName: string | null;
  shopAddress: string | null;
  gstNumber: string | null;
}

interface Props {
  status: "pending" | "rejected";
  reason?: string | null;
  vendor?: VendorsDataType;
}

export const VerificationStatus = ({ status, reason, vendor }: Props) => {
  console.log("Verification Status : ", vendor);
  const [formData, setFormData] = useState({
    shopName: vendor?.shopName || "",
    shopAddress: vendor?.shopAddress || "",
    gstNumber: vendor?.gstNumber || "",
  });

  const handleUpdate = async () => {
    const res = await EditVendorDetailsAction(formData);
    if (res.status === "error") {
      toast.error(res.message);
    } else if (res.status === "success") {
      toast.success(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      {/* Glow Effect Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md p-0.5 rounded-2xl bg-linear-to-b from-amber-400/20 to-transparent"
      >
        {status === "pending" ? (
          <div className="bg-[#121212] rounded-2xl p-8 text-center shadow-2xl">
            {/* Icon with animated pulse glow */}
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 2,
              }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full"
                />
                <div className="relative border-2 border-dashed border-amber-400/40 p-4 rounded-full">
                  <Clock className="w-12 h-12 text-amber-400" />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Verification Pending
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-sm mb-6 leading-relaxed"
            >
              You can access the vendor dashboard only after admin verification.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                Status: {status}
              </span>
            </motion.div>

            <div className="h-px bg-zinc-800 w-full mb-6" />

            <motion.p className="text-zinc-500 text-sm italic mb-8">
              It usually takes 2–3 hours.
            </motion.p>
          </div>
        ) : (
          <div className="bg-[#121212] rounded-2xl p-8 text-center shadow-2xl">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-red-500 mb-2"
            >
              Verification Rejected
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-sm mb-6 leading-relaxed"
            >
              Your business verification was rejected by Admin
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-400/10 border border-red-400/20 px-4 py-1.5 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
                Status: {status}
              </span>
            </motion.div>

            <motion.p className="text-zinc-500 text-sm italic mb-8">
              Reason: {reason}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 mb-6"
            >
              <p className="text-zinc-400 text-xs text-left px-1">
                Update your details to re-apply:
              </p>
              <div className="relative">
                <Store className="absolute left-4 top-4 w-4 h-4 text-zinc-500" />
                <Input
                  value={formData.shopName}
                  onChange={(e) =>
                    setFormData({ ...formData, shopName: e.target.value })
                  }
                  className="bg-[#1a1a1a] border-zinc-800 pl-12 h-12 text-white focus:border-amber-400"
                  placeholder="Shop Name"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-4 h-4 text-zinc-500" />
                <Input
                  value={formData.shopAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, shopAddress: e.target.value })
                  }
                  className="bg-[#1a1a1a] border-zinc-800 pl-12 h-12 text-white focus:border-amber-400"
                  placeholder="Shop Address"
                />
              </div>
              <div className="relative">
                <Hash className="absolute left-4 top-4 w-4 h-4 text-zinc-500" />
                <Input
                  value={formData.gstNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, gstNumber: e.target.value })
                  }
                  className="bg-[#1a1a1a] border-zinc-800 pl-12 h-12 text-white focus:border-amber-400"
                  placeholder="GST Number"
                />
              </div>
            </motion.div>

            <Button
              variant="outline"
              onClick={handleUpdate}
              className="border-amber-500/50 bg-amber-500/10 text-amber-500 hover:bg-amber-500/80 hover:text-black text-xs h-11 px-8 transition-all duration-300 font-semibold uppercase tracking-wider"
            >
              Submit for Re-verification
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
